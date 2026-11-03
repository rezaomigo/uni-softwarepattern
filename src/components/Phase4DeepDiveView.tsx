import React from 'react';
import { Phase4Data, Phase4AnalysisId } from '../types/architecture';
import { 
  HelpCircle, 
  Link2, 
  AlertOctagon, 
  Award, 
  Cpu, 
  BookMarked, 
  ShieldCheck, 
  Terminal, 
  Sparkles, 
  FileText,
  ExternalLink
} from 'lucide-react';

interface Phase4DeepDiveViewProps {
  phase4: Phase4Data;
  activePhase4Id: Phase4AnalysisId;
  onSelectTab: (id: Phase4AnalysisId) => void;
  patternEnglishTitle: string;
}

export const Phase4DeepDiveView: React.FC<Phase4DeepDiveViewProps> = ({
  phase4,
  activePhase4Id,
  onSelectTab,
  patternEnglishTitle,
}) => {
  const tabs = [
    { id: 'rationale' as Phase4AnalysisId, label: '۱. دلیل انتخاب و نقش در مسئله', icon: HelpCircle },
    { id: 'interaction' as Phase4AnalysisId, label: '۲. تحلیل تعامل میان دو الگو', icon: Link2 },
    { id: 'failure-mode' as Phase4AnalysisId, label: '۳. سناریوی شکست و شرایط غیرعادی', icon: AlertOctagon },
    { id: 'quality-attributes' as Phase4AnalysisId, label: '۴. دو معیار کیفیت نرم‌افزار', icon: Award },
    { id: 'behavior-distinction' as Phase4AnalysisId, label: '۵. تمایز رفتار واقعی / شبیه‌سازی / AI', icon: Cpu },
    { id: 'academic-references' as Phase4AnalysisId, label: '۶. منابع علمی معتبر', icon: BookMarked },
  ];

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                {patternEnglishTitle}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <h2 className="text-lg font-bold text-slate-900">
                بررسی‌های تخصصی فاز چهارم (تحلیل‌های شش‌گانه دکتری)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              پاسخ تفصیلی به سوالات تحلیلی جهت دفاع در جلسه ارزیابی درس طراحی الگوهای نرم‌افزار
            </p>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
            فاز ۴ تمرین
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activePhase4Id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`p-2.5 rounded-lg border text-right transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-amber-500 bg-amber-50/50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${isActive ? 'text-amber-600' : 'text-slate-500'}`} />
                <span className="text-xs line-clamp-2 leading-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: دلیل انتخاب و نقش آن در حل مسئله */}
      {activePhase4Id === 'rationale' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 border-b border-slate-100 pb-3">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              ۱. دلیل انتخاب و نقش الگو در حل مسئله سامانه دانشگاهی
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                مسئله مشخص حل‌شده توسط این الگو:
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                {phase4.rationale.problemTackled}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-indigo-50/40 border border-indigo-100 space-y-2">
              <span className="text-xs font-bold text-indigo-900 block">
                ضرورت معماری و توجیه استفاده:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {phase4.rationale.architecturalNecessity}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50/40 border border-emerald-100 space-y-2">
              <span className="text-xs font-bold text-emerald-900 block">
                مکانیسم حل بنیادین:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {phase4.rationale.coreMechanism}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: تعامل یا ارتباط میان دو الگو */}
      {activePhase4Id === 'interaction' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-indigo-700">
              <Link2 className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">
                ۲. تحلیل تعامل یا ارتباط با الگوی: {phase4.interaction.partnerPattern}
              </h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-100 text-indigo-800">
              عنوان تعامل: {phase4.interaction.interactionName}
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-1">
              قرارداد اینترفیس تعاملی (Interface Contract):
            </span>
            <code className="text-xs font-mono text-indigo-700 dir-ltr block bg-white p-2 rounded border border-slate-200">
              {phase4.interaction.interfaceContract}
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-1.5">
              <span className="text-xs font-bold text-emerald-900 block">
                منافع هم‌افزایی (Synergy Benefit):
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {phase4.interaction.synergyBenefit}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-100 space-y-1.5">
              <span className="text-xs font-bold text-rose-900 block">
                ریسک وابستگی (Dependency Risk):
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {phase4.interaction.dependencyRisk}
              </p>
            </div>

          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-800 block mb-1">
              شرح گام‌به‌گام توالی تعامل (Sequence Flow):
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {phase4.interaction.sequenceDescription}
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: سناریوی شکست یا شرایط غیرعادی */}
      {activePhase4Id === 'failure-mode' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-700 border-b border-slate-100 pb-3">
            <AlertOctagon className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              ۳. تحلیل سناریوی شکست، شرایط غیرعادی و مکانیزم خودترمیمی
            </h3>
          </div>

          <div className="p-4 rounded-lg bg-rose-50/40 border border-rose-100">
            <span className="text-xs font-bold text-rose-900 block mb-1">
              عنوان ناهنجاری یا شرایط بحرانی:
            </span>
            <div className="text-sm font-bold text-slate-900">
              {phase4.failureMode.anomalyTitle}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-800 block">
                رویداد محرک (Trigger Event):
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {phase4.failureMode.triggerEvent}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-800 block">
                سازوکار تشخیص ناهنجاری (Detection Mechanism):
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {phase4.failureMode.detectionMechanism}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50/40 border border-amber-200 space-y-1">
              <span className="text-xs font-bold text-amber-900 block">
                اقدام مدارشکن و تنزل ملایم (Fallback / Circuit Breaker):
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {phase4.failureMode.fallbackOrCircuitBreakerAction}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-50/40 border border-emerald-200 space-y-1">
              <span className="text-xs font-bold text-emerald-900 block">
                تضمین ایمنی و عدم خروج داده (Safety Guarantee):
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {phase4.failureMode.safetyGuarantee}
              </p>
            </div>

          </div>

          <div className="p-3.5 rounded-lg bg-indigo-50/30 border border-indigo-100 text-xs text-slate-700">
            <strong>مراحل بازیابی خودکار (Recovery Step):</strong> {phase4.failureMode.recoveryStep}
          </div>
        </div>
      )}

      {/* Tab 4: دست‌کم دو معیار کیفیت نرم‌افزار */}
      {activePhase4Id === 'quality-attributes' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-indigo-700">
              <Award className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">
                ۴. ارزیابی تصمیم‌ها بر اساس معیارهای استاندارد ISO/IEC 25010
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              حداقل ۲ معیار کیفیت مهندسی
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {phase4.qualityAttributes.map((attr, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {attr.attributeName}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    {attr.standardReference}
                  </span>
                </div>

                <div className="text-xs text-slate-600 text-justify">
                  <strong>تعریف استاندارد:</strong> {attr.definition}
                </div>

                <div className="p-2.5 rounded bg-white border border-slate-200 text-xs space-y-1">
                  <div className="text-indigo-900 font-bold">
                    تاکتیک معماری متناظر (Architectural Tactic):
                  </div>
                  <p className="text-slate-700">{attr.architecturalTactic}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 text-emerald-900">
                  <span>سنجه و آستانه مجاز (Threshold):</span>
                  <strong>{attr.metricAndThreshold}</strong>
                </div>

                <div className="text-[11px] text-slate-500 text-justify">
                  <strong>توجیه ضرورت برای سامانه دانشگاه:</strong> {attr.rationaleForAcademicQA}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: تمایز میان رفتار واقعی، شبیه‌سازی و پیشنهاد هوش مصنوعی */}
      {activePhase4Id === 'behavior-distinction' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 border-b border-slate-100 pb-3">
            <Cpu className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              ۵. تمایز معرفت‌شناختی میان رفتار واقعی، شبیه‌سازی و پیشنهاد AI
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
            یکی از معیارهای کلیدی ارزیابی در سطح دکتری، عدم اختلاط میان ادعاهای تولیدشده توسط هوش مصنوعی با منطق اجرایی قطعی نرم‌افزار و داده‌های شبیه‌سازی‌شده است:
          </p>

          <div className="space-y-4">
            {phase4.behaviorDistinction.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 space-y-3"
              >
                <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                  بعد تحلیلی #{idx + 1}: {item.aspect}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* رفتار واقعی */}
                  <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-emerald-700" />
                      <span>رفتار واقعی پیاده‌سازی شده:</span>
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify">
                      {item.realBehavior}
                    </p>
                  </div>

                  {/* شبیه‌سازی */}
                  <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 space-y-1">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-blue-700" />
                      <span>شبیه‌سازی محیط دانشگاه:</span>
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify">
                      {item.simulatedBehavior}
                    </p>
                  </div>

                  {/* پیشنهاد هوش مصنوعی */}
                  <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-200 space-y-1">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                      <span>پیشنهاد تولیدشده توسط AI:</span>
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify">
                      {item.aiSuggestedReasoning}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: منابع علمی معتبر مورد استفاده */}
      {activePhase4Id === 'academic-references' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 border-b border-slate-100 pb-3">
            <BookMarked className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              ۶. منابع علمی و مراجع آکادمیک مورد استفاده (Doctoral Citations)
            </h3>
          </div>

          <div className="space-y-3">
            {phase4.academicReferences.map((ref, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-slate-900 dir-ltr text-left">
                    [{idx + 1}] {ref.citation}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    {ref.publicationType}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  <strong>ارتباط با الگوی انتخابی:</strong> {ref.relevanceToPattern}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
