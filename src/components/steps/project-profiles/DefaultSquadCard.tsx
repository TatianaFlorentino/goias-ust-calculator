
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Users } from 'lucide-react';
import { DefaultSquad } from '@/types/calculator';

interface DefaultSquadCardProps {
  squad: DefaultSquad;
  onApplySquad: (squad: DefaultSquad) => void;
}

const DefaultSquadCard: React.FC<DefaultSquadCardProps> = ({ squad, onApplySquad }) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'baixa': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateSquadTotals = () => {
    const totalQuantity = squad.profiles.reduce((sum, profile) => sum + profile.quantity, 0);
    const totalUstPerWeek = squad.profiles.reduce((sum, profile) => sum + (profile.quantity * profile.fcp * 40), 0);
    const totalValuePerWeek = totalUstPerWeek * 70; // UST padrão de R$ 70
    const totalUst = totalUstPerWeek * squad.duration;
    const totalValue = totalUst * 70;

    return {
      totalQuantity,
      totalUstPerWeek,
      totalValuePerWeek,
      totalUst,
      totalValue
    };
  };

  const totals = calculateSquadTotals();
  const complexityLabel = squad.complexity.charAt(0).toUpperCase() + squad.complexity.slice(1);

  return (
    <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
      <CardHeader className="bg-emerald-50 border-b border-emerald-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <div>
              <CardTitle className="text-lg text-emerald-800">
                Projeto - {complexityLabel}
              </CardTitle>
              <p className="text-sm text-emerald-600">
                {squad.duration} semanas
              </p>
            </div>
          </div>
          <Badge className={getComplexityColor(squad.complexity)}>
            {complexityLabel}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Lista de Perfis */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Composição do Squad:</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {squad.profiles.map((profile, profileIndex) => {
                const ustPerWeek = profile.quantity * profile.fcp * 40;
                const valuePerWeek = ustPerWeek * 70;
                
                return (
                  <div key={profileIndex} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800 text-sm leading-tight">
                          {profile.profileName}
                        </h5>
                        <div className="flex gap-4 mt-1 text-xs text-gray-600">
                          <span>FCP: {profile.fcp}</span>
                          <span>Qtd: {profile.quantity.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-emerald-600">
                          {Math.round(ustPerWeek)} UST/sem
                        </div>
                        <div className="text-xs text-gray-600">
                          R$ {valuePerWeek.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <h4 className="font-medium text-emerald-800 mb-2">Resumo Financeiro</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Total Profissionais:</span>
                <div className="font-medium">{totals.totalQuantity.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-gray-600">UST/Semana:</span>
                <div className="font-medium">{Math.round(totals.totalUstPerWeek)}</div>
              </div>
              <div>
                <span className="text-gray-600">R$/Semana:</span>
                <div className="font-medium">R$ {totals.totalValuePerWeek.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</div>
              </div>
              <div>
                <span className="text-gray-600">Valor Total:</span>
                <div className="font-medium text-emerald-700">R$ {totals.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</div>
              </div>
            </div>
          </div>

          {/* Botão de Aplicar */}
          <Button
            onClick={() => onApplySquad(squad)}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="sm"
          >
            <Copy className="w-4 h-4 mr-2" />
            Aplicar Squad {complexityLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultSquadCard;
