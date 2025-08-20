// Research Agent API client
// Mirrors the BaseAPIClient pattern used in chatbot.ts

export const DEFAULT_BASE_URL = 'https://subjective-martha-researchagent-ebdaf861.koyeb.app/api';

export interface APIResponse<T> {
  data: T;
  status: number;
  success: boolean;
}

class BaseAPIClient {
  protected baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
    const data = await response.json();
    return { data, status: response.status, success: response.ok };
  }
}

export interface StartChatResponse { session_id: string; status: string }
export interface ResultResponse { session_id: string; response: string; complete: boolean }
export interface ReflectionResponse { session_id: string; reflection: string; complete: boolean }
export interface ExecutionResponse { session_id: string; execution_history: string[]; step_count: number }

export interface SessionStatus {
  session_id: string;
  status: 'Starting' | 'Processing' | 'Complete' | 'Error';
  activity: string;
  confidence: number;
  complete: boolean;
  plan_steps: string[];
  current_step: number;
  step_results: Array<{ step: number; result: string; timestamp: string }>;
}

export interface MemorySummary {
  total_conversations: number;
  semantic_enabled: boolean;
  embeddings_cached: number;
  memory_file_size: number;
  latest_conversation: string;
  confidence_trend: number;
  recent_topics: string[];
}

export interface KeyStatus {
  total_keys: number;
  available_keys: number;
  exhausted_keys: number;
  request_counts: Record<string, { requests: number; last_used: string | null }>;
}

export interface HealthResponse {
  status: string;
  agent_initialized?: boolean;
  active_sessions?: number;
  timestamp?: string;
}

export class ResearchAgentClient extends BaseAPIClient {
  constructor(baseURL?: string) {
    super((baseURL && baseURL.trim()) || process.env.NEXT_PUBLIC_RESEARCH_AGENT_API || DEFAULT_BASE_URL);
  }

  healthCheck() {
    return this.request<HealthResponse>('/health', { method: 'GET' });
  }

  startChat(query: string) {
    return this.request<StartChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  getStatus(sessionId: string) {
    return this.request<SessionStatus>(`/status/${sessionId}`, { method: 'GET' });
  }

  getResult(sessionId: string) {
    return this.request<ResultResponse>(`/result/${sessionId}`, { method: 'GET' });
  }

  getReflection(sessionId: string) {
    return this.request<ReflectionResponse>(`/reflection/${sessionId}`, { method: 'GET' });
  }

  getExecution(sessionId: string) {
    return this.request<ExecutionResponse>(`/execution/${sessionId}`, { method: 'GET' });
  }

  getMemorySummary() {
    return this.request<MemorySummary>('/memory/summary', { method: 'GET' });
  }

  clearMemory() {
    return this.request<{ status: string }>('/memory/clear', { method: 'POST' });
  }

  getKeyStatus() {
    return this.request<KeyStatus>('/keys/status', { method: 'GET' });
  }
}
