import React from 'react';
import { 
  Network, 
  FileText, 
  BrainCircuit, 
  GraduationCap, 
  BookOpen, 
  ChevronLeft 
} from 'lucide-react';
import { PatternId, SubMenuId } from '../types/architecture';
import { PATTERNS_DATA } from '../data/patternsData';

interface HeaderProps {
  activePatternId: PatternId;
  activeSubMenu: SubMenuId;
  onOpenArchitectureModal: () => void;
  onOpenReportModal: () => void;
  onOpenAiDisclosureModal: () => void;
  isPhase4Active: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activePatternId,
  activeSubMenu,
  onOpenArchitectureModal,
  onOpenReportModal,
  onOpenAiDisclosureModal,
  isPhase4Active,
}) => {
  const activePattern = PATTERNS_DATA[activePatternId];

  const getSubMenuLabel = (id: SubMenuId) => {
    switch (id) {
      case 'intro': return 'معرفی الگو';
      case 'architecture': return 'طراحی معماری';
      case 'scenario': return 'اجرای سناریو';
      case 'design-decision': return 'تحلیل تصمیم طراحی';
      case 'evaluation': return 'ارزیابی معماری';
      default: return '';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo and Academic Context */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  سامانه پاسخگویی هوشمند به پرسش‌های دانشگاهی
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  دکتری کامپیوتر • الگوهای نرم‌افزار
                </span>
              </div>
            </div>
          </div>

          {/* Key Phase 5, 6, 7 Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Phase 5: نمودار معماری سامانه */}
            <button
              onClick={onOpenArchitectureModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              title="مشاهده نمودار یکپارچه معماری سامانه دانشگاهی"
            >
              <Network className="w-4 h-4 text-indigo-600" />
              <span>نمودار معماری سامانه</span>
            </button>

            {/* Phase 6: گزارش تحلیلی */}
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              title="مشاهده گزارش تحلیلی ۳ تا ۵ صفحه‌ای تمرین"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>گزارش تحلیلی</span>
            </button>

            {/* Phase 7: توضیح کوتاه درباره نقش هوش مصنوعی */}
            <button
              onClick={onOpenAiDisclosureModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              title="شفاف‌سازی آکادمیک درباره نقش هوش مصنوعی و اصلاحات دانشجو"
            >
              <BrainCircuit className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">توضیح کوتاه درباره نقش هوش مصنوعی</span>
              <span className="lg:hidden">نقش AI</span>
            </button>

          </div>
        </div>
      </div>

      {/* Sub-header Breadcrumb and Active Pattern Status */}
      <div className="bg-slate-50/80 border-t border-slate-200/70 px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          <span className="text-slate-400">الگوی فعال:</span>
          <span className="font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
            {activePattern.englishTitle}
          </span>
          <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-800">
            {isPhase4Active ? 'تحلیل‌های ۶ گانه دکتری (فاز چهارم)' : getSubMenuLabel(activeSubMenu)}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-500">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>پایگاه دانش: آیین‌نامه‌های رسمی مصوب وزارت عتف و شورای آموزشی دانشگاه</span>
        </div>
      </div>
    </header>
  );
};
