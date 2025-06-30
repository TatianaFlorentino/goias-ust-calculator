
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Calculator, Users, Target, FileText, Clock, Shield, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calculator,
      title: "Cálculo Automatizado de UST",
      description: "Calcule automaticamente as Unidades de Serviços Técnicos baseado nos padrões CACTIC do Estado de Goiás"
    },
    {
      icon: Users,
      title: "Gestão de Perfis Profissionais",
      description: "Cadastre e gerencie perfis com seus respectivos Fatores de Complexidade (FCP)"
    },
    {
      icon: Target,
      title: "Composição de Squads",
      description: "Configure equipes personalizadas ou utilize composições padrão por complexidade"
    },
    {
      icon: FileText,
      title: "Relatórios Detalhados",
      description: "Gere relatórios completos com estimativas de custo e composição de equipes"
    },
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Reduza drasticamente o tempo de elaboração de propostas e orçamentos"
    },
    {
      icon: Shield,
      title: "Conformidade Garantida",
      description: "Aderente às normas e padrões estabelecidos pelo CACTIC/GO"
    }
  ];

  const benefits = [
    "Ferramenta 100% gratuita para órgãos do Estado de Goiás",
    "Cálculos baseados em metodologia validada pelo CACTIC",
    "Interface intuitiva e processo guiado em 6 etapas",
    "Suporte a projetos de desenvolvimento e sustentação",
    "Composições de squad flexíveis e personalizáveis",
    "Relatórios prontos para apresentação"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Calculadora UST</h1>
                <p className="text-sm text-gray-600">Secretaria de Gestão Governamental - SGG</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/documentation')}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Documentação
              </Button>
              <Button 
                onClick={() => navigate('/calculator')}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Começar Agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Calculadora UST
              <span className="text-emerald-600"> do Estado de Goiás</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Ferramenta oficial da Secretaria de Gestão Governamental para cálculo automatizado 
              de Unidades de Serviços Técnicos em contratos de TI, seguindo os padrões estabelecidos pelo CACTIC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/calculator')}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Iniciar Cálculo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/documentation')}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Documentação
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desenvolvida especificamente para atender às necessidades dos órgãos públicos estaduais
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-emerald-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Por que usar a Calculadora UST?
              </h2>
              <p className="text-gray-700 mb-8">
                Desenvolvida pela SGG em parceria com o CACTIC, esta ferramenta foi criada 
                especificamente para simplificar e padronizar o processo de cálculo de custos 
                em contratos de TI no Estado de Goiás.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Metodologia CACTIC
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa calculadora implementa integralmente a metodologia estabelecida 
                pelo Comitê de Avaliação de Licenças de Contratos de TI do Estado de Goiás.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h4 className="font-medium text-emerald-800 mb-2">Fórmula Base:</h4>
                <code className="text-sm text-emerald-700">
                  UST = FCP × Horas Semanais × Duração × Valor UST
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-emerald-100 mb-8 text-lg">
              Acesse agora a Calculadora UST e simplifique seus cálculos de contrato de TI. 
              É gratuito e não requer cadastro.
            </p>
            <Button 
              onClick={() => navigate('/calculator')}
              size="lg"
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">Calculadora UST</span>
              </div>
              <p className="text-gray-400">
                Ferramenta oficial da SGG para cálculo de custos em contratos de TI.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/documentation')} className="hover:text-white">Documentação</button></li>
                <li><button onClick={() => navigate('/calculator')} className="hover:text-white">Calculadora</button></li>
                <li><button onClick={() => navigate('/tutorial')} className="hover:text-white">Tutorial</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <p className="text-gray-400">
                Secretaria de Gestão Governamental<br />
                Estado de Goiás
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Governo do Estado de Goiás - SGG. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
