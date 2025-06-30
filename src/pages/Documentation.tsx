
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  Users, 
  Settings, 
  FolderOpen, 
  Target, 
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  BookOpen,
  Zap,
  Shield
} from 'lucide-react';

const Documentation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Documentação</h1>
                  <p className="text-sm text-gray-600">Calculadora UST - SGG</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/calculator')}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Usar Calculadora
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="business-rules">Regras de Negócio</TabsTrigger>
            <TabsTrigger value="methodology">Metodologia</TabsTrigger>
            <TabsTrigger value="step-by-step">Passo a Passo</TabsTrigger>
            <TabsTrigger value="profiles">Perfis e FCP</TabsTrigger>
            <TabsTrigger value="calculations">Cálculos</TabsTrigger>
            <TabsTrigger value="examples">Exemplos</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-emerald-600" />
                  <span>Sobre a Calculadora UST</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  A Calculadora UST é uma ferramenta oficial desenvolvida pela Secretaria de Gestão Governamental (SGG) 
                  do Estado de Goiás, em conformidade com as diretrizes estabelecidas pelo Comitê de Avaliação de 
                  Licenças de Contratos de TI (CALCTI).
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-800 mb-2">Objetivo</h4>
                    <p className="text-sm text-emerald-700">
                      Padronizar e automatizar o cálculo de custos em contratos de TI para órgãos estaduais.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Público-Alvo</h4>
                    <p className="text-sm text-blue-700">
                      Órgãos e entidades do Estado de Goiás que necessitam contratar serviços de TI.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Benefícios</h4>
                    <p className="text-sm text-purple-700">
                      Economia de tempo, padronização de cálculos e conformidade normativa.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Importante</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Esta ferramenta é gratuita e de uso exclusivo para órgãos do Estado de Goiás. 
                        Não deve ser comercializada ou utilizada para fins lucrativos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regras de Negócio */}
          <TabsContent value="business-rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Regras de Negócio</span>
                </CardTitle>
                <CardDescription>
                  Diretrizes e regras que regem o uso da Calculadora UST
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">1. Valores e Parâmetros</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-medium">Valor Padrão da UST</h4>
                      <p className="text-sm text-gray-600 mt-1">R$ 70,00 por UST (conforme CALCTI)</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">Carga Horária</h4>
                      <p className="text-sm text-gray-600 mt-1">40 horas semanais (padrão)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">2. Perfis Profissionais</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Fator de Complexidade do Perfil (FCP)</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>1.0 - 2.0:</strong> Perfis básicos (Analista Jr., Técnico de Suporte)</li>
                      <li>• <strong>2.1 - 3.5:</strong> Perfis intermediários (Analista Pleno, Desenvolvedor)</li>
                      <li>• <strong>3.6 - 5.0:</strong> Perfis sêniores (Arquiteto, Especialista, Coordenador)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">3. Tipos de Projeto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-green-800">Projeto</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-green-700">
                          Desenvolvimento de novos sistemas, funcionalidades ou produtos
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-orange-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-orange-800">Sustentação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-orange-700">
                          Manutenção, correções e melhorias de sistemas existentes
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-purple-200 bg-purple-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-purple-800">Gestão</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-purple-700">
                          Coordenação, gerenciamento e governança de projetos
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">4. Complexidade de Projetos</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Baixa Complexidade</h4>
                        <p className="text-sm text-gray-600">
                          Projetos simples, poucos requisitos, tecnologias conhecidas, equipe pequena
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Média Complexidade</h4>
                        <p className="text-sm text-gray-600">
                          Projetos moderados, requisitos médios, algumas integrações, equipe padrão
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Alta Complexidade</h4>
                        <p className="text-sm text-gray-600">
                          Projetos complexos, muitos requisitos, múltiplas integrações, equipe especializada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800">Restrições de Uso</h4>
                      <ul className="text-sm text-red-700 mt-2 space-y-1">
                        <li>• Uso exclusivo para órgãos do Estado de Goiás</li>
                        <li>• Proibida comercialização ou uso para fins lucrativos</li>
                        <li>• Valores calculados devem ser validados pelos órgãos competentes</li>
                        <li>• Ferramenta deve ser utilizada conforme metodologia CALCTI</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metodologia */}
          <TabsContent value="methodology" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span>Metodologia CALCTI</span>
                </CardTitle>
                <CardDescription>
                  Fundamentos teóricos e metodológicos da calculadora
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-4">Fórmula Base da UST</h3>
                  <div className="bg-white p-4 rounded border border-emerald-300">
                    <code className="text-lg text-emerald-700 font-mono">
                      UST = FCP × Horas Semanais × Duração (semanas) × Valor UST
                    </code>
                  </div>
                  <div className="mt-4 text-sm text-emerald-700">
                    <p><strong>Onde:</strong></p>
                    <ul className="mt-2 space-y-1">
                      <li>• <strong>FCP:</strong> Fator de Complexidade do Perfil</li>
                      <li>• <strong>Horas Semanais:</strong> Carga horária semanal do profissional</li>
                      <li>• <strong>Duração:</strong> Período do projeto em semanas</li>
                      <li>• <strong>Valor UST:</strong> Valor unitário da UST (R$ 70,00)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Processo de Cálculo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">1. Definição de Perfis</h4>
                      <p className="text-sm text-gray-600">
                        Cadastro dos perfis profissionais necessários com seus respectivos FCPs
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">2. Configuração de Projetos</h4>
                      <p className="text-sm text-gray-600">
                        Definição do tipo, complexidade e duração dos projetos
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">3. Composição de Squads</h4>
                      <p className="text-sm text-gray-600">
                        Definição da quantidade de profissionais por perfil em cada squad
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">4. Cálculo Final</h4>
                      <p className="text-sm text-gray-600">
                        Aplicação da fórmula e geração dos resultados consolidados
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Exemplo de Cálculo</h4>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p><strong>Cenário:</strong> Desenvolvedor Pleno (FCP 2.5) trabalhando 40h/semana por 20 semanas</p>
                    <p><strong>Cálculo:</strong> 2.5 × 40 × 20 × R$ 70,00 = R$ 140.000,00</p>
                    <p><strong>USTs:</strong> 2.5 × 40 × 20 = 2.000 USTs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Passo a Passo */}
          <TabsContent value="step-by-step" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  step: 1,
                  title: "Informações Pessoais",
                  icon: Users,
                  description: "Identificação do responsável e órgão",
                  details: [
                    "Nome completo do responsável pelo preenchimento",
                    "E-mail institucional para contato",
                    "Órgão ou entidade do Estado de Goiás"
                  ]
                },
                {
                  step: 2,
                  title: "Cadastro de Perfis FCP",
                  icon: Settings,
                  description: "Configuração dos perfis profissionais",
                  details: [
                    "Cadastro de perfis necessários para o projeto",
                    "Definição do Fator de Complexidade (FCP) para cada perfil",
                    "Validação dos valores conforme padrões CALCTI"
                  ]
                },
                {
                  step: 3,
                  title: "Parâmetros Gerais",
                  icon: Target,
                  description: "Configuração dos parâmetros de cálculo",
                  details: [
                    "Valor unitário da UST (padrão R$ 70,00)",
                    "Duração total do contrato em semanas",
                    "Carga horária semanal padrão",
                    "Seleção dos perfis disponíveis"
                  ]
                },
                {
                  step: 4,
                  title: "Projetos e Perfis",
                  icon: FolderOpen,
                  description: "Cadastro dos projetos e suas características",
                  details: [
                    "Cadastro de projetos por tipo (Projeto/Sustentação)",
                    "Definição da complexidade (Baixa/Média/Alta)",
                    "Especificação da duração individual",
                    "Configuração de squads padrão ou personalizados"
                  ]
                },
                {
                  step: 5,
                  title: "Formato dos Squads",
                  icon: Users,
                  description: "Composição detalhada das equipes",
                  details: [
                    "Seleção de projetos para composição",
                    "Definição da quantidade de profissionais por perfil",
                    "Configuração de squads personalizados",
                    "Validação da composição das equipes"
                  ]
                },
                {
                  step: 6,
                  title: "Resumo e Resultados",
                  icon: FileText,
                  description: "Visualização dos cálculos finais",
                  details: [
                    "Resumo executivo do projeto",
                    "Detalhamento por squad e perfil",
                    "Valores totais e parciais",
                    "Relatório para download"
                  ]
                }
              ].map((stepData) => {
                const IconComponent = stepData.icon;
                return (
                  <Card key={stepData.step} className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {stepData.step}
                        </div>
                        <IconComponent className="w-5 h-5 text-emerald-600" />
                        <span>{stepData.title}</span>
                      </CardTitle>
                      <CardDescription>{stepData.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {stepData.details.map((detail, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Perfis e FCP */}
          <TabsContent value="profiles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guia de Perfis e Fatores de Complexidade</CardTitle>
                <CardDescription>
                  Referência para definição de perfis profissionais e seus FCPs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg">Perfis Básicos</CardTitle>
                      <CardDescription className="text-green-600">FCP: 1.0 - 2.0</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• Analista de Sistemas Jr.</li>
                        <li>• Desenvolvedor Jr.</li>
                        <li>• Técnico de Suporte</li>
                        <li>• Analista de Testes Jr.</li>
                        <li>• Estagiário de TI</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg">Perfis Intermediários</CardTitle>
                      <CardDescription className="text-blue-600">FCP: 2.1 - 3.5</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>• Analista de Sistemas Pleno</li>
                        <li>• Desenvolvedor Pleno</li>
                        <li>• Analista de Banco de Dados</li>
                        <li>• Analista de Testes Pleno</li>
                        <li>• Analista de Segurança</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-purple-800 text-lg">Perfis Sêniores</CardTitle>
                      <CardDescription className="text-purple-600">FCP: 3.6 - 5.0</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li>• Arquiteto de Software</li>
                        <li>• Especialista em TI</li>
                        <li>• Coordenador de Projetos</li>
                        <li>• Gerente de Projetos</li>
                        <li>• Consultor Sênior</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">Critérios para Definição do FCP</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• <strong>Experiência:</strong> Tempo de atuação na área</li>
                    <li>• <strong>Conhecimento Técnico:</strong> Profundidade e amplitude das competências</li>
                    <li>• <strong>Responsabilidade:</strong> Nível de autonomia e tomada de decisão</li>
                    <li>• <strong>Liderança:</strong> Capacidade de coordenar equipes</li>
                    <li>• <strong>Especialização:</strong> Conhecimentos específicos e certificações</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cálculos */}
          <TabsContent value="calculations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhamento dos Cálculos</CardTitle>
                <CardDescription>
                  Como a calculadora processa os dados e gera os resultados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-4">Cálculo Individual por Perfil</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <code className="text-emerald-700">UST_Perfil = FCP × Horas_Semanais × Duração_Semanas</code>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <code className="text-emerald-700">Valor_Perfil = UST_Perfil × Valor_Unitário_UST</code>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Cálculo por Squad</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <code className="text-blue-700">UST_Squad = Σ(UST_Perfil × Quantidade_Perfil)</code>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <code className="text-blue-700">Valor_Squad = UST_Squad × Valor_Unitário_UST</code>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Cálculo Total do Projeto</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <code className="text-purple-700">UST_Total = Σ(UST_Squad)</code>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <code className="text-purple-700">Valor_Total = UST_Total × Valor_Unitário_UST</code>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Exemplo Prático</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Squad:</strong> 2 Desenvolvedores Pleno (FCP 2.5) + 1 Arquiteto (FCP 4.0)</p>
                    <p><strong>Projeto:</strong> 24 semanas, 40 horas/semana</p>
                    <hr className="my-2" />
                    <p><strong>Desenvolvedor:</strong> 2.5 × 40 × 24 = 2.400 USTs × 2 = 4.800 USTs</p>
                    <p><strong>Arquiteto:</strong> 4.0 × 40 × 24 = 3.840 USTs × 1 = 3.840 USTs</p>
                    <p><strong>Total Squad:</strong> 8.640 USTs = R$ 604.800,00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exemplos */}
          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">Exemplo 1: Projeto de Desenvolvimento</CardTitle>
                  <CardDescription>Sistema de gestão de baixa complexidade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h4 className="font-medium text-green-800">Características</h4>
                    <ul className="text-sm text-green-700 mt-1 space-y-1">
                      <li>• Tipo: Projeto</li>
                      <li>• Complexidade: Baixa</li>
                      <li>• Duração: 16 semanas</li>
                      <li>• Carga: 40h/semana</li>
                    </ul>
                  </div>
                  <div className="bg-white border rounded p-3">
                    <h4 className="font-medium mb-2">Composição do Squad</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 1 Coordenador (FCP 3.5): 2.240 USTs</li>
                      <li>• 2 Desenvolvedores Pleno (FCP 2.5): 3.200 USTs</li>
                      <li>• 1 Analista de Testes (FCP 2.0): 1.280 USTs</li>
                    </ul>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="font-semibold text-green-800">Total: 6.720 USTs = R$ 470.400,00</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-800">Exemplo 2: Sustentação</CardTitle>
                  <CardDescription>Manutenção de sistema crítico</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-orange-50 p-3 rounded border border-orange-200">
                    <h4 className="font-medium text-orange-800">Características</h4>
                    <ul className="text-sm text-orange-700 mt-1 space-y-1">
                      <li>• Tipo: Sustentação</li>
                      <li>• Complexidade: Média</li>
                      <li>• Duração: 52 semanas</li>
                      <li>• Carga: 40h/semana</li>
                    </ul>
                  </div>
                  <div className="bg-white border rounded p-3">
                    <h4 className="font-medium mb-2">Composição do Squad</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 1 Especialista Sênior (FCP 4.0): 8.320 USTs</li>
                      <li>• 1 Desenvolvedor Pleno (FCP 2.5): 5.200 USTs</li>
                      <li>• 1 Analista de Suporte (FCP 1.5): 3.120 USTs</li>
                    </ul>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Total: 16.640 USTs = R$ 1.164.800,00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
