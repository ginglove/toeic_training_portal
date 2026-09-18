const { PrismaClient, Role, JourneyStatus, JourneyMode, MapNodeType, NodeStatus, BiomeTheme, ExamMode, LeagueTier } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data in reverse relation order
  await prisma.reviewHistory.deleteMany();
  await prisma.mistakeNotebook.deleteMany();
  await prisma.attemptDetail.deleteMany();
  await prisma.attempt.deleteMany();
  await prisma.userNodeProgress.deleteMany();
  await prisma.mapNode.deleteMany();
  await prisma.guardianLexling.deleteMany();
  await prisma.userJourney.deleteMany();
  await prisma.userDailyQuest.deleteMany();
  await prisma.dailyQuest.deleteMany();
  await prisma.shopItem.deleteMany();
  await prisma.userInventory.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.gamificationState.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.diagnosticProfile.deleteMany();
  await prisma.arenaParticipant.deleteMany();
  await prisma.arenaMatch.deleteMany();
  await prisma.questionSkillAssignment.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.stimulusGroup.deleteMany();
  await prisma.skillTaxonomy.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing tables.');

  // 1. Password hashing
  const adminPasswordHash = await bcrypt.hash('AdminPassword123!', 10);
  const studentPasswordHash = await bcrypt.hash('StudentPassword123!', 10);

  // 2. Create Admin & Student
  const admin = await prisma.user.create({
    data: {
      email: 'admin@toeicpro.local',
      passwordHash: adminPasswordHash,
      name: 'Hệ Thống Quản Trị',
      role: Role.ADMIN,
      isEmailVerified: true,
      level: 99,
      totalExp: 99999,
      gamification: {
        create: {
          gems: 9999,
          energy: 5,
          currentStreak: 99,
          maxStreak: 99,
          leagueTier: LeagueTier.MASTER,
        }
      },
      settings: {
        create: {
          theme: 'DARK',
          audioSpeed: 1.0,
        }
      }
    }
  });

  const student = await prisma.user.create({
    data: {
      email: 'student@toeicpro.local',
      passwordHash: studentPasswordHash,
      name: 'Nguyễn Văn An',
      role: Role.STUDENT,
      isEmailVerified: true,
      level: 5,
      totalExp: 1450,
      gamification: {
        create: {
          gems: 280,
          energy: 5,
          currentStreak: 12,
          maxStreak: 14,
          activeShieldCount: 1,
          leagueTier: LeagueTier.SILVER,
          weeklyExp: 420,
        }
      },
      settings: {
        create: {
          audioSpeed: 1.0,
          autoPlayAudio: true,
          dailyReminderTime: '20:00',
          enableWebPush: true,
          theme: 'SYSTEM',
        }
      },
      diagnosticProfile: {
        create: {
          overallScore: 550,
          listeningScore: 290,
          readingScore: 260,
          thetaListening: 0.15,
          thetaReading: -0.10,
          skillMasteryJson: {
            LC_PART1_PHOTO_HUMAN: 0.75,
            LC_PART2_WH_QUESTION: 0.60,
            RC_PART5_VERB_TENSE: 0.50,
            RC_PART7_SINGLE_PASSAGE: 0.40,
          }
        }
      }
    }
  });

  console.log(`👤 Users seeded: Admin (${admin.email}), Student (${student.email})`);

  // 3. Skill Taxonomy
  const skills = [
    { id: 'LC_PART1_PHOTO', partNumber: 1, name: 'Part 1: Photographs', description: 'Hình ảnh mô tả hành động con người và vật cảnh' },
    { id: 'LC_PART1_PHOTO_HUMAN', partNumber: 1, name: 'Con người & Hành động', parentId: 'LC_PART1_PHOTO' },
    { id: 'LC_PART2_QA', partNumber: 2, name: 'Part 2: Question & Response', description: 'Hỏi đáp trực tiếp và phản hồi gián tiếp' },
    { id: 'LC_PART2_WH_QUESTION', partNumber: 2, name: 'Câu hỏi WH- (Who, Where, When, Why)', parentId: 'LC_PART2_QA' },
    { id: 'RC_PART5_GRAMMAR', partNumber: 5, name: 'Part 5: Incomplete Sentences', description: 'Ngữ pháp và từ vựng câu đơn' },
    { id: 'RC_PART5_VERB_TENSE', partNumber: 5, name: 'Hòa hợp Thì & Động từ', parentId: 'RC_PART5_GRAMMAR' },
    { id: 'RC_PART5_PREPOSITION', partNumber: 5, name: 'Giới từ & Liên từ nối', parentId: 'RC_PART5_GRAMMAR' },
    { id: 'RC_PART7_READING', partNumber: 7, name: 'Part 7: Reading Comprehension', description: 'Đọc hiểu đoạn đơn và đoạn kép' },
    { id: 'RC_PART7_SINGLE_PASSAGE', partNumber: 7, name: 'Email & Thư tín Thương mại', parentId: 'RC_PART7_READING' },
  ];

  for (const s of skills) {
    await prisma.skillTaxonomy.create({
      data: {
        id: s.id,
        partNumber: s.partNumber,
        name: s.name,
        description: s.description || null,
        parentId: s.parentId || null,
      }
    });
  }
  console.log(`📚 Skills seeded: ${skills.length} taxonomies`);

  // 4. Sample ETS Exam
  const equatingTable = {
    listening: { 0: 5, 5: 35, 10: 60, 15: 85, 20: 110, 25: 140, 30: 170, 35: 200, 40: 230, 45: 260, 50: 290, 60: 340, 70: 385, 80: 425, 90: 470, 100: 495 },
    reading: { 0: 5, 5: 25, 10: 45, 15: 70, 20: 95, 25: 120, 30: 150, 35: 180, 40: 210, 45: 240, 50: 270, 60: 315, 70: 360, 80: 405, 90: 455, 100: 495 }
  };

  const sampleExam = await prisma.exam.create({
    data: {
      code: 'ETS-2024-TEST-01',
      title: 'ETS TOEIC Official Practice Test 2024 #01',
      description: 'Đề thi thử toàn diện chuẩn cấu trúc khảo thí quốc tế ETS với 200 câu hỏi listening & reading',
      totalQuestions: 20, // Sample compact subset for quick test/demo
      timeLimitMinutes: 25,
      equatingTableJson: equatingTable,
      isPublished: true,
    }
  });

  // Questions for Exam
  const q1 = await prisma.question.create({
    data: {
      examId: sampleExam.id,
      partNumber: 1,
      questionNumber: 1,
      questionText: 'Look at the photograph marked No. 1 in your test book.',
      explanation: 'Người đàn ông đang mang kính bảo hộ lao động và ghi chép lên bảng kẹp tài liệu.',
      trapNote: 'Bẫy âm tương tự giữa "writing" và "riding".',
      irtDifficulty: -0.8,
      irtDiscrimination: 1.1,
      options: {
        create: [
          { label: 'A', text: 'He is wearing protective eyewear.', isCorrect: true },
          { label: 'B', text: 'He is repairing a machine.', isCorrect: false },
          { label: 'C', text: 'He is cleaning the workshop floor.', isCorrect: false },
          { label: 'D', text: 'He is lifting a heavy metal box.', isCorrect: false },
        ]
      },
      skills: {
        create: { skillId: 'LC_PART1_PHOTO_HUMAN', weight: 1.0 }
      }
    }
  });

  const q2 = await prisma.question.create({
    data: {
      examId: sampleExam.id,
      partNumber: 2,
      questionNumber: 2,
      questionText: 'When is the quarterly budget review meeting scheduled?',
      explanation: 'Câu hỏi bắt đầu bằng "When" hỏi về thời điểm cụ thể.',
      trapNote: 'Bẫy Yes/No không dùng cho câu hỏi WH-.',
      irtDifficulty: -0.3,
      irtDiscrimination: 1.3,
      options: {
        create: [
          { label: 'A', text: 'Yes, I received the report.', transcript: 'Yes, I received the report.', isCorrect: false },
          { label: 'B', text: 'In conference room B.', transcript: 'In conference room B.', isCorrect: false },
          { label: 'C', text: 'Next Tuesday afternoon at two o\'clock.', transcript: 'Next Tuesday afternoon at two o\'clock.', isCorrect: true },
        ]
      },
      skills: {
        create: { skillId: 'LC_PART2_WH_QUESTION', weight: 1.0 }
      }
    }
  });

  const q3 = await prisma.question.create({
    data: {
      examId: sampleExam.id,
      partNumber: 5,
      questionNumber: 3,
      questionText: 'Ms. Tanaka will deliver the opening presentation _______ the keynote speaker has not yet arrived.',
      explanation: 'Liên từ chỉ sự tương phản / nguyên nhân nhượng bộ.',
      trapNote: 'Bẫy giữa liên từ (because) và giới từ (due to).',
      irtDifficulty: 0.2,
      irtDiscrimination: 1.4,
      options: {
        create: [
          { label: 'A', text: 'because', isCorrect: true },
          { label: 'B', text: 'despite', isCorrect: false },
          { label: 'C', text: 'in spite of', isCorrect: false },
          { label: 'D', text: 'during', isCorrect: false },
        ]
      },
      skills: {
        create: { skillId: 'RC_PART5_PREPOSITION', weight: 1.0 }
      }
    }
  });

  const q4 = await prisma.question.create({
    data: {
      examId: sampleExam.id,
      partNumber: 5,
      questionNumber: 4,
      questionText: 'All employees are reminded that time sheets must be _______ by five o\'clock every Friday.',
      explanation: 'Cấu trúc bị động: must be + V-ed/V3 (submitted).',
      trapNote: 'Bẫy dạng từ: submit, submitting, submission, submitted.',
      irtDifficulty: -0.1,
      irtDiscrimination: 1.2,
      options: {
        create: [
          { label: 'A', text: 'submit', isCorrect: false },
          { label: 'B', text: 'submitted', isCorrect: true },
          { label: 'C', text: 'submitting', isCorrect: false },
          { label: 'D', text: 'submission', isCorrect: false },
        ]
      },
      skills: {
        create: { skillId: 'RC_PART5_VERB_TENSE', weight: 1.0 }
      }
    }
  });

  console.log(`📝 Exam seeded: ${sampleExam.code} with 4 sample questions`);

  // 5. User Journey & 48 Map Nodes across 4 Biomes
  const journey = await prisma.userJourney.create({
    data: {
      userId: student.id,
      targetScore: 800,
      initialScore: 550,
      predictedScore: 620,
      dailyCommitMinutes: 45,
      durationDays: 16,
      currentDay: 1,
      status: JourneyStatus.ACTIVE,
      mode: JourneyMode.STANDARD,
      guardian: {
        create: {
          name: 'Sparky',
          stage: 1,
          spriteUrl: '/assets/lexlings/sparky-stage1.png',
          evolutionProgress: 35.0,
        }
      }
    }
  });

  const biomes = [
    { theme: BiomeTheme.SUNRISE_VALLEY, name: 'Thung Lũng Bình Minh', part: 1 },
    { theme: BiomeTheme.VERDANT_FOREST, name: 'Rừng Xanh Nền Tảng', part: 2 },
    { theme: BiomeTheme.CRYSTAL_CAVES, name: 'Hang Động Tinh Thể', part: 5 },
    { theme: BiomeTheme.CELESTIAL_PEAK, name: 'Đỉnh Núi Tối Thượng', part: 7 },
  ];

  // Generate 48 map nodes (12 per biome)
  for (let i = 1; i <= 48; i++) {
    const biomeIdx = Math.floor((i - 1) / 12);
    const biome = biomes[biomeIdx];
    const nodeInBiome = ((i - 1) % 12) + 1;
    const day = Math.ceil(i / 3);

    let nodeType = MapNodeType.SKILL_DRILL;
    let title = `${biome.name} - Trạm ${i}`;
    let minStars = 1;

    if (nodeInBiome === 1) {
      nodeType = MapNodeType.WARMUP;
      title = `${biome.name}: Khởi Động Vượt Chướng Ngại`;
    } else if (nodeInBiome === 6) {
      nodeType = MapNodeType.REVIEW_GATE;
      title = `${biome.name}: Cổng Thử Thách Ôn Tập`;
      minStars = 2;
    } else if (nodeInBiome === 12) {
      nodeType = MapNodeType.BOSS_CHALLENGE;
      title = `${biome.name}: Đại Chiến Thủ Lĩnh`;
      minStars = 2;
    }

    // S-curve coordinate calculation
    // X oscillates between 20% and 80%
    const coordX = 50 + 30 * Math.sin((i / 4) * Math.PI);
    const coordY = i;

    let nodeStatus = NodeStatus.LOCKED;
    if (i === 1) nodeStatus = NodeStatus.COMPLETED;
    else if (i === 2) nodeStatus = NodeStatus.CURRENT;

    const node = await prisma.mapNode.create({
      data: {
        journeyId: journey.id,
        dayIndex: day,
        nodeIndex: i,
        nodeType: nodeType,
        title: title,
        coordXPercent: Number(coordX.toFixed(1)),
        coordYIndex: coordY,
        biomeTheme: biome.theme,
        targetPart: biome.part,
        targetSkillId: 'RC_PART5_VERB_TENSE',
        questionCount: 10,
        minStarsRequired: minStars,
        status: nodeStatus,
        progress: i === 1 ? {
          create: {
            starsEarned: 3,
            bestAccuracy: 100.0,
            totalAttempts: 1,
            bestDurationSeconds: 142,
            isCompleted: true,
            lastCompletedAt: new Date(),
          }
        } : undefined
      }
    });

    if (i === 2) {
      await prisma.userJourney.update({
        where: { id: journey.id },
        data: { activeNodeId: node.id }
      });
    }
  }

  console.log(`🗺️  Saga Map seeded: 48 nodes across 4 biomes for journey ${journey.id}`);

  // 6. Mistake Notebook (SM-2 Spaced Repetition)
  await prisma.mistakeNotebook.create({
    data: {
      userId: student.id,
      questionId: q3.id,
      easinessFactor: 2.5,
      repetitionNumber: 1,
      intervalDays: 1,
      nextReviewDate: new Date(), // Due today
      reviews: {
        create: {
          calculatedQuality: 4,
          timeSpentMs: 14500,
          isCorrect: true,
        }
      }
    }
  });

  await prisma.mistakeNotebook.create({
    data: {
      userId: student.id,
      questionId: q4.id,
      easinessFactor: 2.36,
      repetitionNumber: 0,
      intervalDays: 1,
      nextReviewDate: new Date(Date.now() - 3600000), // Overdue 1 hour
    }
  });

  console.log('📖 Mistake Notebook seeded with 2 review items (due today)');

  // 7. Daily Quests
  const qDef1 = await prisma.dailyQuest.create({
    data: {
      code: 'QUEST_COMPLETE_1_NODE',
      title: 'Chinh phục 1 trạm Saga Map',
      description: 'Hoàn thành ít nhất 1 trạm bài học trên bản đồ Saga 2.5D',
      targetCount: 1,
      rewardGems: 15,
      rewardExp: 50,
    }
  });

  const qDef2 = await prisma.dailyQuest.create({
    data: {
      code: 'QUEST_REVIEW_5_CARDS',
      title: 'Ôn tập 5 thẻ Sổ tay lỗi sai',
      description: 'Hoàn thành lượt ôn tập thuật toán SM-2 hôm nay',
      targetCount: 5,
      rewardGems: 20,
      rewardExp: 60,
    }
  });

  const qDef3 = await prisma.dailyQuest.create({
    data: {
      code: 'QUEST_PERFECT_DRILL',
      title: 'Chiến binh Bất bại',
      description: 'Đạt độ chính xác 100% trong 1 bài luyện vi kỹ năng',
      targetCount: 1,
      rewardGems: 25,
      rewardExp: 100,
    }
  });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  await prisma.userDailyQuest.createMany({
    data: [
      { userId: student.id, questId: qDef1.id, assignedDate: today, currentCount: 1, isCompleted: true, isClaimed: false },
      { userId: student.id, questId: qDef2.id, assignedDate: today, currentCount: 2, isCompleted: false, isClaimed: false },
      { userId: student.id, questId: qDef3.id, assignedDate: today, currentCount: 0, isCompleted: false, isClaimed: false },
    ]
  });

  console.log('🎯 Daily Quests seeded & assigned to student');

  // 8. Shop Items (100% In-Game Currency)
  const shopItems = [
    { id: 'ITEM_SHIELD_FREEZE', title: 'Khiên Bảo Vệ Chuỗi Ngày (Streak Freeze)', description: 'Tự động kích hoạt khi bạn lỡ một ngày học, bảo toàn chuỗi streak', category: 'BOOSTER', gemsPrice: 200, imageUrl: '/assets/shop/shield.png' },
    { id: 'ITEM_ENERGY_POTION', title: 'Bình Năng Lượng Thần Tốc (+5 Tim)', description: 'Nạp đầy ngay lập tức 5 điểm Năng lượng để tiếp tục làm bài luyện tập', category: 'BOOSTER', gemsPrice: 50, imageUrl: '/assets/shop/potion.png' },
    { id: 'ITEM_LEXLING_SHINY_AURA', title: 'Hiệu Ứng Ánh Hào Quang Cho Sparky', description: 'Trang phục phát sáng thần thoại cho linh thú đồng hành', category: 'COSMETIC', gemsPrice: 500, imageUrl: '/assets/shop/aura.png' },
    { id: 'ITEM_EBOOK_ETS_KEYS', title: 'Cẩm Nang 120 Bẫy Điển Hình ETS 2024 (PDF)', description: 'Tài liệu độc quyền phân tích chi tiết bẫy phân loại 850+', category: 'EBOOK', gemsPrice: 800, imageUrl: '/assets/shop/ebook.png' },
  ];

  for (const item of shopItems) {
    await prisma.shopItem.create({ data: item });
  }

  console.log(`🛍️  Shop items seeded: ${shopItems.length} items (100% free with Gems)`);

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
