
import React from 'react';
import { Header } from '@/components/Header';
import { StepIndicator } from '@/components/StepIndicator';
import { useCalculator } from '@/hooks/useCalculator';
import Step1PersonalInfo from '@/components/steps/Step1PersonalInfo';
import Step2GeneralParams from '@/components/steps/Step2GeneralParams';
import Step3GeneralParams from '@/components/steps/Step3GeneralParams';
import Step4ProjectsAndProfiles from '@/components/steps/Step4ProjectsAndProfiles';
import Step4SquadComposition from '@/components/steps/Step4SquadComposition';
import Step5Summary from '@/components/steps/Step5Summary';

const Index = () => {
  const {
    calculatorData,
    currentStep,
    setCurrentStep,
    selectedProfileIds,
    toggleProfileSelection,
    selectAllProfiles,
    deselectAllProfiles,
    updatePersonalInfo,
    updateGeneralParams,
    addProfile,
    updateProfile,
    deleteProfile,
    addProject,
    updateProject,
    deleteProject,
    addSquadComposition,
    updateSquadComposition,
    deleteSquadComposition,
    calculateResults
  } = useCalculator();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalInfo
            personalInfo={calculatorData.personalInfo}
            onUpdatePersonalInfo={updatePersonalInfo}
          />
        );
      case 2:
        return (
          <Step2GeneralParams
            profiles={calculatorData.profiles}
            onAddProfile={addProfile}
            onUpdateProfile={updateProfile}
            onDeleteProfile={deleteProfile}
          />
        );
      case 3:
        return (
          <Step3GeneralParams
            generalParams={calculatorData.generalParams}
            onUpdateGeneralParams={updateGeneralParams}
          />
        );
      case 4:
        return (
          <Step4ProjectsAndProfiles
            projects={calculatorData.projects}
            profiles={calculatorData.profiles}
            selectedProfileIds={selectedProfileIds}
            squads={calculatorData.squads}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onDeleteProject={deleteProject}
            onToggleProfileSelection={toggleProfileSelection}
            onSelectAllProfiles={selectAllProfiles}
            onDeselectAllProfiles={deselectAllProfiles}
            onAddSquadComposition={addSquadComposition}
          />
        );
      case 5:
        return (
          <Step4SquadComposition
            profiles={calculatorData.profiles}
            selectedProfileIds={selectedProfileIds}
            projects={calculatorData.projects}
            squads={calculatorData.squads}
            onAddSquad={addSquadComposition}
            onUpdateSquad={updateSquadComposition}
            onDeleteSquad={deleteSquadComposition}
          />
        );
      case 6:
        return (
          <Step5Summary
            calculatorData={calculatorData}
            calculationResults={calculateResults()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} totalSteps={6} />
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition-colors"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
            disabled={currentStep === 6}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50 hover:bg-emerald-700 transition-colors"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
