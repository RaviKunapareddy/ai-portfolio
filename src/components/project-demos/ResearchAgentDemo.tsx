'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AutoResizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Badge } from '@/components/ui/badge';
import { ResearchAgentClient, SessionStatus, DEFAULT_BASE_URL } from '@/lib/api-clients/research-agent';
import { Loader2, Play, RefreshCw, CheckCircle2, AlertTriangle, Cpu, ChevronDown } from 'lucide-react';

function isValidApiEndpoint(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  const lower = trimmed.toLowerCase();
  if (lower.includes('your-')) return false;
  if (lower.includes('example.com')) return false;
  if (lower.includes('localhost')) return false;
  return true;
}

// No default prefill; keep the UI clean

// Very small helpers to safely format result text without extra deps
function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function linkify(text: string) {
  const escaped = escapeHtml(text);
  const urlRegex = /(https?:\/\/[^\s)]+)(?![^<]*>|[^\(]*\))/g;
  return escaped.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2">$1</a>');
}

export interface ResearchAgentDemoProps {
  apiEndpoint?: string;
}

// Minimal sample queries (recruiter-friendly, concise)
const SAMPLE_QUERIES: string[] = [
  'Summarize this week\'s AI research highlights with sources',
  'Compare GPT-4o vs Mistral Large for tool use (pros/cons)',
  'Outline 3 AI+Healthcare startup ideas with risks and next steps'
];

export default function ResearchAgentDemo({ apiEndpoint }: ResearchAgentDemoProps) {
  const client = useMemo(() => new ResearchAgentClient(apiEndpoint), [apiEndpoint]);

  const [prompt, setPrompt] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<SessionStatus | null>(null);
  const [result, setResult] = useState<string>('');
  const [reflection, setReflection] = useState<string>('');
  const [execution, setExecution] = useState<string[]>([]);
  // Metrics state removed (unused in public UI)

  const [starting, setStarting] = useState(false);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Collapsible sections state
  const [openStatus, setOpenStatus] = useState(false);
  const [openReflection, setOpenReflection] = useState(false);
  // Removed unused openMetrics state
  const [showHistory, setShowHistory] = useState(false);

  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current); };
  }, []);

  // Metrics fetch removed (no longer shown in UI)

  // Prepare formatted paragraphs for the final response
  const formattedParagraphs = useMemo(() => {
    const text = (result || '').trim();
    if (!text) return [] as string[];
    return text.split(/\n{2,}/).map((p) => linkify(p).replace(/\n/g, '<br/>'));
  }, [result]);

  // Define fetchFinals and pollStatus before startSession to avoid 'used before assigned'
  const fetchFinals = useCallback(async (sid: string) => {
    try {
      const [r, rf, ex] = await Promise.allSettled([
        client.getResult(sid),
        client.getReflection(sid),
        client.getExecution(sid),
      ]);

      if (r.status === 'fulfilled' && r.value.success) setResult(r.value.data.response || '');
      if (rf.status === 'fulfilled' && rf.value.success) setReflection(rf.value.data.reflection || '');
      if (ex.status === 'fulfilled' && ex.value.success) setExecution(ex.value.data.execution_history || []);
    } catch {
      // ignore
    }
  }, [client]);

  const pollStatus = useCallback(async (sid: string) => {
    let delay = 1000; // 1s initial
    const maxDelay = 5000; // 5s cap
    setPolling(true);

    const loop = async () => {
      try {
        const st = await client.getStatus(sid);
        if (!st.success) throw new Error(`Status failed (${st.status})`);
        if (!isMounted.current) return;

        setStatus(st.data);

        if (st.data.complete || st.data.status === 'Complete') {
          setPolling(false);
          await fetchFinals(sid);
          return;
        }

        // schedule next
        delay = Math.min(maxDelay, Math.floor(delay * 1.6));
        pollTimeoutRef.current = setTimeout(loop, delay);
      } catch {
        if (!isMounted.current) return;
        // transient errors: continue a few retries with backoff
        delay = Math.min(maxDelay, Math.floor(delay * 1.6));
        pollTimeoutRef.current = setTimeout(loop, delay);
      }
    };

    loop();
  }, [client, fetchFinals]);

  const startSession = useCallback(async () => {
    if (!prompt.trim()) return;
    setError(null);
    setStarting(true);
    setOpenStatus(true);
    setResult('');
    setReflection('');
    setExecution([]);
    setStatus(null);
    setSessionId(null);
    try {
      const res = await client.startChat(prompt.trim());
      if (!res.success) throw new Error(`Start failed (${res.status})`);
      setSessionId(res.data.session_id);
      setStarting(false);
      // Begin polling
      pollStatus(res.data.session_id);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setStarting(false);
      setError(msg || 'Failed to start session');
    }
  }, [client, prompt, pollStatus]);

  // moved pollStatus above

  // moved fetchFinals above

  const reset = useCallback(() => {
    if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    setPolling(false);
    setStarting(false);
    setError(null);
    setSessionId(null);
    setStatus(null);
    setResult('');
    setReflection('');
    setExecution([]);
  }, []);

  // Consider default base URL as a valid connection to avoid disabling the button silently
  const connected =
    isValidApiEndpoint(apiEndpoint) ||
    isValidApiEndpoint(process.env.NEXT_PUBLIC_RESEARCH_AGENT_API) ||
    isValidApiEndpoint(DEFAULT_BASE_URL);

  // Subtle guidance highlight when empty and not yet started
  const shouldGuide = !prompt.trim() && !starting && !sessionId && !polling;
  const showSamples = shouldGuide;

  return (
    <div className="container mx-auto px-4 max-w-3xl mt-12 sm:mt-16 space-y-6 sm:space-y-8">
      <div className="rounded-xl border bg-slate-50 p-4 sm:p-6 space-y-3 sm:space-y-4">
      {/* Research Task (always visible) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" /> Research Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="block text-sm font-medium">Your research task</label>
          <AutoResizeTextarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your query or research question..."
            minHeight={56}
            maxHeight={240}
            className={shouldGuide ? 'ring-2 ring-primary/15 border-primary/40' : ''}
          />
          {showSamples && (
            <div className="-mt-1">
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_QUERIES.map((q, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 rounded-full px-2 text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100/70"
                    onClick={() => setPrompt(q)}
                    aria-label={`Use sample query ${i + 1}`}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={startSession} disabled={!connected || starting || polling || !prompt.trim()}>
              {starting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
              {starting ? 'Starting…' : 'Start Research'}
            </Button>
            {sessionId && (
              <Button variant="secondary" onClick={reset} disabled={starting}>
                <RefreshCw className="h-4 w-4 mr-2" /> Reset
              </Button>
            )}
          </div>
          {error && (
            <div className="text-sm text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Response (always visible) */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Final Response</CardTitle>
        </CardHeader>
        <CardContent>
          {!result ? (
            <p className="text-sm text-muted-foreground">Result will appear here when the agent completes.</p>
          ) : (
            <div className="text-[15px] leading-7 text-slate-800 max-h-[65vh] overflow-auto space-y-3">
              {formattedParagraphs.map((html, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status & Plan (collapsible) */}
      <Card>
        <CardHeader
          onClick={() => setOpenStatus((v) => !v)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenStatus((v) => !v)}
          role="button"
          tabIndex={0}
          className="cursor-pointer select-none border-b hover:bg-slate-50/60 transition-colors"
        >
          <CardTitle className="flex items-center justify-between">
            <span>Status & Plan</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openStatus ? 'rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {openStatus && (
          <CardContent className="space-y-3">
            {!status && <p className="text-sm text-muted-foreground">No session yet. Start a research task to see progress.</p>}
            {status && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">Status: {status.status}</Badge>
                  {status.complete ? (
                    <Badge className="bg-green-600 text-white"><CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Complete</Badge>
                  ) : polling ? (
                    <Badge variant="secondary"><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> In Progress</Badge>
                  ) : null}
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Current Activity</p>
                  <p className="text-sm text-muted-foreground">{status.activity || '—'}</p>
                </div>
                {status.plan_steps?.length ? (
                  <div>
                    <p className="text-sm font-medium mb-2">Plan</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      {status.plan_steps.map((s, i) => (
                        <li key={i} className={i === status.current_step ? 'font-semibold' : ''}>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
                {status.step_results?.length ? (
                  <div>
                    <p className="text-sm font-medium mb-2">Step Results</p>
                    <div className="space-y-2 max-h-56 overflow-auto pr-1">
                      {status.step_results.map((r) => (
                        <div key={r.step} className="text-sm border rounded p-2">
                          <div className="text-xs text-muted-foreground mb-1">Step {r.step} • {new Date(r.timestamp).toLocaleTimeString()}</div>
                          <div className="whitespace-pre-wrap">{r.result}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {execution.length ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowHistory((v) => !v)}
                      className="text-sm text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      <span>{showHistory ? 'Hide' : 'Show'} Execution History</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                    </button>
                    {showHistory && (
                      <ol className="list-decimal pl-5 space-y-1 max-h-60 overflow-auto">
                        {execution.map((e, i) => (
                          <li key={i} className="text-sm whitespace-pre-wrap">{e}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Reflection (collapsible) — only show when content exists */}
      {!!reflection && (
      <Card>
        <CardHeader
          onClick={() => setOpenReflection((v) => !v)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenReflection((v) => !v)}
          role="button"
          tabIndex={0}
          className="cursor-pointer select-none border-b hover:bg-slate-50/60 transition-colors"
        >
          <CardTitle className="flex items-center justify-between">
            <span>Reflection</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openReflection ? 'rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {openReflection && (
          <CardContent>
            {!reflection ? (
              <p className="text-sm text-muted-foreground">The agent&apos;s self-reflection will appear here.</p>
            ) : (
              <div className="whitespace-pre-wrap text-[15px] leading-6 text-slate-800 max-h-[50vh] overflow-auto">{reflection}</div>
            )}
          </CardContent>
        )}
      </Card>
      )}

      {/* System Metrics removed for public UI */}
      </div>
    </div>
  );
}
