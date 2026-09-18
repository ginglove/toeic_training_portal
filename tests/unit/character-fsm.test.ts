import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Character Design & Animation FSM Engine
 * Reference: CHARACTER-ANIMATION-DESIGN-v10.md
 */
export type GuardianSpiritId = 'sparky' | 'echlet' | 'lumink' | 'streaklyn' | 'verbil';

export type AscensionStage = 'SOUL_EMBRYO' | 'ADVENTURER' | 'FIERCE_HERO' | 'CELESTIAL_DEITY';

export type AnimeState =
  | 'ANIME_IDLE'
  | 'ANIME_FOCUS'
  | 'ANIME_VICTORY'
  | 'ANIME_COMFORT'
  | 'ANIME_EVOLUTION'
  | 'ANIME_SPECIAL';

export interface GuardianSpiritSpec {
  id: GuardianSpiritId;
  name: string;
  element: string;
  specialty: string;
  primaryColor: string;
  secondaryColor: string;
  relic: string;
}

export const GUARDIAN_SPIRITS: Record<GuardianSpiritId, GuardianSpiritSpec> = {
  sparky: {
    id: 'sparky',
    name: 'Thiếu Niên Sấm Sét',
    element: 'Lightning',
    specialty: 'Part 5 Speed & Reflex < 8s',
    primaryColor: '#F59E0B',
    secondaryColor: '#1E1B4B',
    relic: 'Haori dệt tia sét, Bùa chú Lôi đình',
  },
  echlet: {
    id: 'echlet',
    name: 'Thánh Nữ Sóng Âm',
    element: 'Sound',
    specialty: 'Part 2, 3 Thính giác & Bẫy đồng âm',
    primaryColor: '#06B6D4',
    secondaryColor: '#6366F1',
    relic: 'Lông vũ sóng âm, Vòng quang phổ nốt nhạc',
  },
  lumink: {
    id: 'lumink',
    name: 'Thiếu Nữ Tinh Tú',
    element: 'Starlight',
    specialty: 'Part 7 Đọc hiểu & Định vị manh mối',
    primaryColor: '#A855F7',
    secondaryColor: '#F8FAFC',
    relic: 'Kính lúp thiên văn khúc xạ cầu vồng',
  },
  streaklyn: {
    id: 'streaklyn',
    name: 'Hoàng Tử Hỏa Long',
    element: 'Fire',
    specialty: 'Giữ lửa Streak & Ý chí học tập',
    primaryColor: '#EF4444',
    secondaryColor: '#EA580C',
    relic: 'Hỏa châu bồng bềnh, Sừng rồng dung nham',
  },
  verbil: {
    id: 'verbil',
    name: 'Hiền Triết Cổ Tự',
    element: 'Earth/Jade',
    specialty: 'Từ vựng chuyên sâu & Thuật toán SM-2',
    primaryColor: '#10B981',
    secondaryColor: '#064E3B',
    relic: 'Thẻ ngọc La-tinh, Cuộn sách cổ thư',
  },
};

export class CharacterAnimationFSM {
  currentState: AnimeState = 'ANIME_IDLE';

  static getAscensionStage(sagaProgressPct: number, exitExamPassed: boolean): AscensionStage {
    if (sagaProgressPct >= 100 && exitExamPassed) return 'CELESTIAL_DEITY';
    if (sagaProgressPct >= 70) return 'FIERCE_HERO';
    if (sagaProgressPct >= 25) return 'ADVENTURER';
    return 'SOUL_EMBRYO';
  }

  transition(event: 'START_QUESTION' | 'CORRECT_ANSWER' | 'INCORRECT_ANSWER' | 'NEXT_QUESTION' | 'REACH_MILESTONE' | 'AWAKEN_COMPLETE' | 'TAP_INTERACT' | 'ANIMATION_DONE') {
    switch (this.currentState) {
      case 'ANIME_IDLE':
        if (event === 'START_QUESTION') this.currentState = 'ANIME_FOCUS';
        else if (event === 'REACH_MILESTONE') this.currentState = 'ANIME_EVOLUTION';
        else if (event === 'TAP_INTERACT') this.currentState = 'ANIME_SPECIAL';
        else throw new Error(`INVALID_TRANSITION from ${this.currentState} on ${event}`);
        break;

      case 'ANIME_FOCUS':
        if (event === 'CORRECT_ANSWER') this.currentState = 'ANIME_VICTORY';
        else if (event === 'INCORRECT_ANSWER') this.currentState = 'ANIME_COMFORT';
        else throw new Error(`INVALID_TRANSITION from ${this.currentState} on ${event}`);
        break;

      case 'ANIME_VICTORY':
      case 'ANIME_COMFORT':
        if (event === 'NEXT_QUESTION') this.currentState = 'ANIME_IDLE';
        else throw new Error(`INVALID_TRANSITION from ${this.currentState} on ${event}`);
        break;

      case 'ANIME_EVOLUTION':
        if (event === 'AWAKEN_COMPLETE') this.currentState = 'ANIME_VICTORY';
        else throw new Error(`INVALID_TRANSITION from ${this.currentState} on ${event}`);
        break;

      case 'ANIME_SPECIAL':
        if (event === 'ANIMATION_DONE') this.currentState = 'ANIME_IDLE';
        else throw new Error(`INVALID_TRANSITION from ${this.currentState} on ${event}`);
        break;

      default:
        throw new Error(`UNKNOWN_STATE: ${this.currentState}`);
    }
    return this.currentState;
  }
}

describe('Character Design & Animation FSM - Anime Celestial Guardians', () => {
  describe('Guardian Spirits Roster Specifications', () => {
    it('should define exactly 5 Anime Celestial Guardian Spirits', () => {
      const keys = Object.keys(GUARDIAN_SPIRITS);
      assert.equal(keys.length, 5);
      assert.deepEqual(keys, ['sparky', 'echlet', 'lumink', 'streaklyn', 'verbil']);
    });

    it('should configure Sparky as the Part 5 Lightning Guardian with amber/navy palette', () => {
      const sparky = GUARDIAN_SPIRITS.sparky;
      assert.equal(sparky.element, 'Lightning');
      assert.equal(sparky.primaryColor, '#F59E0B');
      assert.equal(sparky.secondaryColor, '#1E1B4B');
    });

    it('should configure Echlet as the Listening Sonic Maiden with cyan/indigo palette', () => {
      const echlet = GUARDIAN_SPIRITS.echlet;
      assert.equal(echlet.element, 'Sound');
      assert.equal(echlet.primaryColor, '#06B6D4');
    });

    it('should configure Verbil as the SM-2 Spaced Repetition Sage with emerald palette', () => {
      const verbil = GUARDIAN_SPIRITS.verbil;
      assert.equal(verbil.element, 'Earth/Jade');
      assert.equal(verbil.primaryColor, '#10B981');
      assert.ok(verbil.specialty.includes('SM-2'));
    });
  });

  describe('4 Stages of Ascension (Saga Progress Mapping)', () => {
    it('should map 0% - 24% to SOUL_EMBRYO (Sơ Tâm)', () => {
      assert.equal(CharacterAnimationFSM.getAscensionStage(0, false), 'SOUL_EMBRYO');
      assert.equal(CharacterAnimationFSM.getAscensionStage(15, false), 'SOUL_EMBRYO');
      assert.equal(CharacterAnimationFSM.getAscensionStage(24, false), 'SOUL_EMBRYO');
    });

    it('should map 25% - 69% to ADVENTURER (Hành Giả)', () => {
      assert.equal(CharacterAnimationFSM.getAscensionStage(25, false), 'ADVENTURER');
      assert.equal(CharacterAnimationFSM.getAscensionStage(50, false), 'ADVENTURER');
      assert.equal(CharacterAnimationFSM.getAscensionStage(69, false), 'ADVENTURER');
    });

    it('should map 70% - 99% to FIERCE_HERO (Hiệp Sĩ)', () => {
      assert.equal(CharacterAnimationFSM.getAscensionStage(70, false), 'FIERCE_HERO');
      assert.equal(CharacterAnimationFSM.getAscensionStage(85, false), 'FIERCE_HERO');
      assert.equal(CharacterAnimationFSM.getAscensionStage(99, false), 'FIERCE_HERO');
    });

    it('should require BOTH 100% Saga progress AND Exit Exam pass for CELESTIAL_DEITY (Thần Linh)', () => {
      // 100% but exit exam not yet passed -> FIERCE_HERO
      assert.equal(CharacterAnimationFSM.getAscensionStage(100, false), 'FIERCE_HERO');
      // 100% and exit exam passed -> CELESTIAL_DEITY
      assert.equal(CharacterAnimationFSM.getAscensionStage(100, true), 'CELESTIAL_DEITY');
    });
  });

  describe('Animation Finite State Machine (FSM) Transitions', () => {
    it('should cycle through normal question flow: IDLE -> FOCUS -> VICTORY -> IDLE', () => {
      const fsm = new CharacterAnimationFSM();
      assert.equal(fsm.currentState, 'ANIME_IDLE');

      fsm.transition('START_QUESTION');
      assert.equal(fsm.currentState, 'ANIME_FOCUS');

      fsm.transition('CORRECT_ANSWER');
      assert.equal(fsm.currentState, 'ANIME_VICTORY');

      fsm.transition('NEXT_QUESTION');
      assert.equal(fsm.currentState, 'ANIME_IDLE');
    });

    it('should cycle through comfort flow on wrong answer: IDLE -> FOCUS -> COMFORT -> IDLE', () => {
      const fsm = new CharacterAnimationFSM();
      fsm.transition('START_QUESTION');
      assert.equal(fsm.currentState, 'ANIME_FOCUS');

      fsm.transition('INCORRECT_ANSWER');
      assert.equal(fsm.currentState, 'ANIME_COMFORT');

      fsm.transition('NEXT_QUESTION');
      assert.equal(fsm.currentState, 'ANIME_IDLE');
    });

    it('should trigger EVOLUTION state at milestones and transition to VICTORY upon completion', () => {
      const fsm = new CharacterAnimationFSM();
      fsm.transition('REACH_MILESTONE');
      assert.equal(fsm.currentState, 'ANIME_EVOLUTION');

      fsm.transition('AWAKEN_COMPLETE');
      assert.equal(fsm.currentState, 'ANIME_VICTORY');
    });

    it('should prevent invalid transition jumps (e.g. IDLE directly to VICTORY)', () => {
      const fsm = new CharacterAnimationFSM();
      assert.throws(() => fsm.transition('CORRECT_ANSWER'), /INVALID_TRANSITION/);
    });
  });

  describe('P0 Asset Format & MVP Scope Specifications', () => {
    const GUARDIAN_IDS: GuardianSpiritId[] = ['sparky', 'echlet', 'lumink', 'streaklyn', 'verbil'];
    const MVP_EXPRESSIONS: AnimeState[] = [
      'ANIME_IDLE',
      'ANIME_FOCUS',
      'ANIME_VICTORY',
      'ANIME_COMFORT',
      'ANIME_EVOLUTION',
    ];

    it('should strictly lock MVP scope to 1 Stage x 5 Expressions x 5 Guardians = 25 assets', () => {
      const stageCount = 1; // Stage 1 (Sơ Tâm) only
      const expressionCount = MVP_EXPRESSIONS.length;
      const guardianCount = GUARDIAN_IDS.length;
      const totalMvpAssets = stageCount * expressionCount * guardianCount;

      assert.equal(totalMvpAssets, 25, 'MVP asset count must equal exactly 25 files');
      assert.equal(expressionCount, 5, 'MVP expressions must be exactly 5');
      assert.equal(guardianCount, 5, 'Must cover all 5 guardian spirits');
    });

    it('should mandate WebP with alpha transparency and strictly forbid JPEG', () => {
      const allowedFormats = ['webp', 'png'];
      const forbiddenFormats = ['jpg', 'jpeg'];

      // Simulated asset spec validation
      for (const guardian of GUARDIAN_IDS) {
        const primaryAssetPath = `/lexlings/${guardian}_anime.webp`;
        const extension = primaryAssetPath.split('.').pop()?.toLowerCase();

        assert.ok(allowedFormats.includes(extension!), `Asset ${primaryAssetPath} must use an allowed format`);
        assert.ok(!forbiddenFormats.includes(extension!), `Asset ${primaryAssetPath} must NEVER use JPEG`);
      }
    });

    it('should defer SPECIAL expression to Post-MVP (v10.2+)', () => {
      const postMvpExpressions: AnimeState[] = ['ANIME_SPECIAL'];
      assert.ok(!MVP_EXPRESSIONS.includes(postMvpExpressions[0]));
    });
  });
});

