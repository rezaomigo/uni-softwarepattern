import React, { useState } from 'react';
import { ScenarioExecution } from '../types/architecture';
import { 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  UserCheck, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Terminal, 
  Sparkles, 
  Clock 
} from 'lucide-react';

interface ScenarioRunnerViewProps {
  scenario: ScenarioExecution;
  patternEnglishTitle: string;
}

export const ScenarioRunnerView: React.FC<ScenarioRunnerViewProps> = ({
  scenario,
  patternEnglishTitle,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const totalSteps = scenario.steps.length;
  const currentStep = scenario.steps[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  return (
    <div className="space-y-6">

      {/* Scenario Header Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                {patternEnglishTitle}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <h2 className="text-lg font-bold text-slate-900">
                اجرای سناریوی واقعی: {scenario.scenarioTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              شبیه‌سازی گام‌به‌گام گذر یک درخواست واقعی دانشجو در معماری سامانه
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              گام {currentStepIdx + 1} از {totalSteps}
            </span>
          </div>
        </div>

        {/* Student Query Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>پروفایل دانشجو (Persona):</span>
            </div>
            <p className="text-xs text-slate-600">
              {scenario.studentPersona}
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              <strong>سیاق عملیاتی:</strong> {scenario.queryContext}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-1">
            <div className="text-xs font-bold text-slate-700">
              متن پرسش ورودی دانشجو:
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium">
              « {scenario.queryExample} »
            </div>
            <div className="text-[11px] text-emerald-700 pt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span><strong>خروجی مورد انتظار سیستم:</strong> {scenario.expectedOutcome}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Step Navigator and Interactive Controls */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        
        {/* Step Progress Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {scenario.steps.map((st, idx) => {
            const isActive = idx === currentStepIdx;
            const isPassed = idx < currentStepIdx;

            return (
              <button
                key={st.stepNumber}
                onClick={() => setCurrentStepIdx(idx)}
                className={`p-2.5 rounded-lg border text-right transition-all ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                    : isPassed
                    ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900 hover:bg-emerald-50'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span>گام {st.stepNumber}</span>
                  {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isActive && <Clock className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />}
                </div>
                <div className="text-xs truncate">
                  {st.phaseName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
              <span>گام قبلی</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIdx === totalSteps - 1}
              className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium"
            >
              <span>گام بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded"
            title="آغاز مجدد سناریو از ابتدا"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>شروع مجدد</span>
          </button>
        </div>

      </div>

      {/* Current Step Detailed Breakdown Card */}
      {currentStep && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600">
                مرحله شماره {currentStep.stepNumber}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {currentStep.phaseName}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium">
                مؤلفه درگیر: <strong className="text-slate-900">{currentStep.componentInvolved}</strong>
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <strong>شرح اقدام در این گام:</strong> {currentStep.actionSummary}
          </div>

          {/* Tri-Layer Epistemic Distinction (Crucial PhD requirement: تمایز رفتار واقعی، شبیه‌سازی و پیشنهاد هوش مصنوعی) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>تفکیک معرفتی سه لایه اجرایی در این گام (Tri-Layer Analysis):</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* ۱. رفتار واقعی پیاده‌سازی شده */}
              <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Terminal className="w-4 h-4" />
                  <span>۱. رفتار واقعی سیستم (Real Code)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {currentStep.realRuntimeBehavior}
                </p>
              </div>

              {/* ۲. شبیه‌سازی */}
              <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800">
                  <Cpu className="w-4 h-4" />
                  <span>۲. شبیه‌سازی (Simulated Trace)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {currentStep.simulatedBehavior}
                </p>
              </div>

              {/* ۳. پیشنهاد تولیدشده توسط هوش مصنوعی */}
              <div className="p-3.5 rounded-lg border border-purple-200 bg-purple-50/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800">
                  <Sparkles className="w-4 h-4" />
                  <span>۳. استنتاج AI (AI Reasoning)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {currentStep.aiSuggestedReasoning}
                </p>
              </div>

            </div>
          </div>

          {/* Input & Output Payloads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                داده ورودی مؤلفه (Input Payload):
              </span>
              <pre className="text-[11px] font-mono bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto dir-ltr">
                {currentStep.inputPayload}
              </pre>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                داده خروجی مؤلفه (Output Payload):
              </span>
              <pre className="text-[11px] font-mono bg-slate-900 text-emerald-300 p-3 rounded-lg overflow-x-auto dir-ltr">
                {currentStep.outputPayload}
              </pre>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
