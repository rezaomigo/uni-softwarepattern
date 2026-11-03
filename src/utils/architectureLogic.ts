import { PATTERNS_DATA } from '../data/patternsData';
import { PatternId, RiskAndMitigation, ScenarioStep } from '../types/architecture';

/**
 * Validates that all required doctoral phases and sections are intact for a pattern.
 */
export function validatePatternCompleteness(patternId: PatternId): {
  isValid: boolean;
  missingSections: string[];
  totalRisks: number;
  totalPhase4Dimensions: number;
} {
  const pattern = PATTERNS_DATA[patternId];
  if (!pattern) {
    return { isValid: false, missingSections: ['PATTERN_NOT_FOUND'], totalRisks: 0, totalPhase4Dimensions: 0 };
  }

  const missing: string[] = [];
  if (!pattern.intro || !pattern.intro.problem || !pattern.intro.structure) missing.push('intro');
  if (!pattern.architecture || !pattern.architecture.components || pattern.architecture.components.length === 0) missing.push('architecture');
  if (!pattern.scenario || !pattern.scenario.steps || pattern.scenario.steps.length === 0) missing.push('scenario');
  if (!pattern.designDecisionAnalysis || !pattern.designDecisionAnalysis.solutionA || !pattern.designDecisionAnalysis.solutionB) missing.push('designDecisionAnalysis');
  if (!pattern.evaluation || !pattern.evaluation.risksAndMitigations || pattern.evaluation.risksAndMitigations.length < 3) missing.push('evaluation_min_3_risks');

  const phase4 = pattern.phase4;
  let phase4Count = 0;
  if (phase4) {
    if (phase4.rationale) phase4Count++;
    if (phase4.interaction) phase4Count++;
    if (phase4.failureMode) phase4Count++;
    if (phase4.qualityAttributes && phase4.qualityAttributes.length >= 2) phase4Count++;
    if (phase4.behaviorDistinction && phase4.behaviorDistinction.length > 0) phase4Count++;
    if (phase4.academicReferences && phase4.academicReferences.length > 0) phase4Count++;
  }

  const totalRisks = pattern.evaluation?.risksAndMitigations?.length || 0;

  return {
    isValid: missing.length === 0 && phase4Count === 6 && totalRisks >= 3,
    missingSections: missing,
    totalRisks,
    totalPhase4Dimensions: phase4Count
  };
}

/**
 * Calculates severity distribution of risks identified in architecture evaluation.
 */
export function calculateRiskMetrics(risks: RiskAndMitigation[]): {
  total: number;
  critical: number;
  high: number;
  medium: number;
  mitigationRatio: number;
} {
  const total = risks.length;
  let critical = 0;
  let high = 0;
  let medium = 0;
  let hasMitigationCount = 0;

  for (const r of risks) {
    if (r.severity === 'بحرانی') critical++;
    else if (r.severity === 'بالا') high++;
    else medium++;

    if (r.remedialStrategy && r.remedialStrategy.trim().length > 0) {
      hasMitigationCount++;
    }
  }

  return {
    total,
    critical,
    high,
    medium,
    mitigationRatio: total > 0 ? (hasMitigationCount / total) * 100 : 0
  };
}

/**
 * Verifies that a scenario step explicitly separates real, simulated, and AI-suggested behaviors.
 */
export function verifyEpistemicTriLayer(step: ScenarioStep): boolean {
  return (
    typeof step.realRuntimeBehavior === 'string' &&
    step.realRuntimeBehavior.trim().length > 0 &&
    typeof step.simulatedBehavior === 'string' &&
    step.simulatedBehavior.trim().length > 0 &&
    typeof step.aiSuggestedReasoning === 'string' &&
    step.aiSuggestedReasoning.trim().length > 0
  );
}
