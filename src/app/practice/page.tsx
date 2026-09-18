import React from 'react';
import Link from 'next/link';
import { Layers, Volume2, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';

const PARTS_DATA = [
  { part: 1, name: 'Photographs', section: 'LISTENING', count: 6, desc: 'Mô tả hình ảnh con người & vật cảnh', color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { part: 2, name: 'Question & Response', section: 'LISTENING', count: 25, desc: 'Hỏi đáp trực tiếp & phản hồi gián tiếp', color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { part: 3, name: 'Short Conversations', section: 'LISTENING', count: 39, desc: 'Đối thoại ngắn 2-3 người kèm biểu đồ', color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { part: 4, name: 'Short Talks', section: 'LISTENING', count: 30, desc: 'Bài nói độc thoại thông báo & tin tức', color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { part: 5, name: 'Incomplete Sentences', section: 'READING', count: 30, desc: 'Điền từ câu đơn ngữ pháp & từ vựng', color: 'text-purple-400', border: 'border-purple-500/30' },
  { part: 6, name: 'Text Completion', section: 'READING', count: 16, desc: 'Hoàn thành đoạn văn & điền câu ngữ cảnh', color: 'text-purple-400', border: 'border-purple-500/30' },
  { part: 7, name: 'Reading Comprehension', section: 'READING', count: 54, desc: 'Đọc hiểu đoạn đơn, đoạn kép và đoạn ba', color: 'text-purple-400', border: 'border-purple-500/30' },
];

export default function FreePracticePage() {
  return (
    <div className="min-h-[85vh] mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-xs font-bold text-indigo-400 mb-3">
          <Layers className="h-3.5 w-3.5" />
          <span>LUYỆN TẬP TỰ DO · S-15 PART HUB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Kho Luyện Tập Theo Từng Part Chuẩn ETS
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Chủ động củng cố điểm yếu theo từng phần bài thi. Hoàn toàn miễn phí không giới hạn lượt luyện.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARTS_DATA.map((p) => (
          <div key={p.part} className={`bento-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all ${p.border}`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400">
                  {p.section === 'LISTENING' ? '🎧 LISTENING' : '📖 READING'}
                </span>
                <span className={`text-xs font-bold ${p.color}`}>Part {p.part}</span>
              </div>

              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              <p className="mt-4 text-xs font-semibold text-slate-300">
                Quy chuẩn: <strong className="text-white">{p.count} câu</strong> trong đề full
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link
                href={`/drills`}
                className="btn-chunky w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-700 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition"
              >
                <span>Luyện Tập Part Này</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}