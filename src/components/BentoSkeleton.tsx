import React from 'react';

export function SkeletonBox({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-850/80 bg-gradient-to-r from-slate-900 via-slate-800/60 to-slate-900 bg-[length:200%_100%] ${className}`}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <SkeletonBox className="h-8 w-64" />
          <SkeletonBox className="h-4 w-96 max-w-full" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonBox className="h-10 w-36 rounded-xl" />
          <SkeletonBox className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Row 1: 3 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-5 w-5 rounded-full" />
          </div>
          <div className="flex gap-4">
            <SkeletonBox className="h-10 w-20" />
            <SkeletonBox className="h-10 w-20" />
          </div>
          <SkeletonBox className="h-3 w-full rounded-full" />
          <SkeletonBox className="h-4 w-3/4" />
        </div>

        {/* Card 2 */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="h-5 w-5 rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <SkeletonBox className="h-16 w-16 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <SkeletonBox className="h-5 w-24" />
              <SkeletonBox className="h-3 w-36" />
            </div>
          </div>
          <SkeletonBox className="h-2 w-full rounded-full" />
          <SkeletonBox className="h-9 w-full rounded-xl" />
        </div>

        {/* Card 3 */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-4 w-36" />
            <SkeletonBox className="h-5 w-5 rounded-full" />
          </div>
          <div className="space-y-2">
            <SkeletonBox className="h-6 w-48" />
            <SkeletonBox className="h-4 w-28" />
          </div>
          <SkeletonBox className="h-10 w-full rounded-xl" />
        </div>
      </div>

      {/* Row 2: 2 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bento-card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-5 w-48" />
            <SkeletonBox className="h-4 w-20" />
          </div>
          <SkeletonBox className="h-16 w-full rounded-xl" />
          <SkeletonBox className="h-16 w-full rounded-xl" />
          <SkeletonBox className="h-16 w-full rounded-xl" />
        </div>

        <div className="bento-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-5 w-48" />
            <SkeletonBox className="h-6 w-24 rounded-full" />
          </div>
          <SkeletonBox className="h-12 w-full" />
          <SkeletonBox className="h-20 w-full rounded-xl" />
          <SkeletonBox className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in duration-300">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bento-card p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <SkeletonBox className="h-12 w-12 rounded-xl" />
            <SkeletonBox className="h-4 w-16" />
            <SkeletonBox className="h-5 w-3/4" />
            <SkeletonBox className="h-12 w-full" />
          </div>
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <SkeletonBox className="h-4 w-20" />
            <SkeletonBox className="h-9 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NotebookSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <SkeletonBox className="h-8 w-28 rounded-xl" />
        <SkeletonBox className="h-6 w-32 rounded-full" />
      </div>
      <div className="bento-card p-8 min-h-[360px] flex flex-col justify-between space-y-6">
        <div className="flex justify-between items-center">
          <SkeletonBox className="h-5 w-40" />
          <SkeletonBox className="h-5 w-20" />
        </div>
        <div className="space-y-3">
          <SkeletonBox className="h-6 w-full" />
          <SkeletonBox className="h-6 w-4/5" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
          <SkeletonBox className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SagaMapSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <SkeletonBox className="h-8 w-28 rounded-xl" />
        <SkeletonBox className="h-8 w-60 rounded-xl" />
      </div>
      <div className="bento-card p-8 min-h-[500px] flex flex-col items-center justify-center space-y-8">
        <SkeletonBox className="h-16 w-16 rounded-full" />
        <div className="flex items-center gap-12">
          <SkeletonBox className="h-14 w-14 rounded-2xl" />
          <SkeletonBox className="h-14 w-14 rounded-2xl" />
          <SkeletonBox className="h-14 w-14 rounded-2xl" />
        </div>
        <SkeletonBox className="h-8 w-64 rounded-full" />
      </div>
    </div>
  );
}
