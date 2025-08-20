import * as React from "react";
import { cn } from "@/lib/utils";

export interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
  minHeight?: number;
  onHeightChange?: (height: number) => void;
}

const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ className, maxHeight = 120, minHeight = 44, onHeightChange, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = React.useState<number>(minHeight);

  const combinedRef = React.useCallback(
    (node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";
    
    // Calculate new height
    const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight));
    
    // Apply new height
    textarea.style.height = `${newHeight}px`;
    
    if (newHeight !== height) {
      setHeight(newHeight);
      onHeightChange?.(newHeight);
    }
  }, [height, maxHeight, minHeight, onHeightChange]);

  React.useEffect(() => {
    adjustHeight();
  }, [props.value, adjustHeight]);

  return (
    <textarea
      ref={combinedRef}
      className={cn(
        "flex w-full rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200",
        className
      )}
      style={{ 
        height: `${height}px`,
        overflow: height >= maxHeight ? 'auto' : 'hidden'
      }}
      onInput={adjustHeight}
      {...props}
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";

export { AutoResizeTextarea }; 