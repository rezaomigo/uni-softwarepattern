import React, { useState } from 'react';
import { ANALYTICAL_REPORT } from '../data/analyticalReportData';
import { 
  X, 
  FileText, 
  Printer, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Table 
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isContinuousView, setIsContinuousView] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSection = ANALYTICAL_REPORT.sections.find(s => s.pageNumber === currentPage) || ANALYTICAL_REPORT.sections[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {ANALYTICAL_REPORT.title}
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  فاز ششم تمرین
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {ANALYTICAL_REPORT.courseTitle} • {ANALYTICAL_REPORT.degreeLevel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
              title="چاپ یا ذخیره گزارش به فرمت PDF"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>چاپ / خروجی PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
              title="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Navigation & View Mode */}
        <div className="px-5 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          
          {/* Page Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {ANALYTICAL_REPORT.sections.map((sec) => (
              <button
                key={sec.pageNumber}
                onClick={() => {
                  setCurrentPage(sec.pageNumber);
                  setIsContinuousView(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  !isContinuousView && currentPage === sec.pageNumber
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                صفحه {sec.pageNumber}
              </button>
            ))}
          </div>

          {/* Toggle Continuous View */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsContinuousView(!isContinuousView)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isContinuousView 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isContinuousView ? 'نمایش صفحه به صفحه' : 'نمایش پیوسته کل صفحات (۵ صفحه)'}
            </button>
          </div>

        </div>

        {/* Report Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50/50 print:bg-white print:p-0">
          
          {/* Executive Summary */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>چکیده مدیریتی و اجرایی گزارش (Executive Summary):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {ANALYTICAL_REPORT.executiveSummary}
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              <strong>هدف تمرین:</strong> {ANALYTICAL_REPORT.projectTarget}
            </div>
          </div>

          {/* Continuous View or Single Page View */}
          {(isContinuousView ? ANALYTICAL_REPORT.sections : [currentSection]).map((section) => (
            <div 
              key={section.pageNumber}
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 print:border-none print:shadow-none"
            >
              {/* Page Header */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-700 font-bold mb-1">
                  <span>گزارش معماری دکتری • صفحه {section.pageNumber} از ۵</span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded text-emerald-800">
                    بخش {section.sectionId}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {section.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {section.subtitle}
                </p>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {section.contentParagraphs.map((p, idx) => (
                  <p key={idx}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Tables if any */}
              {section.tables && section.tables.map((table, tIdx) => (
                <div key={tIdx} className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Table className="w-4 h-4 text-emerald-600" />
                    <span>{table.caption}</span>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                          {table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-2.5">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 leading-relaxed text-slate-700">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Key Takeaways Box */}
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 space-y-2">
                <span className="text-xs font-bold text-emerald-900 block">
                  نکات کلیدی و نتایج صفحه {section.pageNumber}:
                </span>
                <ul className="space-y-1.5">
                  {section.keyTakeaways.map((k, kIdx) => (
                    <li key={kIdx} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          {!isContinuousView && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4" />
                <span>صفحه قبل</span>
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                disabled={currentPage === 5}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 flex items-center gap-1 font-medium"
              >
                <span>صفحه بعد</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="text-center font-mono">
            صفحه {currentPage} از ۵ • گزارش رسمی تمرین دکتری
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium transition-colors"
          >
            بستن گزارش
          </button>
        </div>

      </div>

    </div>
  );
};
