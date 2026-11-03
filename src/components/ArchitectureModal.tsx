import React, { useState } from 'react';
import { SYSTEM_ARCHITECTURE, ArchNode } from '../data/architectureDiagramData';
import { 
  X, 
  Network, 
  Layers, 
  ArrowRight, 
  Server, 
  Database, 
  Cpu, 
  ShieldCheck, 
  GraduationCap, 
  GitMerge, 
  BookOpen, 
  Layout, 
  Activity, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-planning-agent');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const selectedNode = SYSTEM_ARCHITECTURE.nodes.find(n => n.id === selectedNodeId) || SYSTEM_ARCHITECTURE.nodes[0];

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return Layout;
      case 'ShieldCheck': return ShieldCheck;
      case 'GitMerge': return GitMerge;
      case 'BookOpen': return BookOpen;
      case 'Cpu': return Cpu;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'GraduationCap': return GraduationCap;
      default: return Layers;
    }
  };

  const filteredNodes = activeFilter === 'ALL'
    ? SYSTEM_ARCHITECTURE.nodes
    : SYSTEM_ARCHITECTURE.nodes.filter(n => n.patternAffiliation === activeFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {SYSTEM_ARCHITECTURE.systemName}
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  فاز پنجم تمرین
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {SYSTEM_ARCHITECTURE.englishName}
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
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Abstract Description */}
          <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
            <strong>چکیده معماری سامانه: </strong>
            {SYSTEM_ARCHITECTURE.abstract}
          </div>

          {/* Pattern Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">فیلتر بر اساس الگو:</span>
            {['ALL', 'Planning', 'RAG', 'Model Gateway', 'زیرساخت مشترک'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {filter === 'ALL' ? 'همه مؤلفه‌ها' : filter}
              </button>
            ))}
          </div>

          {/* Unified Architectural Diagram Canvas (Interactive Visual Grid) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>نمای لایه‌ای و ماتریس اجزای معماری یکپارچه:</span>
              </h3>
              <span className="text-xs text-slate-400">
                روی هر بلاک کلیک کنید تا جزئیات فنی و رابط‌های آن در پنل پایین باز شود
              </span>
            </div>

            {/* Architecture Blocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const Icon = getNodeIcon(node.iconName);

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-md ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                          {node.patternAffiliation}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {node.title}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5 line-clamp-1">
                        {node.englishTitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex items-center justify-between">
                      <span className="font-mono">SLA: {node.sla.split('|')[0]}</span>
                      {isSelected && <span className="text-indigo-600 font-bold">انتخاب شده</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Inspector Card */}
          {selectedNode && (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                    {selectedNode.patternAffiliation}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {selectedNode.title} ({selectedNode.englishTitle})
                  </h4>
                </div>
                <div className="text-xs font-mono bg-emerald-100 text-emerald-900 px-3 py-1 rounded-md font-medium">
                  توافق سطح خدمت (SLA): {selectedNode.sla}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {selectedNode.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1.5">
                    مسئولیت‌های کلیدی در سیستم دانشگاه:
                  </span>
                  <ul className="space-y-1">
                    {selectedNode.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1.5">
                    اینترفیس‌ها و پروتکل‌های ارتباطی (Interfaces):
                  </span>
                  <div className="space-y-1">
                    {selectedNode.interfaces.map((intf, i) => (
                      <div key={i} className="text-[11px] font-mono bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                        {intf}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* End-to-End Execution Sequence Table */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>توالی گام‌های جریان داده و کنترل در یک تراکنش کامل:</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                    <th className="p-2.5">ردیف</th>
                    <th className="p-2.5">مبدأ</th>
                    <th className="p-2.5">مقصد</th>
                    <th className="p-2.5">عنوان جریان داده یا کنترل</th>
                    <th className="p-2.5">پروتکل ارتباطی</th>
                    <th className="p-2.5">نوع جریان</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SYSTEM_ARCHITECTURE.edges.map((edge, idx) => (
                    <tr key={edge.id} className="hover:bg-slate-50/60">
                      <td className="p-2.5 font-mono font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="p-2.5 font-bold text-slate-800">
                        {SYSTEM_ARCHITECTURE.nodes.find(n => n.id === edge.from)?.title || edge.from}
                      </td>
                      <td className="p-2.5 font-bold text-indigo-700">
                        {SYSTEM_ARCHITECTURE.nodes.find(n => n.id === edge.to)?.title || edge.to}
                      </td>
                      <td className="p-2.5 text-slate-700">
                        {edge.label}
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-600">
                        {edge.protocol}
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          edge.flowType === 'control' 
                            ? 'bg-purple-100 text-purple-800' 
                            : edge.flowType === 'feedback'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {edge.flowType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            {SYSTEM_ARCHITECTURE.courseContext}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium transition-colors"
          >
            بستن نمودار
          </button>
        </div>

      </div>

    </div>
  );
};
