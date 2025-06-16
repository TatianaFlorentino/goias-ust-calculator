
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';
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
  const totalUST = results.reduce((sum, result) => sum + result.totalUst, 0);
  const totalValue = results.reduce((sum, result) => sum + result.totalValue, 0);
  const totalProfilesPerWeek = results.reduce((sum, result) => sum + result.profilesPerWeek, 0);

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
          Resultado consolidado com transparência dos cálculos
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

        {/* Tabela de Resultados */}
        <Card className="border-goias-green/20">
          <CardHeader>
            <CardTitle className="text-lg text-goias-green">Detalhamento por Categoria</CardTitle>
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
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-goias-light-green/5">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.category}</span>
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
                    </tr>
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
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5Summary;
