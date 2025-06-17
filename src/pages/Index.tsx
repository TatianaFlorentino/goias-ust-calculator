import React from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import Step1PersonalInfo from '@/components/steps/Step1PersonalInfo';
import Step2GeneralParams from '@/components/steps/Step2GeneralParams';
import Step3Projects from '@/components/steps/Step3Projects';
import Step4SquadComposition from '@/components/steps/Step4SquadComposition';
import Step5Summary from '@/components/steps/Step5Summary';
import { useCalculator } from '@/hooks/useCalculator';
import { useToast } from '@/hooks/use-toast';

const stepNames = [
  'Informações Pessoais',
  'Parâmetros Gerais',
  'Cadastro de Projetos',
  'Formato dos Squads',
  'Resumo / Cálculo'
];

const Index = () => {
  const {
    calculatorData,
    currentStep,
    setCurrentStep,
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

  const { toast } = useToast();

  const handleNext = () => {
    // Validações básicas
    if (currentStep === 1) {
      if (!calculatorData.personalInfo.name || !calculatorData.personalInfo.email || !calculatorData.personalInfo.organ) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos obrigatórios antes de continuar.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!calculatorData.generalParams.ustValue || !calculatorData.generalParams.contractDuration || !calculatorData.generalParams.weeklyHours) {
        toast({
          title: "Parâmetros incompletos",
          description: "Preencha todos os parâmetros gerais antes de continuar.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 3) {
      if (calculatorData.projects.length === 0) {
        toast({
          title: "Projetos necessários",
          description: "Cadastre pelo menos um projeto antes de continuar.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 4) {
      if (calculatorData.squads.length === 0) {
        toast({
          title: "Composições necessárias",
          description: "Defina pelo menos uma composição de squad antes de continuar.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
          <Step2GeneralParams
            data={calculatorData.generalParams}
            profiles={calculatorData.profiles}
            onChange={updateGeneralParams}
            onAddProfile={addProfile}
            onUpdateProfile={updateProfile}
            onDeleteProfile={deleteProfile}
          />
        );
      case 3:
        return (
          <Step3Projects
            projects={calculatorData.projects}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onDeleteProject={deleteProject}
          />
        );
      case 4:
        return (
          <Step4SquadComposition
            profiles={calculatorData.profiles}
            squads={calculatorData.squads}
            onAddSquad={addSquadComposition}
            onUpdateSquad={updateSquadComposition}
            onDeleteSquad={deleteSquadComposition}
          />
        );
      case 5:
        return (
          <Step5Summary
            results={calculateResults()}
            personalInfo={calculatorData.personalInfo}
            generalParams={calculatorData.generalParams}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={5}
          stepNames={stepNames}
        />

        <div className="mt-8">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            Voltar
          </Button>

          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Próximo
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                Nova Simulação
              </Button>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-emerald-600 text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              © 2024 Secretaria-Geral de Governo de Goiás - Sistema de Calculadora UST
            </p>
            <p className="text-xs text-gray-200 mt-1">
              Desenvolvido para apoio à gestão de contratos de TI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
