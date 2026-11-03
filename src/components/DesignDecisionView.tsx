import React from 'react';
import { DesignDecisionAnalysis } from '../types/architecture';
import { 
  Scale, 
  CheckCircle, 
  XCircle, 
  Award, 
  Layers, 
  HelpCircle 
} from 'lucide-react';

interface DesignDecisionViewProps {
  decision: DesignDecisionAnalysis;
  patternEnglishTitle: string;
}

export const DesignDecisionView: React.FC<DesignDecisionViewProps> = ({
  decision,
  patternEnglishTitle,
}) => {
  return (
    <div className="space-y-6">

      {/* Header and Architectural Driver */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
            {patternEnglishTitle}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <h2 className="text-lg font-bold text-slate-900">
            تحلیل تصمیم طراحی و ارزیابی مصالحه‌ها (ATAM Trade-offs)
          </h2>
        </div>
        
        <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 flex items-start gap-3 mt-3">
          <HelpCircle className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold text-indigo-950">
              مسئله تصمیم‌گیری معماری (Architectural Driver & Context):
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed text-justify">
              {decision.contextAndDriver}
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison of Two Architectural Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Solution A */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                راهکار الف (گزینه رقیب)
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {decision.solutionA.name}
              </h3>
              <span className="text-xs text-slate-500 font-mono block mt-0.5">
                نوع معماری: {decision.solutionA.architectureType}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {decision.solutionA.description}
            </p>

            {/* Strengths */}
            <div>
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>نقاط قوت:</span>
              </span>
              <ul className="space-y-1.5">
                {decision.solutionA.strengths.map((s, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>نقاط ضعف و ریسک‌ها:</span>
              </span>
              <ul className="space-y-1.5">
                {decision.solutionA.weaknesses.map((w, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">-</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            <strong>عامل هزینه و تاخیر:</strong> {decision.solutionA.costLatencyFactor}
          </div>
        </div>

        {/* Solution B (Selected/Recommended) */}
        <div className="bg-white rounded-xl p-6 border-2 border-indigo-500 shadow-md flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 left-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg uppercase font-mono">
            گزینه منتخب معماری
          </div>

          <div className="space-y-4 pt-2">
            <div className="border-b border-indigo-100 pb-3">
              <span className="text-[11px] font-mono font-bold text-indigo-700 uppercase tracking-wider block">
                راهکار ب (معماری پیشنهادی این پروژه)
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {decision.solutionB.name}
              </h3>
              <span className="text-xs text-slate-500 font-mono block mt-0.5">
                نوع معماری: {decision.solutionB.architectureType}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {decision.solutionB.description}
            </p>

            {/* Strengths */}
            <div>
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>نقاط قوت برجسته:</span>
              </span>
              <ul className="space-y-1.5">
                {decision.solutionB.strengths.map((s, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-2">
                <XCircle className="w-4 h-4 text-amber-600" />
                <span>محدودیت‌های پذیرفته شده (Trade-offs):</span>
              </span>
              <ul className="space-y-1.5">
                {decision.solutionB.weaknesses.map((w, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">~</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-100 text-[11px] text-indigo-900 font-medium">
            <strong>عامل هزینه و تاخیر:</strong> {decision.solutionB.costLatencyFactor}
          </div>
        </div>

      </div>

      {/* Trade-Off Analysis Matrix (ATAM Style) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700 mb-4">
          <Scale className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">
            ماتریس ارزیابی مصالحه‌های مهندسی (Trade-Off Matrix)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="p-3">بعد کیفی / مشخصه مصالحه</th>
                <th className="p-3">ارزیابی راهکار الف</th>
                <th className="p-3">ارزیابی راهکار ب</th>
                <th className="p-3 text-center">گزینه برتر</th>
                <th className="p-3">توجیه مهندسی بر اساس بستر دانشگاه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {decision.tradeOffAnalysis.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="p-3 font-bold text-slate-900">
                    {row.dimension}
                  </td>
                  <td className="p-3 text-slate-600 leading-relaxed">
                    {row.solutionAAssessment}
                  </td>
                  <td className="p-3 text-slate-700 leading-relaxed">
                    {row.solutionBAssessment}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      row.winner === 'B' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : row.winner === 'A' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      راهکار {row.winner}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-[11px] leading-relaxed">
                    {row.justification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctoral Defense Rationale Box */}
      <div className="bg-indigo-900 text-white rounded-xl p-6 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-indigo-200">
          <Award className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            جمع‌بندی و توجیه دفاع در سطح دکتری (Doctoral Architectural Defense)
          </h3>
        </div>
        <div className="text-base font-bold text-white">
          تصمیم نهایی: {decision.finalArchitecturalChoice}
        </div>
        <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed text-justify">
          {decision.doctoralRationale}
        </p>
      </div>

    </div>
  );
};
