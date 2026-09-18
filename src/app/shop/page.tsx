'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gem, ShoppingBag, Shield, Heart, Sparkles, BookOpen, ChevronLeft, Check } from 'lucide-react';
import { ShopSkeleton } from '@/components/BentoSkeleton';
import { useToast } from '@/components/Toast';

export default function ShopPage() {
  const [items, setItems] = useState<any[]>([]);
  const [gems, setGems] = useState(280);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    // Load shop items and user gems
    Promise.all([
      fetch('/api/v1/shop/items').then((r) => r.json()),
      fetch('/api/v1/users/me/dashboard').then((r) => r.json()),
    ])
      .then(([itemsJson, dashJson]) => {
        if (itemsJson.success) setItems(itemsJson.data);
        if (dashJson.success) setGems(dashJson.data.gamification?.gems || 280);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = async (item: any) => {
    if (gems < item.gemsPrice) {
      showToast(`Bạn không đủ Gems! Cần ${item.gemsPrice} Gems.`, 'error');
      return;
    }

    setBuyingId(item.id);
    try {
      const res = await fetch('/api/v1/shop/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.data.message || 'Đổi vật phẩm thành công!', 'success');
        setGems(json.data.remainingGems);
        window.dispatchEvent(new CustomEvent('toeic:gamification-update', {
          detail: { gems: json.data.remainingGems }
        }));
      } else {
        showToast(json.detail || 'Giao dịch thất bại.', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi kết nối máy chủ khi thực hiện giao dịch', 'error');
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Về Dashboard</span>
        </Link>

        {/* Gems Balance Badge */}
        <div className="flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 border border-indigo-500/30 text-xs font-bold text-indigo-400">
          <Gem className="h-4 w-4 fill-indigo-400" />
          <span>Số dư: {gems} Gems</span>
        </div>
      </div>

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
          <ShoppingBag className="h-7 w-7 text-indigo-400" />
          <span>Cửa Hàng Vật Phẩm Đổi Thưởng</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Tất cả vật phẩm được đổi 100% bằng Gems kiếm được từ việc làm bài tập và hoàn thành nhiệm vụ. Tuyệt đối không nạp tiền mặt.
        </p>
      </div>

      {loading ? (
        <ShopSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => {
            const canAfford = gems >= item.gemsPrice;
            const isBuying = buyingId === item.id;

            return (
              <div key={item.id} className="bento-card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 mb-4">
                    {item.category === 'BOOSTER' ? (
                      <Shield className="h-6 w-6 text-amber-400" />
                    ) : item.category === 'COSMETIC' ? (
                      <Sparkles className="h-6 w-6 text-purple-400" />
                    ) : (
                      <BookOpen className="h-6 w-6 text-emerald-400" />
                    )}
                  </div>

                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                    {item.category}
                  </span>

                  <h3 className="mt-2 text-sm font-bold text-white leading-snug">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-indigo-400">
                    <span className="flex items-center gap-1">
                      <Gem className="h-3.5 w-3.5 fill-indigo-400" />
                      {item.gemsPrice} Gems
                    </span>
                  </div>

                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford || isBuying}
                    className="btn-chunky w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-40 transition"
                  >
                    {isBuying ? 'Đang đổi...' : canAfford ? 'Đổi Vật Phẩm' : 'Chưa đủ Gems'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
