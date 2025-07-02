import React from 'react';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import { useCalculator } from '@/hooks/useCalculator';
import Step1PersonalInfo from '@/components/steps/Step1PersonalInfo';
import Step2ProfileFCP from '@/components/steps/Step2ProfileFCP';
import Step3GeneralParams from '@/components/steps/Step3GeneralParams';
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

  const stepNames = [
    'Informações Pessoais',
    'Cadastro de Perfis',
    'Parâmetros Gerais',
    'Composição de Squad',
    'Resultado do Cálculo'
  ];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalInfo
            data={calculatorData.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 2:
        return (
          <Step2ProfileFCP
            profiles={calculatorData.profiles}
            onAddProfile={addProfile}
            onUpdateProfile={updateProfile}
            onDeleteProfile={deleteProfile}
          />
        );
      case 3:
        return (
          <Step3GeneralParams
            data={calculatorData.generalParams}
            onChange={updateGeneralParams}
          />
        );
      case 4:
        return (
          <Step4SquadComposition
            profiles={calculatorData.profiles}
            selectedProfileIds={selectedProfileIds}
            squads={calculatorData.squads}
            onToggleProfileSelection={toggleProfileSelection}
            onSelectAllProfiles={selectAllProfiles}
            onDeselectAllProfiles={deselectAllProfiles}
            onAddSquadComposition={addSquadComposition}
            onUpdateSquadComposition={updateSquadComposition}
            onDeleteSquadComposition={deleteSquadComposition}
          />
        );
      case 5:
        return (
          <Step5Summary
            results={calculateResults()}
            personalInfo={calculatorData.personalInfo}
            generalParams={calculatorData.generalParams}
            profiles={calculatorData.profiles}
            projects={calculatorData.projects}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onDeleteProject={deleteProject}
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
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={5} 
          stepNames={stepNames}
        />
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
            onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
            disabled={currentStep === 5}
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