import React from 'react';
import { AI_DISCLOSURE_STATEMENT } from '../data/aiDisclosureData';
import { 
  X, 
  BrainCircuit, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  FileCode 
} from 'lucide-react';

interface AiDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiDisclosureModal: React.FC<AiDisclosureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {AI_DISCLOSURE_STATEMENT.headerTitle}
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  فاز هفتم تمرین
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {AI_DISCLOSURE_STATEMENT.academicLevel}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
            title="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Academic Role Badge Banner */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-950 block">
                  سمت در پروژه: {AI_DISCLOSURE_STATEMENT.studentRole}
                </span>
                <span className="text-xs text-slate-600">
                  {AI_DISCLOSURE_STATEMENT.purpose}
                </span>
              </div>
            </div>
            <Award className="w-6 h-6 text-amber-600 shrink-0 hidden sm:block" />
          </div>

          {/* Section 1: نقش هوش مصنوعی در تولید وبسایت */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <FileCode className="w-4 h-4 text-indigo-600" />
              <span>{AI_DISCLOSURE_STATEMENT.sections[0].title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {AI_DISCLOSURE_STATEMENT.sections[0].content}
            </p>
          </div>

          {/* Section 2: اصلاحات و مشارکت اصیل علمی دانشجو دکتری */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm border-b border-slate-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{AI_DISCLOSURE_STATEMENT.sections[1].title}</span>
            </div>

            <ul className="space-y-2.5">
              {AI_DISCLOSURE_STATEMENT.sections[1].bulletPoints?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: تعهد و آمادگی دفاع علمی */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>{AI_DISCLOSURE_STATEMENT.sections[2].title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-justify">
              {AI_DISCLOSURE_STATEMENT.sections[2].content}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>ارائه در جلسه درس طراحی الگوهای نرم‌افزار پیشرفته</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium transition-colors"
          >
            متوجه شدم
          </button>
        </div>

      </div>

    </div>
  );
};
