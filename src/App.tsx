/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PatternId, SubMenuId, Phase4AnalysisId } from './types/architecture';
import { PATTERNS_DATA } from './data/patternsData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PatternIntroView } from './components/PatternIntroView';
import { ArchitectureDesignView } from './components/ArchitectureDesignView';
import { ScenarioRunnerView } from './components/ScenarioRunnerView';
import { DesignDecisionView } from './components/DesignDecisionView';
import { ArchitectureEvaluationView } from './components/ArchitectureEvaluationView';
import { Phase4DeepDiveView } from './components/Phase4DeepDiveView';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ReportModal } from './components/ReportModal';
import { AiDisclosureModal } from './components/AiDisclosureModal';

export default function App() {
  const [activePatternId, setActivePatternId] = useState<PatternId>('model-gateway');
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuId>('intro');
  const [isPhase4Active, setIsPhase4Active] = useState<boolean>(false);
  const [activePhase4Id, setActivePhase4Id] = useState<Phase4AnalysisId>('rationale');

  // Modals state
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isAiDisclosureModalOpen, setIsAiDisclosureModalOpen] = useState<boolean>(false);

  const currentPattern = PATTERNS_DATA[activePatternId];

  const handleSelectPattern = (patternId: PatternId) => {
    setActivePatternId(patternId);
    // Keep current submenu or reset to intro if switching
    setIsPhase4Active(false);
  };

  const handleSelectSubMenu = (subMenuId: SubMenuId) => {
    setActiveSubMenu(subMenuId);
    setIsPhase4Active(false);
  };

  const handleSelectPhase4 = (phase4Id: Phase4AnalysisId) => {
    setActivePhase4Id(phase4Id);
    setIsPhase4Active(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      
      {/* Top Header with Academic Context and Phase 5, 6, 7 Trigger Buttons */}
      <Header
        activePatternId={activePatternId}
        activeSubMenu={activeSubMenu}
        onOpenArchitectureModal={() => setIsArchModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAiDisclosureModal={() => setIsAiDisclosureModalOpen(true)}
        isPhase4Active={isPhase4Active}
      />

      {/* Main Container: Sidebar + Content Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row overflow-hidden">
        
        {/* Phase 1 & 2 Sidebar with English Pattern Titles & Submenus */}
        <Sidebar
          activePatternId={activePatternId}
          activeSubMenu={activeSubMenu}
          isPhase4Active={isPhase4Active}
          activePhase4Id={activePhase4Id}
          onSelectPattern={handleSelectPattern}
          onSelectSubMenu={handleSelectSubMenu}
          onSelectPhase4={handleSelectPhase4}
        />

        {/* Phase 3 & 4 Central Workspace Display */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* Phase 4 Active View */}
          {isPhase4Active ? (
            <Phase4DeepDiveView
              phase4={currentPattern.phase4}
              activePhase4Id={activePhase4Id}
              onSelectTab={setActivePhase4Id}
              patternEnglishTitle={currentPattern.englishTitle}
            />
          ) : (
            /* Phase 2 SubMenu Views */
            <>
              {activeSubMenu === 'intro' && (
                <PatternIntroView
                  intro={currentPattern.intro}
                  patternEnglishTitle={currentPattern.englishTitle}
                  patternPersianTitle={currentPattern.persianTitle}
                />
              )}

              {activeSubMenu === 'architecture' && (
                <ArchitectureDesignView
                  architecture={currentPattern.architecture}
                  patternEnglishTitle={currentPattern.englishTitle}
                />
              )}

              {activeSubMenu === 'scenario' && (
                <ScenarioRunnerView
                  scenario={currentPattern.scenario}
                  patternEnglishTitle={currentPattern.englishTitle}
                />
              )}

              {activeSubMenu === 'design-decision' && (
                <DesignDecisionView
                  decision={currentPattern.designDecisionAnalysis}
                  patternEnglishTitle={currentPattern.englishTitle}
                />
              )}

              {activeSubMenu === 'evaluation' && (
                <ArchitectureEvaluationView
                  evaluation={currentPattern.evaluation}
                  patternEnglishTitle={currentPattern.englishTitle}
                />
              )}
            </>
          )}

        </main>

      </div>

      {/* Phase 5 Modal: نمودار معماری سامانه */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      {/* Phase 6 Modal: گزارش تحلیلی ۳ تا ۵ صفحه‌ای */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Phase 7 Modal: توضیح کوتاه درباره نقش هوش مصنوعی */}
      <AiDisclosureModal
        isOpen={isAiDisclosureModalOpen}
        onClose={() => setIsAiDisclosureModalOpen(false)}
      />

    </div>
  );
}
