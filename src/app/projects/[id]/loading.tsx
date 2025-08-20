export default function ProjectLoading() {
  return (
    <div className="min-h-[60vh]">
      <div className="container mx-auto px-4">
        <div className="h-8 w-64 bg-slate-200 rounded mt-8 mb-4 animate-pulse" />
        <div className="h-4 w-96 bg-slate-200 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-100 rounded border border-slate-200 animate-pulse" />
          <div className="h-64 bg-slate-100 rounded border border-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
