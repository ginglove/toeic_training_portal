'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export type GuardianCharacter = 'sparky' | 'echlet' | 'lumink' | 'streaklyn' | 'verbil';
export type AscensionStage = 1 | 2 | 3 | 4;
export type AnimationState = 'idle' | 'focus' | 'victory' | 'comfort' | 'evolution' | 'special';

/**
 * Resolve expression-specific guardian image path.
 * MVP: Returns single `{character}_anime.webp` (WebP with alpha transparency).
 * Post-MVP (v10.2+): Will return `{character}_{expression}.webp` per-expression assets.
 *
 * @see CHARACTER-ANIMATION-DESIGN-v10.md Section 1.4 — MVP Scope Lock
 */
export function resolveGuardianImage(
  character: GuardianCharacter,
  _expression?: AnimationState
): string {
  // MVP: single asset per guardian (Stage 1, all expressions share one image)
  return `/lexlings/${character}_anime.webp`;
  // TODO (v10.2): Enable per-expression assets when 25 WebP alpha files are produced
  // return `/lexlings/${character}_${expression}.webp`;
}

interface AnimeGuardianProps {
  character?: GuardianCharacter;
  stage?: AscensionStage;
  state?: AnimationState;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDialogue?: boolean;
  customDialogue?: string;
  interactive?: boolean;
  className?: string;
  onInteraction?: () => void;
}

export const GUARDIAN_CONFIGS: Record<GuardianCharacter, {
  name: string;
  title: string;
  element: string;
  color: string;
  glowColor: string;
  image: string;
  relic: string;
  dialogues: {
    idle: string[];
    focus: string[];
    victory: string[];
    comfort: string[];
    evolution: string[];
  };
}> = {
  sparky: {
    name: 'Sparky',
    title: 'Thiếu Niên Sấm Sét · Lightning Guardian',
    element: 'Lôi Điện',
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    image: '/lexlings/sparky_anime.webp',
    relic: 'Haori dệt tia sét',
    dialogues: {
      idle: [
        'Sẵn sàng bứt tốc Part 5 dưới 8 giây chưa bạn ơi! ⚡',
        'Tia sét tập trung, phản xạ tức thì!',
        'Hôm nay chúng ta sẽ quét sạch các bẫy ngữ pháp!'
      ],
      focus: ['Tập trung cao độ... Tia chớp đang tích tụ năng lượng!'],
      victory: ['Thần tốc! Đúng chính xác tuyệt đối! ⚡⚡⚡', 'Tuyệt chiêu Lôi Đình! 3 sao hoàn hảo!'],
      comfort: ['Không sao cả! Hãy hít thở sâu, làm lại câu này nào!', 'Tia chớp cần nạp lại để giáng đòn mạnh hơn!'],
      evolution: ['Lôi thần thức tỉnh! Cấp độ mới mở ra!']
    }
  },
  echlet: {
    name: 'Echlet',
    title: 'Thánh Nữ Sóng Âm · Sonic Maiden',
    element: 'Phong Lôi / Sóng Âm',
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    image: '/lexlings/echlet_anime.webp',
    relic: 'Tai nghe pha lê sóng âm',
    dialogues: {
      idle: [
        'Lắng nghe giai điệu của từng âm tiết... 🦉🎵',
        'Cẩn thận bẫy đồng âm Part 2 bạn nhé!',
        'Sóng âm thanh khiết sẽ dẫn lối đáp án đúng.'
      ],
      focus: ['Đang phân tích quang phổ âm thanh...'],
      victory: ['Thính giác phi thường! Bạn bắt trúng từ khóa rồi! 🎶', 'Âm điệu du dương! Chuẩn xác 100%!'],
      comfort: ['Đừng nản lòng, bẫy phát âm này rất tinh vi. Cùng nghe lại nhé!', 'Thanh âm dịu dàng luôn đồng hành cùng bạn.'],
      evolution: ['Thánh nữ sóng âm thăng hoa cảnh giới mới!']
    }
  },
  lumink: {
    name: 'Lumink',
    title: 'Thiếu Nữ Tinh Tú · Starlight Scholar',
    element: 'Tinh Tú / Quang Học',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    image: '/lexlings/lumink_anime.webp',
    relic: 'Kính thiên văn khúc xạ cầu vồng',
    dialogues: {
      idle: [
        'Mỗi đoạn văn Part 7 đều ẩn chứa vì sao manh mối 🦊✨',
        'Quét từ khóa trước khi đọc chi tiết nhé!',
        'Ánh sao tri thức soi sáng mọi văn bản dài.'
      ],
      focus: ['Đang khúc xạ ánh sáng tìm manh mối ẩn...'],
      victory: ['Manh mối sáng tỏ như sao Kim! Xuất sắc! ✨', 'Khúc xạ cầu vồng! Tìm thấy đáp án ẩn rồi!'],
      comfort: ['Đoạn văn này nhiều thông tin gây nhiễu, cùng rà lại dòng 3 nhé!', 'Hãy để tinh tú dẫn đường cho bạn.'],
      evolution: ['Tinh hoa học giả thức tỉnh vầng hào quang vũ trụ!']
    }
  },
  streaklyn: {
    name: 'Streaklyn',
    title: 'Hoàng Tử Hỏa Long · Flame Dragon Prince',
    element: 'Hỏa Tinh',
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    image: '/lexlings/streaklyn_anime.webp',
    relic: 'Hỏa châu ngọc hổ phách',
    dialogues: {
      idle: [
        'Ngọn lửa nhiệt huyết không bao giờ tắt! 🔥',
        'Giữ vững chuỗi ngày học để đánh thức rồng lửa!',
        'Ý chí kiên định là chìa khóa của 990 TOEIC.'
      ],
      focus: ['Ngọn lửa tập trung... Hơi thở rồng thiêng!'],
      victory: ['Bùng cháy! Chuỗi thành tích rực sáng! 🔥🔥🔥', 'Khí chất vương giả! Đỉnh cao phản xạ!'],
      comfort: ['Ngọn đuốc vẫn ấm áp. Cùng nhau thắp sáng lại nào!', 'Thất bại chỉ là tàn tro trước ngọn lửa lớn!'],
      evolution: ['Hỏa Long Thần Thú thăng thiên rực rỡ!']
    }
  },
  verbil: {
    name: 'Verbil',
    title: 'Hiền Triết Cổ Tự · Jade Rune Sage',
    element: 'Mộc Cổ / Phù Văn',
    color: '#10B981',
    glowColor: 'rgba(168, 185, 129, 0.35)',
    image: '/lexlings/verbil_anime.webp',
    relic: 'Thẻ ngọc La-tinh cổ thư',
    dialogues: {
      idle: [
        '5.000 từ vựng cốt lõi đang nằm trong tầm tay bạn 🐢📜',
        'Lặp lại ngắt quãng SM-2 sẽ khắc sâu tri thức.',
        'Mỗi gốc từ là một chiếc chìa khóa mở ra vạn câu từ.'
      ],
      focus: ['Đang đối chiếu phù văn cổ La-tinh...'],
      victory: ['Uyên bác tuyệt luân! Khắc sâu vào trí nhớ dài hạn! 📜', 'Thuật nhớ 5 sao hoàn mỹ!'],
      comfort: ['Đừng lo âu, ta sẽ sắp xếp ôn lại từ này vào ngày mai!', 'Đạo học như dòng nước chảy, bền bỉ ắt thành.'],
      evolution: ['Đại hiền triết đắc đạo, ngọc thư tỏa ánh bích ngọc!']
    }
  }
};

const STAGE_TITLES: Record<AscensionStage, { label: string; aura: string }> = {
  1: { label: 'Giai đoạn 1: Sơ Tâm (Soul Embryo)', aura: 'border-slate-500/40 shadow-slate-500/20' },
  2: { label: 'Giai đoạn 2: Hành Giả (Adventurer)', aura: 'border-cyan-500/50 shadow-cyan-500/30' },
  3: { label: 'Giai đoạn 3: Hiệp Sĩ (Fierce Hero)', aura: 'border-purple-500/60 shadow-purple-500/40 ring-2 ring-purple-500/30' },
  4: { label: 'Giai đoạn 4: Thần Linh (Celestial Deity)', aura: 'border-amber-400 shadow-amber-400/50 ring-4 ring-amber-400/40 animate-pulse' },
};

const SIZE_CLASSES = {
  sm: 'w-16 h-16',
  md: 'w-28 h-28',
  lg: 'w-44 h-44',
  hero: 'w-64 h-64 sm:w-72 sm:h-72',
};

export function AnimeGuardian({
  character = 'sparky',
  stage = 1,
  state = 'idle',
  size = 'md',
  showDialogue = true,
  customDialogue,
  interactive = true,
  className = '',
  onInteraction
}: AnimeGuardianProps) {
  const config = GUARDIAN_CONFIGS[character] || GUARDIAN_CONFIGS.sparky;
  const stageInfo = STAGE_TITLES[stage] || STAGE_TITLES[1];
  const [currentDialogue, setCurrentDialogue] = useState('');
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (customDialogue) {
      setCurrentDialogue(customDialogue);
      return;
    }
    const pool = (config.dialogues as any)[state] || config.dialogues.idle;
    const randomText = pool[Math.floor(Math.random() * pool.length)];
    setCurrentDialogue(randomText);
  }, [state, character, customDialogue, config]);

  const handleTap = () => {
    if (!interactive) return;
    setIsInteracting(true);
    const idlePool = config.dialogues.idle;
    const randomPick = idlePool[Math.floor(Math.random() * idlePool.length)];
    setCurrentDialogue(randomPick);
    if (onInteraction) onInteraction();
    setTimeout(() => setIsInteracting(false), 800);
  };

  const containerClass = 'relative flex flex-col items-center select-none ' + className;
  const interactiveClass = isInteracting ? 'scale-110 -translate-y-2' : '';
  const frameClass = 'relative rounded-full overflow-hidden border-2 bg-slate-950 shadow-2xl transition-all duration-300 ' + SIZE_CLASSES[size] + ' ' + stageInfo.aura;
  
  let imageFx = '';
  if (state === 'focus') imageFx = 'scale-105 saturate-150';
  else if (state === 'victory') imageFx = 'scale-110 brightness-110';
  else if (state === 'comfort') imageFx = 'scale-95 opacity-90';

  return (
    <div className={containerClass}>
      {showDialogue && currentDialogue && (
        <div className="mb-3 max-w-[260px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-xl shadow-black/40 backdrop-blur-md">
            <p className="leading-relaxed">{currentDialogue}</p>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45" />
          </div>
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={handleTap}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTap();
          }
        }}
        aria-label={`${config.name} (${config.title}) - Nhấp để tương tác`}
        className={'relative group cursor-pointer transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-full ' + interactiveClass}
        title={config.name + ' (' + config.title + ') - Nhấp để tương tác'}
      >
        <div
          className="absolute -inset-2 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"
          style={{ backgroundColor: config.glowColor }}
        />

        <div
          className={frameClass}
          style={{
            animation: 'zero-g-float 3.2s ease-in-out infinite alternate',
          }}
        >
          <Image
            src={resolveGuardianImage(character, state)}
            alt={config.name}
            fill
            sizes="(max-width: 768px) 160px, 320px"
            className={'object-cover object-center transition-all duration-500 ' + imageFx}
            priority
          />

          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
            style={{ backgroundColor: config.color }}
          />

          {stage >= 3 && (
            <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 border border-amber-400/80 shadow">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          )}
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900/95 border border-slate-700/80 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
          <span>{config.name}</span>
          <span className="text-slate-400">· Lv.{stage}</span>
        </div>
      </div>
    </div>
  );
}