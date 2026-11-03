import React, { useState } from 'react';
import { ArchitectureDesign, ArchitectureComponent } from '../types/architecture';
import { 
  Layers, 
  ArrowRightLeft, 
  GitCommit, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Server,
  Activity,
  Terminal
} from 'lucide-react';

interface ArchitectureDesignViewProps {
  architecture: ArchitectureDesign;
  patternEnglishTitle: string;
}

export const ArchitectureDesignView: React.FC<ArchitectureDesignViewProps> = ({
  architecture,
  patternEnglishTitle,
}) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(
    architecture.components[0]?.id || ''
  );

  const selectedComp = architecture.components.find(c => c.id === selectedCompId) || architecture.components[0];

  const getComponentIcon = (type: ArchitectureComponent['type']) => {
    switch (type) {
      case 'gateway': return Server;
      case 'storage': return Database;
      case 'agent': return Activity;
      case 'llm': return Cpu;
      case 'security': return ShieldCheck;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-6">

      {/* Header and Overview */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
            {patternEnglishTitle}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <h2 className="text-lg font-bold text-slate-900">
            طراحی معماری، اجزا و جریان داده/کنترل
          </h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed text-justify">
          {architecture.overview}
        </p>
      </div>

      {/* ۱. اجزای سامانه (System Components) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-700">
            <Layers className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">
              ۱. اجزای سامانه و مسئولیت‌ها (System Components)
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            روی هر جزء کلیک کنید تا اینترفیس‌ها و SLA آن نمایش داده شود
          </span>
        </div>

        {/* Component Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {architecture.components.map((comp) => {
            const Icon = getComponentIcon(comp.type);
            const isSelected = comp.id === selectedCompId;

            return (
              <button
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                className={`p-3 rounded-lg border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span className="text-[10px] uppercase font-mono px-1 rounded bg-slate-200/60 text-slate-700">
                    {comp.type}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">
                  {comp.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500 line-clamp-1">
                  {comp.englishName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Detailed Inspector Card */}
        {selectedComp && (
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {selectedComp.name} ({selectedComp.englishName})
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {selectedComp.description}
                </p>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-medium">
                {selectedComp.slaOrProtocol}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Responsibilities */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  مسئولیت‌های کلیدی در سیستم دانشگاهی:
                </span>
                <ul className="space-y-1">
                  {selectedComp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interfaces */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>رابط‌ها و پروتکل‌های ارتباطی (Interfaces):</span>
                </span>
                <div className="space-y-1">
                  {selectedComp.interfaces.map((intf, i) => (
                    <div key={i} className="text-[11px] font-mono bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                      {intf}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ۲. روابط میان اجزا (Relationships & Contracts) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700 mb-4">
          <ArrowRightLeft className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">
            ۲. روابط، قراردادها و وابستگی‌های بین اجزا
          </h3>
        </div>

        <div className="space-y-2.5">
          {architecture.relationships.map((rel, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/40 hover:bg-white transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {rel.source}
                  </span>
                  <span className="text-slate-400">◄────►</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {rel.target}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                    {rel.relationType}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-800 rounded">
                    {rel.protocol}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {rel.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ۳. جریان داده یا کنترل (Data & Control Flow) */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700 mb-4">
          <GitCommit className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">
            ۳. جریان متوالی داده و کنترل (Sequential Data & Control Flow)
          </h3>
        </div>

        <div className="relative border-r-2 border-indigo-200 mr-3 pr-6 space-y-6">
          {architecture.dataAndControlFlow.map((flow) => (
            <div key={flow.step} className="relative">
              
              {/* Step indicator circle */}
              <div className="absolute -right-9 top-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-4 ring-white">
                {flow.step}
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span>از: <strong className="text-indigo-700">{flow.from}</strong></span>
                    <span className="text-slate-400">←</span>
                    <span>به: <strong className="text-emerald-700">{flow.to}</strong></span>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                    Payload: {flow.payloadType}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-900 mb-1">
                  اقدام: {flow.action}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {flow.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
