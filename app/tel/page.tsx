import { Suspense } from "react";
import OilList from "./OilList";

export default function OilPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        }
      >
        <OilList />
      </Suspense>
    </main>
  );
}
