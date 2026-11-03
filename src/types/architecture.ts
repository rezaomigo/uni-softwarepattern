export type PatternId = 'model-gateway' | 'rag' | 'planning';

export type SubMenuId = 
  | 'intro'              // معرفی الگو: مسئله، ساختار، نقش، مزایا، محدودیت‌ها، کاربرد
  | 'architecture'       // طراحی معماری: اجزا، روابط، جریان داده/کنترل
  | 'scenario'           // اجرای سناریو: گام‌به‌گام یک درخواست واقعی
  | 'design-decision'    // تحلیل تصمیم طراحی: حداقل ۲ راه حل، نقاط قوت/ضعف و مصالحه‌ها
  | 'evaluation';        // ارزیابی معماری: ۳ ریسک/ضعف و راهکار اصلاحی

export type Phase4AnalysisId =
  | 'rationale'          // ۱. دلیل انتخاب و نقش آن در حل مسئله
  | 'interaction'        // ۲. تعامل یا ارتباط میان دو الگو
  | 'failure-mode'       // ۳. سناریوی شکست یا شرایط غیرعادی
  | 'quality-attributes' // ۴. دست‌کم دو معیار کیفیت نرم‌افزار
  | 'behavior-distinction' // ۵. تمایز رفتار واقعی، شبیه‌سازی، و پیشنهاد هوش مصنوعی
  | 'academic-references'; // ۶. منابع علمی مورد استفاده

export interface PatternIntro {
  problem: string;
  structure: {
    title: string;
    description: string;
    subComponents: { name: string; englishName: string; responsibility: string }[];
  };
  roleInSystem: string;
  advantages: string[];
  limitations: string[];
  useCasesInUniversity: string[];
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  englishName: string;
  type: 'gateway' | 'storage' | 'agent' | 'llm' | 'pipeline' | 'client' | 'security';
  description: string;
  responsibilities: string[];
  interfaces: string[];
  slaOrProtocol: string;
}

export interface ArchitectureFlowStep {
  step: number;
  from: string;
  to: string;
  action: string;
  payloadType: string;
  description: string;
}

export interface ArchitectureDesign {
  overview: string;
  diagramAsciiOrSvgHint?: string;
  components: ArchitectureComponent[];
  relationships: {
    source: string;
    target: string;
    relationType: string;
    protocol: string;
    description: string;
  }[];
  dataAndControlFlow: ArchitectureFlowStep[];
}

export interface ScenarioStep {
  stepNumber: number;
  phaseName: string;
  componentInvolved: string;
  actionSummary: string;
  inputPayload: string;
  outputPayload: string;
  realRuntimeBehavior: string;   // رفتار واقعی پیاده‌سازی شده
  simulatedBehavior: string;      // شبیه‌سازی رفتار
  aiSuggestedReasoning: string;  // پیشنهاد تولیدشده توسط هوش مصنوعی
  status: 'pending' | 'active' | 'completed' | 'alert';
}

export interface ScenarioExecution {
  scenarioTitle: string;
  studentPersona: string;
  queryExample: string;
  queryContext: string;
  expectedOutcome: string;
  steps: ScenarioStep[];
}

export interface DesignDecisionAnalysis {
  contextAndDriver: string;
  solutionA: {
    name: string;
    architectureType: string;
    description: string;
    strengths: string[];
    weaknesses: string[];
    costLatencyFactor: string;
  };
  solutionB: {
    name: string;
    architectureType: string;
    description: string;
    strengths: string[];
    weaknesses: string[];
    costLatencyFactor: string;
  };
  tradeOffAnalysis: {
    dimension: string;
    solutionAAssessment: string;
    solutionBAssessment: string;
    winner: 'A' | 'B' | 'TIE';
    justification: string;
  }[];
  finalArchitecturalChoice: string;
  doctoralRationale: string;
}

export interface RiskAndMitigation {
  id: string;
  riskTitle: string;
  severity: 'بحرانی' | 'بالا' | 'متوسط';
  architecturalVulnerability: string;
  concreteConsequence: string;
  remedialStrategy: string;
  architecturalRevision: string;
  isoImpact: string;
}

export interface ArchitectureEvaluation {
  overview: string;
  risksAndMitigations: RiskAndMitigation[]; // حداقل ۳ ریسک و راهکار
  resilienceScorecard: {
    metric: string;
    beforeMitigation: string;
    afterMitigation: string;
  }[];
}

export interface QualityAttributeAnalysis {
  attributeName: string;
  standardReference: string; // e.g., ISO/IEC 25010
  definition: string;
  architecturalTactic: string;
  metricAndThreshold: string;
  rationaleForAcademicQA: string;
}

export interface InterPatternInteraction {
  partnerPattern: string;
  interactionName: string;
  interfaceContract: string;
  synergyBenefit: string;
  dependencyRisk: string;
  sequenceDescription: string;
}

export interface FailureScenarioAnalysis {
  anomalyTitle: string;
  triggerEvent: string;
  detectionMechanism: string;
  fallbackOrCircuitBreakerAction: string;
  safetyGuarantee: string;
  recoveryStep: string;
}

export interface EpistemicDistinction {
  aspect: string;
  realBehavior: string;       // رفتار واقعی سیستم (Deterministic Rules & Verified Endpoints)
  simulatedBehavior: string;  // شبیه‌سازی (Mocking latency, heavy embeddings, mock student records)
  aiSuggestedReasoning: string; // پیشنهادات احتمالی/تولیدی مدل LLM
}

export interface AcademicReference {
  citation: string;
  publicationType: 'ژورنال' | 'کنفرانس' | 'استاندارد' | 'کتاب مرجع';
  relevanceToPattern: string;
  linkOrDoi?: string;
}

export interface Phase4Data {
  rationale: {
    problemTackled: string;
    architecturalNecessity: string;
    coreMechanism: string;
  };
  interaction: InterPatternInteraction;
  failureMode: FailureScenarioAnalysis;
  qualityAttributes: QualityAttributeAnalysis[]; // حداقل ۲ معیار کیفیت
  behaviorDistinction: EpistemicDistinction[];
  academicReferences: AcademicReference[];
}

export interface PatternData {
  id: PatternId;
  englishTitle: string;
  persianTitle: string;
  shortTagline: string;
  intro: PatternIntro;
  architecture: ArchitectureDesign;
  scenario: ScenarioExecution;
  designDecisionAnalysis: DesignDecisionAnalysis;
  evaluation: ArchitectureEvaluation;
  phase4: Phase4Data;
}
