const LoadingSkeleton = ({ count = 8, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="skeleton aspect-square rounded-none" />
              <div className="p-4 space-y-3">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="flex justify-between">
                  <div className="skeleton h-6 w-16" />
                  <div className="skeleton h-10 w-10 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-20 w-full" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
