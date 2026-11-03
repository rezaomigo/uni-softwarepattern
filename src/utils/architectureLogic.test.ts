import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePatternCompleteness, calculateRiskMetrics, verifyEpistemicTriLayer } from './architectureLogic';
import { PATTERNS_DATA } from '../data/patternsData';

test('all three core patterns (Model Gateway, RAG, Planning) exist and pass completeness audit', () => {
  const patternKeys = ['model-gateway', 'rag', 'planning'] as const;
  
  for (const key of patternKeys) {
    const result = validatePatternCompleteness(key);
    assert.equal(result.isValid, true, `Pattern ${key} should satisfy all architectural requirements without missing sections`);
    assert.equal(result.totalPhase4Dimensions, 6, `Pattern ${key} must have all 6 Phase 4 analytical questions answered`);
    assert.ok(result.totalRisks >= 3, `Pattern ${key} must have at least 3 evaluated risks/mitigations`);
  }
});

test('calculateRiskMetrics correctly computes critical and high severities', () => {
  const mockRisks = [
    {
      id: 'r1',
      riskTitle: 'Test 1',
      severity: 'بحرانی' as const,
      architecturalVulnerability: 'Vuln 1',
      concreteConsequence: 'Cons 1',
      remedialStrategy: 'Mit 1',
      architecturalRevision: 'Rev 1',
      isoImpact: 'ISO 1'
    },
    {
      id: 'r2',
      riskTitle: 'Test 2',
      severity: 'بالا' as const,
      architecturalVulnerability: 'Vuln 2',
      concreteConsequence: 'Cons 2',
      remedialStrategy: 'Mit 2',
      architecturalRevision: 'Rev 2',
      isoImpact: 'ISO 2'
    },
    {
      id: 'r3',
      riskTitle: 'Test 3',
      severity: 'متوسط' as const,
      architecturalVulnerability: 'Vuln 3',
      concreteConsequence: 'Cons 3',
      remedialStrategy: 'Mit 3',
      architecturalRevision: 'Rev 3',
      isoImpact: 'ISO 3'
    }
  ];

  const metrics = calculateRiskMetrics(mockRisks);
  assert.equal(metrics.total, 3);
  assert.equal(metrics.critical, 1);
  assert.equal(metrics.high, 1);
  assert.equal(metrics.medium, 1);
  assert.equal(metrics.mitigationRatio, 100);
});

test('verifyEpistemicTriLayer correctly enforces distinction between real, simulated and AI suggested reasoning', () => {
  const ragPattern = PATTERNS_DATA['rag'];
  assert.ok(ragPattern, 'RAG pattern must exist');
  
  for (const step of ragPattern.scenario.steps) {
    const valid = verifyEpistemicTriLayer(step);
    assert.equal(valid, true, `Step ${step.stepNumber} in RAG must have distinct real, simulated, and AI descriptions`);
  }
});
