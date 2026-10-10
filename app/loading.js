export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-base-100 px-4">
      {" "}
      <div className="flex flex-col items-center gap-5">
        {/* Animated spinner */}{" "}
        <div className="relative flex size-20 items-center justify-center">
          {" "}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-base-300 border-t-primary" />
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        </div>
        {/* Loading message */}
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold tracking-tight text-base-content">
            Loading...
          </h2>

          <p className="text-sm text-base-content/60">
            Please wait while we prepare your content.
          </p>
        </div>
        {/* Animated progress bar */}
        <div className="h-1 w-32 overflow-hidden rounded-full bg-base-300">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </main>
  );
}
