import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { CalculationResult } from '@/types/calculator';

interface Step5SummaryProps {
  results: CalculationResult[];
  personalInfo: any;
  generalParams: any;
}

const Step5Summary: React.FC<Step5SummaryProps> = ({ 
  results, 
  personalInfo, 
  generalParams 
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  const totalUST = results.reduce((sum, result) => sum + result.totalUst, 0);
  const totalValue = results.reduce((sum, result) => sum + result.totalValue, 0);
  const totalProfilesPerWeek = results.reduce((sum, result) => sum + result.profilesPerWeek, 0);

  const toggleCategoryExpansion = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const exportToPDF = () => {
    // Implementar exportação para PDF
    console.log('Exportar para PDF');
  };

  const exportToExcel = () => {
    // Implementar exportação para Excel
    console.log('Exportar para Excel');
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-goias-green to-goias-dark-green text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 05 - Resumo Geral / Memória de Cálculo</CardTitle>
        <CardDescription className="text-gray-100">
          Resultado consolidado com transparência dos cálculos e composições de squad
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Informações do Responsável */}
        <Card className="border-goias-green/20">
          <CardHeader>
            <CardTitle className="text-lg text-goias-green">Informações do Responsável</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Nome:</span>
                <p className="font-medium">{personalInfo.name}</p>
              </div>
              <div>
                <span className="text-gray-600">E-mail:</span>
                <p className="font-medium">{personalInfo.email}</p>
              </div>
              <div>
                <span className="text-gray-600">Órgão:</span>
                <p className="font-medium">{personalInfo.organ}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-goias-green/20 bg-goias-light-green/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Total UST</h3>
              <p className="text-2xl font-bold text-goias-green">
                {totalUST.toLocaleString('pt-BR')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-goias-green/20 bg-goias-light-green/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Valor Total</h3>
              <p className="text-2xl font-bold text-goias-green">
                R$ {totalValue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </CardContent>
          </Card>

          <Card className="border-goias-green/20 bg-goias-light-green/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Profissionais/Semana</h3>
              <p className="text-2xl font-bold text-goias-green">
                {totalProfilesPerWeek.toFixed(1)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-goias-green/20 bg-goias-light-green/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Valor UST</h3>
              <p className="text-2xl font-bold text-goias-green">
                R$ {generalParams.ustValue.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Resultados com Detalhamento de Composição */}
        <Card className="border-goias-green/20">
          <CardHeader>
            <CardTitle className="text-lg text-goias-green">Detalhamento por Categoria</CardTitle>
            <CardDescription className="text-sm text-goias-dark-green">
              Clique em uma linha para ver a composição detalhada do squad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-goias-green/20">
                    <th className="text-left p-2 font-medium text-goias-green">Categoria</th>
                    <th className="text-right p-2 font-medium text-goias-green">Perfis/Semana</th>
                    <th className="text-right p-2 font-medium text-goias-green">Duração (Sem)</th>
                    <th className="text-right p-2 font-medium text-goias-green">Squads/Ano</th>
                    <th className="text-right p-2 font-medium text-goias-green">UST/Semana</th>
                    <th className="text-right p-2 font-medium text-goias-green">R$/Semana</th>
                    <th className="text-right p-2 font-medium text-goias-green">Total (UST)</th>
                    <th className="text-right p-2 font-medium text-goias-green">Total (R$)</th>
                    <th className="text-center p-2 font-medium text-goias-green">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b border-gray-100 hover:bg-goias-light-green/5">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.category}</span>
                            {result.squadComposition && result.squadComposition.length > 1 && (
                              <Badge variant="secondary" className="text-xs">
                                Squad Combinado
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-right p-2">{result.profilesPerWeek.toFixed(2)}</td>
                        <td className="text-right p-2">{result.duration}</td>
                        <td className="text-right p-2">{result.squadsPerYear.toFixed(2)}</td>
                        <td className="text-right p-2">{result.ustPerWeek.toFixed(0)}</td>
                        <td className="text-right p-2">
                          R$ {result.valuePerWeek.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </td>
                        <td className="text-right p-2">{result.totalUst.toLocaleString('pt-BR')}</td>
                        <td className="text-right p-2">
                          R$ {result.totalValue.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </td>
                        <td className="text-center p-2">
                          {result.squadComposition && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleCategoryExpansion(result.category)}
                              className="text-goias-green hover:text-goias-dark-green"
                            >
                              {expandedCategories.has(result.category) ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                        </td>
                      </tr>
                      {/* Detalhamento da Composição do Squad */}
                      {expandedCategories.has(result.category) && result.squadComposition && (
                        <tr className="bg-goias-light-green/10">
                          <td colSpan={9} className="p-4">
                            <div className="bg-white rounded-lg border border-goias-green/20 p-4">
                              <h4 className="font-medium text-goias-dark-green mb-3">
                                Composição do Squad - {result.category}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {result.squadComposition.map((comp, compIndex) => (
                                  <div 
                                    key={compIndex}
                                    className="bg-goias-light-green/20 p-3 rounded-lg border border-goias-green/30"
                                  >
                                    <h5 className="font-medium text-goias-dark-green text-sm mb-2">
                                      {comp.profile}
                                    </h5>
                                    <div className="space-y-1 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Quantidade:</span>
                                        <span className="font-medium">{comp.quantity}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">UST/Semana:</span>
                                        <span className="font-medium">{comp.ustContribution.toFixed(0)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Valor/Semana:</span>
                                        <span className="font-medium">
                                          R$ {(comp.ustContribution * generalParams.ustValue).toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                          })}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 p-3 bg-goias-green/10 rounded-lg">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium text-goias-dark-green">
                                    Total da Categoria:
                                  </span>
                                  <div className="text-right">
                                    <div className="font-bold text-goias-dark-green">
                                      {result.ustPerWeek.toFixed(0)} UST/Semana
                                    </div>
                                    <div className="text-goias-dark-green">
                                      R$ {result.valuePerWeek.toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}/Semana
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  <tr className="border-t-2 border-goias-green/40 bg-goias-light-green/10 font-semibold">
                    <td className="p-2 text-goias-green">TOTAL GERAL</td>
                    <td className="text-right p-2">{totalProfilesPerWeek.toFixed(2)}</td>
                    <td className="text-right p-2">-</td>
                    <td className="text-right p-2">-</td>
                    <td className="text-right p-2">-</td>
                    <td className="text-right p-2">-</td>
                    <td className="text-right p-2">{totalUST.toLocaleString('pt-BR')}</td>
                    <td className="text-right p-2">
                      R$ {totalValue.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className="text-right p-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Exportação */}
        <Card className="border-goias-green/20">
          <CardHeader>
            <CardTitle className="text-lg text-goias-green">Exportação de Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={exportToPDF}
                className="bg-goias-green hover:bg-goias-dark-green"
              >
                <FileText className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
              <Button 
                onClick={exportToExcel}
                variant="outline"
                className="border-goias-green text-goias-green hover:bg-goias-light-green/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Os relatórios incluem cabeçalho institucional da SGG/GO e memória de cálculo completa.
            </p>
          </CardContent>
        </Card>

        <div className="bg-goias-light-green/20 p-4 rounded-lg border border-goias-green/20">
          <h4 className="font-medium text-goias-dark-green mb-2">Explicações da Tabela:</h4>
          <ul className="text-sm text-goias-dark-green space-y-1">
            <li><strong>Perfis/Semana:</strong> Soma ponderada dos perfis por tipo de atuação por semana</li>
            <li><strong>Duração (Semanas):</strong> Duração total somada de todos os itens da categoria</li>
            <li><strong>Squads/Ano:</strong> Quantidade equivalente de squads ao longo do ano</li>
            <li><strong>UST/Semana:</strong> Total de Unidades de Serviço Técnico por semana</li>
            <li><strong>R$/Semana:</strong> Valor financeiro semanal com base no valor da UST informado</li>
            <li><strong>Total (UST):</strong> Total acumulado de USTs para a categoria</li>
            <li><strong>Total (R$):</strong> Valor financeiro total estimado por categoria</li>
            <li><strong>Squad Combinado:</strong> Indica quando múltiplas composições (padrão + personalizada) foram aplicadas</li>
            <li><strong>Detalhes:</strong> Clique para expandir e ver a composição detalhada de cada perfil no squad</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5Summary;
