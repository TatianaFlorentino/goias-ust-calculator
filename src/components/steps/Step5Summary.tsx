import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { CalculationResult, Project, SquadComposition } from '@/types/calculator';
import ProjectForm from './project-profiles/ProjectForm';
import ProjectCard from './project-profiles/ProjectCard';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface Step5SummaryProps {
  results: CalculationResult[];
  personalInfo: any;
  generalParams: any;
  profiles: any[];
  projects: Project[];
  selectedProfileIds: string[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, project: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onAddSquadComposition: (squad: Omit<SquadComposition, 'id'>) => void;
}

const Step5Summary: React.FC<Step5SummaryProps> = ({ 
  results, 
  personalInfo, 
  generalParams,
  profiles,
  projects,
  selectedProfileIds,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onAddSquadComposition
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isAddingProject, setIsAddingProject] = useState(false);
  
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
    const doc = new jsPDF();
    
    // Cabeçalho institucional
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SGG/GO - Secretaria de Gestão e Governo', 20, 20);
    doc.text('Relatório de Cálculo UST/CACTIC', 20, 30);
    
    // Informações do responsável
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Responsável: ${personalInfo.name}`, 20, 45);
    doc.text(`E-mail: ${personalInfo.email}`, 20, 52);
    doc.text(`Órgão: ${personalInfo.organ}`, 20, 59);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 66);
    
    // Resumo executivo
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo Executivo', 20, 85);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total UST: ${totalUST.toLocaleString('pt-BR')}`, 20, 95);
    doc.text(`Valor Total: R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 102);
    doc.text(`Profissionais/Semana: ${totalProfilesPerWeek.toFixed(1)}`, 20, 109);
    doc.text(`Valor UST: R$ ${generalParams.ustValue.toFixed(2)}`, 20, 116);
    
    // Tabela de resultados
    const tableData = results.map(result => [
      result.category,
      result.squadComposition ? result.squadComposition.map(comp => `${comp.profile} (${comp.quantity})`).join(', ') : 'Nenhum perfil',
      result.profilesPerWeek.toFixed(2),
      result.duration.toString(),
      result.ustPerWeek.toFixed(0),
      `R$ ${result.valuePerWeek.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      result.totalUst.toLocaleString('pt-BR'),
      `R$ ${result.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ]);
    
    // Adicionar linha de total
    tableData.push([
      'TOTAL GERAL',
      '-',
      totalProfilesPerWeek.toFixed(2),
      '-',
      '-',
      '-',
      totalUST.toLocaleString('pt-BR'),
      `R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ]);
    
    autoTable(doc, {
      head: [['Categoria', 'Perfis Selecionados', 'Perfis/Sem', 'Duração', 'UST/Sem', 'R$/Sem', 'Total UST', 'Total R$']],
      body: tableData,
      startY: 130,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [52, 168, 83] },
      columnStyles: {
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' },
        5: { halign: 'right' },
        6: { halign: 'right' },
        7: { halign: 'right' }
      }
    });
    
    doc.save(`relatorio-ust-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportToExcel = () => {
    // Criar planilha
    const workbook = XLSX.utils.book_new();
    
    // Dados do cabeçalho
    const headerData = [
      ['SGG/GO - Secretaria de Gestão e Governo'],
      ['Relatório de Cálculo UST/CACTIC'],
      [''],
      [`Responsável: ${personalInfo.name}`],
      [`E-mail: ${personalInfo.email}`],
      [`Órgão: ${personalInfo.organ}`],
      [`Data: ${new Date().toLocaleDateString('pt-BR')}`],
      [''],
      ['RESUMO EXECUTIVO'],
      [`Total UST: ${totalUST.toLocaleString('pt-BR')}`],
      [`Valor Total: R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
      [`Profissionais/Semana: ${totalProfilesPerWeek.toFixed(1)}`],
      [`Valor UST: R$ ${generalParams.ustValue.toFixed(2)}`],
      [''],
      ['DETALHAMENTO POR CATEGORIA'],
      ['Categoria', 'Perfis Selecionados', 'Perfis/Semana', 'Duração (Sem)', 'UST/Semana', 'R$/Semana', 'Total (UST)', 'Total (R$)']
    ];
    
    // Dados dos resultados
    const resultData = results.map(result => [
      result.category,
      result.squadComposition ? result.squadComposition.map(comp => `${comp.profile} (${comp.quantity})`).join(', ') : 'Nenhum perfil',
      result.profilesPerWeek.toFixed(2),
      result.duration,
      result.ustPerWeek.toFixed(0),
      result.valuePerWeek.toFixed(2),
      result.totalUst,
      result.totalValue.toFixed(2)
    ]);
    
    // Linha de total
    resultData.push([
      'TOTAL GERAL',
      '-',
      totalProfilesPerWeek.toFixed(2),
      '-',
      '-',
      '-',
      totalUST,
      totalValue.toFixed(2)
    ]);
    
    // Combinar todos os dados
    const allData = [...headerData, ...resultData];
    
    // Criar worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(allData);
    
    // Adicionar à workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório UST');
    
    // Salvar arquivo
    XLSX.writeFile(workbook, `relatorio-ust-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 05 - Resultado do Cálculo</CardTitle>
        <CardDescription className="text-gray-100">
          Resultado consolidado e gerenciamento de iniciativas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Seção de Cadastro de Iniciativas */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-emerald-700">
              Iniciativas Cadastradas ({projects.length})
            </h3>
            <Button
              onClick={() => setIsAddingProject(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Iniciativa
            </Button>
          </div>

          {isAddingProject && (
            <ProjectForm
              selectedProfileIds={selectedProfileIds}
              profiles={profiles}
              onAddProject={onAddProject}
              onAddSquadComposition={onAddSquadComposition}
              onCancel={() => setIsAddingProject(false)}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={onDeleteProject}
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma iniciativa cadastrada ainda.</p>
              <p className="text-sm">Clique em "Nova Iniciativa" para começar.</p>
            </div>
          )}
        </div>

        {/* Informações do Responsável */}
        <Card className="border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-700">Informações do Responsável</CardTitle>
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
          <Card className="border-emerald-500/20 bg-emerald-50/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Total UST</h3>
              <p className="text-2xl font-bold text-emerald-600">
                {totalUST.toLocaleString('pt-BR')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-50/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Valor Total</h3>
              <p className="text-2xl font-bold text-emerald-600">
                R$ {totalValue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-50/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Profissionais/Semana</h3>
              <p className="text-2xl font-bold text-emerald-600">
                {totalProfilesPerWeek.toFixed(1)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-50/10">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-gray-600 mb-1">Valor UST</h3>
              <p className="text-2xl font-bold text-emerald-600">
                R$ {generalParams.ustValue.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Resultados com Detalhamento de Composição */}
        <Card className="border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-700">Detalhamento por Categoria</CardTitle>
            <CardDescription className="text-sm text-emerald-600">
              Clique em uma linha para ver a composição detalhada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-500/20">
                    <th className="text-left p-2 font-medium text-emerald-700">Categoria</th>
                    <th className="text-left p-2 font-medium text-emerald-700">Perfis Selecionados</th>
                    <th className="text-right p-2 font-medium text-emerald-700">Perfis/Semana</th>
                    <th className="text-right p-2 font-medium text-emerald-700">Duração (Sem)</th>
                    <th className="text-right p-2 font-medium text-emerald-700">UST/Semana</th>
                    <th className="text-right p-2 font-medium text-emerald-700">R$/Semana</th>
                    <th className="text-right p-2 font-medium text-emerald-700">Total (UST)</th>
                    <th className="text-right p-2 font-medium text-emerald-700">Total (R$)</th>
                    <th className="text-center p-2 font-medium text-emerald-700">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b border-gray-100 hover:bg-emerald-50/5">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.category}</span>
                            {result.squadComposition && result.squadComposition.length > 1 && (
                              <Badge variant="secondary" className="text-xs">
                                Combinado
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            {result.squadComposition && result.squadComposition.length > 0 ? (
                              <div className="space-y-1">
                                {result.squadComposition.slice(0, 2).map((comp, compIndex) => (
                                  <div key={compIndex} className="text-emerald-700 truncate">
                                    • {comp.profile} ({comp.quantity})
                                  </div>
                                ))}
                                {result.squadComposition.length > 2 && (
                                  <div className="text-emerald-600 text-xs">
                                    +{result.squadComposition.length - 2} mais...
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-xs">Nenhum perfil</span>
                            )}
                          </div>
                        </td>
                        <td className="text-right p-2">{result.profilesPerWeek.toFixed(2)}</td>
                        <td className="text-right p-2">{result.duration}</td>
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
                              className="text-emerald-600 hover:text-emerald-700"
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
                      {/* Detalhamento da Composição */}
                      {expandedCategories.has(result.category) && result.squadComposition && (
                        <tr className="bg-emerald-50/10">
                          <td colSpan={9} className="p-4">
                            <div className="bg-white rounded-lg border border-emerald-500/20 p-4">
                              <h4 className="font-medium text-emerald-700 mb-3">
                                Composição - {result.category}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {result.squadComposition.map((comp, compIndex) => (
                                  <div 
                                    key={compIndex}
                                    className="bg-emerald-50/20 p-3 rounded-lg border border-emerald-500/30"
                                  >
                                    <h5 className="font-medium text-emerald-700 text-sm mb-2">
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
                              <div className="mt-3 p-3 bg-emerald-600/10 rounded-lg">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium text-emerald-700">
                                    Total da Categoria:
                                  </span>
                                  <div className="text-right">
                                    <div className="font-bold text-emerald-700">
                                      {result.ustPerWeek.toFixed(0)} UST/Semana
                                    </div>
                                    <div className="text-emerald-700">
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
                  <tr className="border-t-2 border-emerald-500/40 bg-emerald-50/10 font-semibold">
                    <td className="p-2 text-emerald-700">TOTAL GERAL</td>
                    <td className="p-2 text-emerald-700">-</td>
                    <td className="text-right p-2">{totalProfilesPerWeek.toFixed(2)}</td>
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
        <Card className="border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-700">Exportação de Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={exportToPDF}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
              <Button 
                onClick={exportToExcel}
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
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

        <div className="bg-emerald-50/20 p-4 rounded-lg border border-emerald-500/20">
          <h4 className="font-medium text-emerald-700 mb-2">Explicações da Tabela:</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li><strong>Perfis/Semana:</strong> Soma ponderada dos perfis por tipo de atuação por semana</li>
            <li><strong>Duração (Semanas):</strong> Duração total somada de todos os itens da categoria</li>
            <li><strong>UST/Semana:</strong> Total de Unidades de Serviço Técnico por semana</li>
            <li><strong>R$/Semana:</strong> Valor financeiro semanal com base no valor da UST informado</li>
            <li><strong>Total (UST):</strong> Total acumulado de USTs para a categoria</li>
            <li><strong>Total (R$):</strong> Valor financeiro total estimado por categoria</li>
            <li><strong>Detalhes:</strong> Clique para expandir e ver a composição detalhada de cada perfil</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5Summary;