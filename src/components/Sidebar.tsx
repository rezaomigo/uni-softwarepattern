import React from 'react';
import { 
  ChevronDown, 
  ChevronLeft, 
  Info, 
  Layers, 
  PlayCircle, 
  Scale, 
  AlertTriangle,
  HelpCircle,
  Link2,
  AlertOctagon,
  Award,
  Cpu,
  BookMarked,
  Server,
  Database,
  GitFork
} from 'lucide-react';
import { PatternId, SubMenuId, Phase4AnalysisId } from '../types/architecture';

interface SidebarProps {
  activePatternId: PatternId;
  activeSubMenu: SubMenuId;
  isPhase4Active: boolean;
  activePhase4Id: Phase4AnalysisId;
  onSelectPattern: (patternId: PatternId) => void;
  onSelectSubMenu: (subMenuId: SubMenuId) => void;
  onSelectPhase4: (phase4Id: Phase4AnalysisId) => void;
}

interface PatternMenuItem {
  id: PatternId;
  englishTitle: string;
  persianSubtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePatternId,
  activeSubMenu,
  isPhase4Active,
  activePhase4Id,
  onSelectPattern,
  onSelectSubMenu,
  onSelectPhase4,
}) => {
  const patterns: PatternMenuItem[] = [
    {
      id: 'model-gateway',
      englishTitle: 'Model Gateway',
      persianSubtitle: 'درگاه مدیریت و تجرید مدل‌ها',
      icon: Server,
      tag: 'Facade & Proxy'
    },
    {
      id: 'rag',
      englishTitle: 'RAG',
      persianSubtitle: 'تولید افزوده با بازیابی دانش',
      icon: Database,
      tag: 'Hybrid Retrieval'
    },
    {
      id: 'planning',
      englishTitle: 'Planning',
      persianSubtitle: 'عامل برنامه‌ریزی و استدلال ReAct',
      icon: GitFork,
      tag: 'Neuro-Symbolic'
    }
  ];

  const subMenuItems = [
    { id: 'intro' as SubMenuId, label: '۱. معرفی الگو', hint: 'مسئله، ساختار، نقش، مزایا، محدودیت‌ها و کاربرد', icon: Info },
    { id: 'architecture' as SubMenuId, label: '۲. طراحی معماری', hint: 'اجزا، روابط، جریان داده و کنترل', icon: Layers },
    { id: 'scenario' as SubMenuId, label: '۳. اجرای سناریو', hint: 'شبیه‌سازی گام‌به‌گام درخواست واقعی دانشجو', icon: PlayCircle },
    { id: 'design-decision' as SubMenuId, label: '۴. تحلیل تصمیم طراحی', hint: 'مقایسه ۲ راهکار، نقاط قوت/ضعف و مصالحه‌ها', icon: Scale },
    { id: 'evaluation' as SubMenuId, label: '۵. ارزیابی معماری', hint: 'شناسایی ۳ ریسک/ضعف و راهکار اصلاحی', icon: AlertTriangle },
  ];

  const phase4Buttons = [
    { id: 'rationale' as Phase4AnalysisId, label: '۱. دلیل انتخاب و نقش در حل مسئله', icon: HelpCircle },
    { id: 'interaction' as Phase4AnalysisId, label: '۲. تحلیل تعامل میان دو الگو', icon: Link2 },
    { id: 'failure-mode' as Phase4AnalysisId, label: '۳. سناریوی شکست و شرایط غیرعادی', icon: AlertOctagon },
    { id: 'quality-attributes' as Phase4AnalysisId, label: '۴. دو معیار کیفیت نرم‌افزار (ISO 25010)', icon: Award },
    { id: 'behavior-distinction' as Phase4AnalysisId, label: '۵. تمایز رفتار واقعی / شبیه‌سازی / AI', icon: Cpu },
    { id: 'academic-references' as Phase4AnalysisId, label: '۶. منابع علمی معتبر مورد استفاده', icon: BookMarked },
  ];

  return (
    <aside className="w-full md:w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 select-none">
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            الگوهای منتخب معماری
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
            فاز اول و دوم
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          برای مشاهده زیرمجموعه‌ها، روی هر الگو کلیک کنید:
        </p>
      </div>

      {/* Pattern Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {patterns.map((item) => {
          const isSelected = activePatternId === item.id;
          const Icon = item.icon;

          return (
            <div 
              key={item.id}
              className={`rounded-xl border transition-all ${
                isSelected 
                  ? 'border-indigo-300 bg-indigo-50/20 shadow-xs' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Pattern Header Button */}
              <button
                onClick={() => onSelectPattern(item.id)}
                className={`w-full flex items-center justify-between p-3.5 text-right rounded-t-xl transition-colors ${
                  isSelected ? 'bg-indigo-50/70 text-indigo-950' : 'hover:bg-slate-50 text-slate-800'
                }`}
                aria-expanded={isSelected}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base tracking-wide text-slate-900">
                        {item.englishTitle}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block">
                      {item.persianSubtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {item.tag}
                  </span>
                  {isSelected ? (
                    <ChevronDown className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>
              </button>

              {/* Submenu List (Phase 2 & Phase 4) if Selected */}
              {isSelected && (
                <div className="p-2 border-t border-indigo-100 bg-white space-y-1">
                  
                  {/* Phase 2 Submenus */}
                  <div className="px-2 pt-1 pb-1 text-[11px] font-semibold text-slate-400">
                    بخش‌های تحلیلی فاز دوم (معماری الگو):
                  </div>

                  {subMenuItems.map((sub) => {
                    const isSubActive = !isPhase4Active && activeSubMenu === sub.id;
                    const SubIcon = sub.icon;

                    return (
                      <button
                        key={sub.id}
                        onClick={() => onSelectSubMenu(sub.id)}
                        className={`w-full flex items-start gap-2.5 px-3 py-2 text-right rounded-lg text-xs font-medium transition-colors ${
                          isSubActive
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <SubIcon className={`w-4 h-4 shrink-0 mt-0.5 ${isSubActive ? 'text-white' : 'text-slate-500'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{sub.label}</div>
                          <div className={`text-[10px] line-clamp-1 ${isSubActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                            {sub.hint}
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Phase 4 Divider */}
                  <div className="pt-3 pb-1 px-2 border-t border-slate-100 mt-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span>۶ بررسی تخصصی فاز چهارم:</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-mono">
                        سطح دکتری
                      </span>
                    </div>
                  </div>

                  {/* Phase 4 Distinct Buttons */}
                  <div className="space-y-1">
                    {phase4Buttons.map((btn) => {
                      const isBtnActive = isPhase4Active && activePhase4Id === btn.id;
                      const BtnIcon = btn.icon;

                      return (
                        <button
                          key={btn.id}
                          onClick={() => onSelectPhase4(btn.id)}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-right rounded-md text-[11px] transition-colors ${
                            isBtnActive
                              ? 'bg-amber-500 text-white font-medium shadow-xs'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <BtnIcon className={`w-3.5 h-3.5 shrink-0 ${isBtnActive ? 'text-white' : 'text-slate-400'}`} />
                          <span className="truncate">{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Academic Status */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/90 text-center">
        <span className="text-[11px] text-slate-500">
          تطبیق با الزامات درس طراحی الگوهای نرم‌افزار
        </span>
      </div>

    </aside>
  );
};
