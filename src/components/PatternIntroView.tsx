import React from 'react';
import { PatternIntro } from '../types/architecture';
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Compass, 
  Layers, 
  GraduationCap 
} from 'lucide-react';

interface PatternIntroViewProps {
  intro: PatternIntro;
  patternEnglishTitle: string;
  patternPersianTitle: string;
}

export const PatternIntroView: React.FC<PatternIntroViewProps> = ({
  intro,
  patternEnglishTitle,
  patternPersianTitle,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md uppercase font-mono">
                {patternEnglishTitle}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <h2 className="text-lg font-bold text-slate-900">
                {patternPersianTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              تحلیل ماهیت و جایگاه الگو در سامانه پاسخگویی به مقررات و خدمات دانشگاهی
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            سطح تحلیل دکتری
          </span>
        </div>

        {/* نقش الگو در حل مسئله سامانه دانشگاهی */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80">
          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                نقش الگو در سامانه پاسخگویی دانشگاهی
              </h3>
              <p className="text-sm text-slate-700 mt-1.5 leading-relaxed text-justify">
                {intro.roleInSystem}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ۱. مسئله (Problem Statement) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2.5 text-rose-700 mb-3">
          <AlertCircle className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">
            ۱. مسئله بنیادین (Problem Statement)
          </h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed text-justify bg-rose-50/40 p-4 rounded-lg border border-rose-100">
          {intro.problem}
        </p>
      </div>

      {/* ۲. ساختار الگو (Structure & Sub-components) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2.5 text-indigo-700 mb-3">
          <Layers className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">
            ۲. ساختار و مؤلفه‌های تشکیل‌دهنده (Structure)
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          {intro.structure.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {intro.structure.subComponents.map((comp, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800">
                  {comp.name}
                </span>
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {comp.englishName}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {comp.responsibility}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ۳ و ۴. مزایا و محدودیت‌ها (Advantages & Limitations) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* مزایا */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center gap-2.5 text-emerald-700 mb-4 pb-2 border-b border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              ۳. مزایای کلیدی الگو در سیستم دانشگاهی
            </h3>
          </div>
          <ul className="space-y-3 flex-1">
            {intro.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* محدودیت‌ها */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center gap-2.5 text-amber-700 mb-4 pb-2 border-b border-amber-100">
            <XCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              ۴. محدودیت‌ها و هزینه‌های تحمیلی الگو
            </h3>
          </div>
          <ul className="space-y-3 flex-1">
            {intro.limitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  !
                </span>
                <span className="leading-relaxed">{lim}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ۵. موارد کاربرد در امور دانشگاهی (Use Cases) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <span>۵. مصادیق و موارد کاربرد در آیین‌نامه‌ها و خدمات دانشگاه</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {intro.useCasesInUniversity.map((uc, idx) => (
            <div key={idx} className="p-3.5 rounded-lg border border-indigo-100 bg-indigo-50/30 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <span className="font-bold text-indigo-700 block mb-1">
                سناریوی کاربردی #{idx + 1}:
              </span>
              {uc}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
