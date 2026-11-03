import React from 'react';
import { ArchitectureEvaluation } from '../types/architecture';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Wrench, 
  TrendingUp, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';

interface ArchitectureEvaluationViewProps {
  evaluation: ArchitectureEvaluation;
  patternEnglishTitle: string;
}

export const ArchitectureEvaluationView: React.FC<ArchitectureEvaluationViewProps> = ({
  evaluation,
  patternEnglishTitle,
}) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'بحرانی':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'بالا':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">

      {/* Header and Evaluation Context */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
            {patternEnglishTitle}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <h2 className="text-lg font-bold text-slate-900">
            ارزیابی معماری و تحلیل ریسک‌های استقرار در دانشگاه
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed text-justify">
          {evaluation.overview}
        </p>
      </div>

      {/* ۳ ریسک یا ضعف احتمالی و راهکارهای اصلاحی */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-700">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              شناسایی دست‌کم ۳ ریسک بحرانی و راهکارهای اصلاحی معماری
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            مطابق الزامات ارزیابی دکتری
          </span>
        </div>

        {evaluation.risksAndMitigations.map((item, index) => (
          <div 
            key={item.id}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4"
          >
            {/* Risk Title & Severity */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {item.riskTitle}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getSeverityBadge(item.severity)}`}>
                  شدت ریسک: {item.severity}
                </span>
              </div>
            </div>

            {/* Risk Details: Vulnerability & Concrete Consequence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-3.5 rounded-lg bg-rose-50/40 border border-rose-100 space-y-1">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>آسیب‌پذیری معماری (Architectural Vulnerability):</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {item.architecturalVulnerability}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-50/40 border border-amber-100 space-y-1">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span>پیامد عینی در محیط دانشگاه:</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {item.concreteConsequence}
                </p>
              </div>

            </div>

            {/* Remedial Strategy & Revised Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              
              <div className="p-3.5 rounded-lg bg-emerald-50/40 border border-emerald-100 space-y-1">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  <span>راهکار اصلاحی (Remedial Strategy):</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {item.remedialStrategy}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-indigo-50/40 border border-indigo-100 space-y-1">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>بازنگری و تدقیق در معماری (Architectural Revision):</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {item.architecturalRevision}
                </p>
              </div>

            </div>

            {/* ISO 25010 Impact */}
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center gap-2">
              <span className="font-bold text-slate-700">اثر بر استانداردهای مهندسی نرم‌افزار:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">
                {item.isoImpact}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Resilience Scorecard */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700 mb-3">
          <TrendingUp className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">
            جدول پایش تاب‌آوری (Resilience Scorecard) قبل و بعد از اعمال راهکار
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="p-3">شاخص تاب‌آوری و کارایی</th>
                <th className="p-3">وضعیت پیش از اعمال راهکار اصلاحی</th>
                <th className="p-3">وضعیت پس از بازنگری معماری</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {evaluation.resilienceScorecard.map((sc, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-900">
                    {sc.metric}
                  </td>
                  <td className="p-3 text-rose-700 bg-rose-50/30">
                    {sc.beforeMitigation}
                  </td>
                  <td className="p-3 text-emerald-700 font-bold bg-emerald-50/30">
                    {sc.afterMitigation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
