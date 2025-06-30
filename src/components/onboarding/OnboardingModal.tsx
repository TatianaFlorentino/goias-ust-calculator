import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Calculator, Users, Settings, FolderOpen, Target, FileText, Shield } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: "Bem-vindo à Calculadora UST da SGG",
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">Secretaria de Gestão Governamental</h4>
            <p className="text-sm text-emerald-700">
              Ferramenta oficial desenvolvida pela SGG em conformidade com as diretrizes 
              do CALCTI (Comitê de Avaliação de Licenças de Contratos de TI) do Estado de Goiás.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Objetivo da Ferramenta</h4>
            <p className="text-sm text-blue-700">
              Padronizar e automatizar o cálculo de custos em contratos de TI para órgãos 
              estaduais, utilizando a metodologia UST (Unidades de Serviços Técnicos).
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Importante - Uso Gratuito</h4>
            <p className="text-sm text-yellow-700">
              Esta ferramenta é <strong>100% gratuita</strong> para órgãos do Estado de Goiás. 
              Não deve ser comercializada ou utilizada para fins lucrativos, sendo destinada 
              exclusivamente ao auxílio na gestão pública.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">6</div>
              <div className="text-sm text-emerald-700">Etapas Guiadas</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">R$ 70</div>
              <div className="text-sm text-blue-700">Valor Padrão UST</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Etapa 1 - Informações Pessoais",
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Primeira etapa onde você se identifica e informa o órgão responsável.
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <div>
                <h5 className="font-medium">Nome Completo</h5>
                <p className="text-sm text-gray-600">Identificação do responsável pelo preenchimento</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <div>
                <h5 className="font-medium">E-mail Institucional</h5>
                <p className="text-sm text-gray-600">Contato oficial para comunicações</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <div>
                <h5 className="font-medium">Órgão do Estado</h5>
                <p className="text-sm text-gray-600">Secretaria ou órgão solicitante</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Dica:</strong> Todos os campos marcados com * são obrigatórios.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Etapa 2 - Cadastro de Perfis FCP",
      icon: Settings,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Configure os perfis profissionais e seus fatores de complexidade.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Fator de Complexidade do Perfil (FCP)</h4>
            <p className="text-sm text-blue-700 mb-2">
              É um multiplicador que representa a especialização do perfil:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>1.0 - 2.0:</strong> Perfis básicos (Analista Jr., Suporte)</li>
              <li>• <strong>2.1 - 3.5:</strong> Perfis intermediários (Analista Pleno, Desenvolvedor)</li>
              <li>• <strong>3.6 - 5.0:</strong> Perfis sêniores (Arquiteto, Especialista)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium">Funcionalidades:</h5>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-sm">Adicionar novos perfis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-sm">Editar perfis existentes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-sm">Remover perfis desnecessários</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Etapa 3 - Parâmetros Gerais",
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Configure os parâmetros que serão utilizados no cálculo final.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              <h5 className="font-medium text-emerald-800">Valor Unitário da UST</h5>
              <p className="text-sm text-emerald-700">
                Valor em reais para cada UST (padrão: R$ 70,00)
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              <h5 className="font-medium text-emerald-800">Duração do Contrato</h5>
              <p className="text-sm text-emerald-700">
                Período total em semanas (ex: 52 semanas = 1 ano)
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              <h5 className="font-medium text-emerald-800">Carga Horária Semanal</h5>
              <p className="text-sm text-emerald-700">
                Horas de trabalho por semana (padrão: 40 horas)
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <h5 className="font-medium text-yellow-800">Seleção de Perfis</h5>
            <p className="text-sm text-yellow-700">
              Escolha quais perfis estarão disponíveis para composição dos squads.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Etapa 4 - Cadastro de Projetos",
      icon: FolderOpen,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Cadastre os projetos que precisarão de equipes especializadas.
          </p>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-medium">Tipos de Projeto</h5>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>• <strong>Projeto:</strong> Desenvolvimento de novos sistemas</li>
                <li>• <strong>Sustentação:</strong> Manutenção de sistemas existentes</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-medium">Níveis de Complexidade</h5>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>• <strong>Baixa:</strong> Projetos simples, poucos requisitos</li>
                <li>• <strong>Média:</strong> Projetos moderados, requisitos médios</li>
                <li>• <strong>Alta:</strong> Projetos complexos, muitos requisitos</li>
              </ul>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Importante:</strong> A duração do projeto influencia diretamente no cálculo final das USTs.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Etapa 5 - Formato dos Squads",
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Defina a composição das equipes para cada projeto cadastrado.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-800">Seleção de Projetos</h5>
              <p className="text-sm text-blue-700">
                Use checkboxes para selecionar múltiplos projetos de uma vez
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-800">Composição da Equipe</h5>
              <p className="text-sm text-purple-700">
                Defina quantos profissionais de cada perfil são necessários
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-gray-700">1:N</div>
              <div className="text-xs text-gray-600">Projeto : Squads</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-gray-700">Auto</div>
              <div className="text-xs text-gray-600">Herda tipo/complexidade</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Etapa 6 - Resumo e Cálculo",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Visualize o resumo completo e os resultados dos cálculos.
          </p>
          <div className="space-y-3">
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              <h5 className="font-medium text-emerald-800">Resumo Executivo</h5>
              <ul className="text-sm text-emerald-700 mt-1 space-y-1">
                <li>• Total de projetos e squads</li>
                <li>• Quantidade de profissionais por perfil</li>
                <li>• Valor total estimado do contrato</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-800">Detalhamento por Squad</h5>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• USTs calculadas por perfil</li>
                <li>• Custo individual e total</li>
                <li>• Relatório completo para download</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-3 rounded-lg">
            <h5 className="font-medium">Fórmula Final</h5>
            <p className="text-sm opacity-90">UST = FCP × Horas Semanais × Duração × Valor UST</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-red-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-red-800">Conformidade CALCTI</h5>
                <p className="text-sm text-red-700">
                  Todos os cálculos seguem rigorosamente as normas estabelecidas pelo CALCTI/GO.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(onboardingSteps.length - 1);
  };

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <IconComponent className="w-6 h-6 text-emerald-600" />
              </div>
              <span>{currentStepData.title}</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>
                Etapa {currentStep + 1} de {onboardingSteps.length}
              </CardDescription>
              {currentStep < onboardingSteps.length - 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Pular Tutorial
                </Button>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
              ></div>
            </div>
          </CardHeader>
          <CardContent>
            {currentStepData.content}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>

          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-emerald-600'
                    : index < currentStep
                    ? 'bg-emerald-300'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < onboardingSteps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Começar a Usar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
