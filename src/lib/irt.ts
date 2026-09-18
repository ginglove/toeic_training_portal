/**
 * Item Response Theory (IRT) 2-Parameter Logistic (2PL) Model
 * P(theta) = 1 / (1 + exp(-1.7 * a * (theta - b)))
 * a: Discrimination parameter (0.2 to 2.5)
 * b: Difficulty parameter (-3.0 to +3.0)
 * theta: Latent ability estimate (-3.0 to +3.0)
 */

export interface IRTQuestion {
  discrimination: number; // a
  difficulty: number;     // b
}

export function calculateProbability2PL(theta: number, a: number, b: number): number {
  const z = 1.702 * a * (theta - b);
  return 1 / (1 + Math.exp(-z));
}

/**
 * Estimate theta using Newton-Raphson Maximum Likelihood Estimation (MLE) or EAP
 */
export function estimateTheta(
  responses: Array<{ isCorrect: boolean; a: number; b: number }>,
  initialTheta = 0.0,
  maxIterations = 20,
  epsilon = 0.001
): number {
  if (responses.length === 0) return initialTheta;

  let theta = initialTheta;

  for (let iter = 0; iter < maxIterations; iter++) {
    let firstDerivative = 0;
    let secondDerivative = 0;

    for (const r of responses) {
      const p = calculateProbability2PL(theta, r.a, r.b);
      const q = 1 - p;
      const u = r.isCorrect ? 1 : 0;
      const da = 1.702 * r.a;

      firstDerivative += da * (u - p);
      secondDerivative -= da * da * p * q;
    }

    if (Math.abs(secondDerivative) < 1e-7) break;

    const delta = firstDerivative / Math.abs(secondDerivative);
    theta += delta;

    // Constrain theta within [-3.5, +3.5]
    theta = Math.max(-3.5, Math.min(3.5, theta));

    if (Math.abs(delta) < epsilon) break;
  }

  return Number(theta.toFixed(3));
}

/**
 * Convert theta [-3.0, +3.0] to TOEIC Scaled Score [10, 495]
 */
export function thetaToTOEICScore(theta: number): number {
  // Linear equating mapping: theta -3 -> 10, theta +3 -> 495, theta 0 -> ~250
  const normalized = (theta + 3.0) / 6.0; // 0 to 1
  const rawScore = 10 + normalized * (495 - 10);
  // Round to nearest multiple of 5
  return Math.min(495, Math.max(10, Math.round(rawScore / 5) * 5));
}
