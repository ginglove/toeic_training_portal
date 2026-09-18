'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Star, Lock, Play, Sparkles, CheckCircle2, ChevronLeft, Shield, X, Zap } from 'lucide-react';
import { SagaMapSkeleton } from '@/components/BentoSkeleton';

export default function SagaMapPage() {
  const [mapData, setMapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedNode) {
        setSelectedNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode]);

  useEffect(() => {
    // Get active journey first
    fetch('/api/v1/users/me/dashboard')
      .then((res) => res.json())
      .then((dash) => {
        const journeyId = dash?.data?.journey?.id;
        if (journeyId) {
          return fetch(`/api/v1/journeys/${journeyId}/maps`);
        }
        throw new Error('No journey found');
      })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setMapData(json.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SagaMapSkeleton />;
  }

  const nodes = mapData?.nodes || [];
  const guardian = mapData?.guardian || { name: 'Sparky', stage: 1 };

  return (
    <div className="relative min-h-[calc(100dvh-64px)] bg-slate-950 px-4 py-8 sm:px-6">
      {/* Map Header Controls */}
      <div className="mx-auto max-w-4xl flex items-center justify-between mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Về Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300">
            <span>Quần xã: </span>
            <span className="text-emerald-400 font-bold">Thung Lũng Bình Minh (Part 1 & 2)</span>
          </div>
        </div>
      </div>

      {/* 2.5D Map Canvas Container */}
      <div className="mx-auto max-w-2xl relative pb-32">
        {/* Background track line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-2 -translate-x-1/2 rounded-full bg-slate-800/80 -z-10" />

        {/* Nodes Vertical S-Curve List */}
        <div className="flex flex-col gap-16 relative">
          {nodes.map((node: any, idx: number) => {
            const isCompleted = node.status === 'COMPLETED';
            const isCurrent = node.status === 'CURRENT';
            const isLocked = node.status === 'LOCKED';

            // X-Offset simulation for S-Curve
            const xOffset = Math.sin((node.nodeIndex / 2) * Math.PI) * 40;

            return (
              <div
                key={node.id}
                style={{ transform: `translateX(${xOffset}px)` }}
                className="flex flex-col items-center transition-transform"
              >
                {/* Guardian Lexling on Current Node */}
                {isCurrent && (
                  <div className="mb-2 flex flex-col items-center animate-bounce">
                    <div className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black text-slate-950 shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      <span>{guardian.name} Đang Ở Đây!</span>
                    </div>
                    <div className="mt-1 flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 border border-amber-500/40">
                      <Zap className="h-5 w-5 text-amber-400 fill-amber-400" />
                    </div>
                  </div>
                )}

                {/* The Node Button */}
                <button
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  aria-label={`Trạm ${node.nodeIndex}: ${node.title} - ${isCompleted ? 'Đã hoàn thành' : isCurrent ? 'Đang học' : 'Đang khóa'}`}
                  className={`relative group flex h-16 w-16 items-center justify-center rounded-2xl font-black text-lg shadow-2.5d transition-all cursor-pointer ${
                    isCompleted
                      ? 'saga-node-completed text-amber-100 hover:scale-105 active:scale-95'
                      : isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-400/50 hover:bg-indigo-500 animate-pulse'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-8 w-8 text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  ) : isCurrent ? (
                    <Play className="h-7 w-7 fill-white ml-0.5" />
                  ) : (
                    <Lock className="h-6 w-6 text-slate-600" />
                  )}

                  {/* Stars display with Candy Juice Bounce */}
                  {isCompleted && (
                    <div className="absolute -bottom-3 flex items-center gap-0.5 rounded-full bg-slate-950 px-2 py-0.5 border border-amber-400/50 shadow-md">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`h-2.5 w-2.5 saga-candy-star ${
                            s <= node.starsEarned ? 'fill-amber-400 text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]' : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>

                {/* Node Label */}
                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-slate-200">{node.title}</p>
                  <p className="text-[10px] font-medium text-slate-400">Trạm {node.nodeIndex} · Part {node.targetPart}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Details Modal Drawer */}
      {selectedNode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="node-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/30">
                  {selectedNode.nodeType}
                </span>
                <h3 id="node-modal-title" className="mt-3 text-lg font-bold text-white">{selectedNode.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Trọng tâm: TOEIC Part {selectedNode.targetPart}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                aria-label="Đóng chi tiết trạm"
                className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-2 rounded-xl bg-slate-950 p-4 border border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Số lượng câu hỏi:</span>
                <span className="font-bold text-white">{selectedNode.questionCount} câu</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Yêu cầu vượt qua:</span>
                <span className="font-bold text-amber-400">{selectedNode.minStarsRequired} sao</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Phần thưởng khi thắng:</span>
                <span className="font-bold text-emerald-400">+150 EXP · +15 Gems</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedNode(null)}
                className="w-1/2 rounded-xl bg-slate-800 py-3 text-xs font-bold text-slate-300 hover:bg-slate-700 transition"
              >
                Đóng
              </button>

              <Link
                href={`/node/${selectedNode.id}`}
                className={`w-1/2 inline-flex items-center justify-center rounded-xl py-3 text-xs font-black text-center transition ${
                  selectedNode.status === 'LOCKED'
                    ? 'pointer-events-none opacity-50 bg-slate-800 text-slate-500'
                    : 'btn-candy text-white shadow-lg'
                }`}
              >
                Vào Làm Bài (1 Tim)
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
