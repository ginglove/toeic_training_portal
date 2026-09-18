'use client';

import React from 'react';
import Link from 'next/link';
import { Database, ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminItemBankPage() {
  const items = [
    { id: 'q-01', part: 1, text: 'Look at the photograph marked No. 1...', difficulty: -0.8, status: 'PUBLISHED' },
    { id: 'q-02', part: 2, text: 'When is the quarterly budget review meeting...', difficulty: -0.3, status: 'PUBLISHED' },
    { id: 'q-03', part: 5, text: 'The newly appointed director plans to...', difficulty: 0.2, status: 'PUBLISHED' },
    { id: 'q-04', part: 7, text: 'What is the primary purpose of this memo...', difficulty: 0.5, status: 'PUBLISHED' },
  ];

  return (
    <div className="min-h-[85vh] mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-purple-400 font-bold hover:underline mb-2">
            <ArrowLeft className="h-3.5 w-3.5" /> Trở về Admin Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Ngân Hàng Câu Hỏi &amp; Đề Thi (S-25 Item Bank)
          </h1>
        </div>

        <button
          onClick={() => alert('Mở modal thêm câu hỏi mới')}
          className="btn-chunky inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm Câu Hỏi Mới</span>
        </button>
      </div>

      <div className="bento-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
            <tr>
              <th className="p-4">Mã Câu</th>
              <th className="p-4">Phần (Part)</th>
              <th className="p-4">Nội dung trích đoạn</th>
              <th className="p-4">Độ khó IRT (b)</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-850 transition">
                <td className="p-4 font-mono font-bold text-indigo-400">{item.id}</td>
                <td className="p-4 font-semibold">Part {item.part}</td>
                <td className="p-4 truncate max-w-xs">{item.text}</td>
                <td className="p-4 font-mono">{item.difficulty}</td>
                <td className="p-4">
                  <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 font-bold">
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-1.5 rounded-lg bg-slate-800 hover:text-white" title="Chỉnh sửa">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}