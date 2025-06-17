
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CalculatorData } from '@/types/calculator';

interface Step3GeneralParamsProps {
  data: CalculatorData['generalParams'];
  profiles: CalculatorData['profiles'];
  selectedProfileIds: string[];
  onChange: (data: Partial<CalculatorData['generalParams']>) => void;
  onToggleProfile: (profileId: string) => void;
  onSelectAllProfiles: () => void;
  onDeselectAllProfiles: () => void;
}

const Step3GeneralParams: React.FC<Step3GeneralParamsProps> = ({ 
  data, 
  profiles,
  selectedProfileIds,
  onChange,
  onToggleProfile,
  onSelectAllProfiles,
  onDeselectAllProfiles
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'projeto': return 'bg-blue-100 text-blue-800';
      case 'sustentacao': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 03 - Parâmetros Gerais</CardTitle>
        <CardDescription className="text-gray-100">
          Defina os parâmetros base e selecione os perfis para composição
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="ustValue" className="text-base font-medium text-emerald-700">
              Valor Unitário da UST (R$) *
            </Label>
            <Input
              id="ustValue"
              type="number"
              step="0.01"
              placeholder="70.00"
              value={data.ustValue}
              onChange={(e) => onChange({ ustValue: parseFloat(e.target.value) || 0 })}
              className="border-emerald-200 focus:border-emerald-600"
            />
            <p className="text-xs text-gray-600">Valor padrão: R$ 70,00</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractDuration" className="text-base font-medium text-emerald-700">
              Duração Total do Contrato (semanas) *
            </Label>
            <Input
              id="contractDuration"
              type="number"
              placeholder="52"
              value={data.contractDuration}
              onChange={(e) => onChange({ contractDuration: parseInt(e.target.value) || 0 })}
              className="border-emerald-200 focus:border-emerald-600"
            />
            <p className="text-xs text-gray-600">Exemplo: 52 semanas = 1 ano</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weeklyHours" className="text-base font-medium text-emerald-700">
              Carga Horária Semanal (horas) *
            </Label>
            <Input
              id="weeklyHours"
              type="number"
              placeholder="40"
              value={data.weeklyHours}
              onChange={(e) => onChange({ weeklyHours: parseInt(e.target.value) || 0 })}
              className="border-emerald-200 focus:border-emerald-600"
            />
            <p className="text-xs text-gray-600">Padrão: 40 horas/semana</p>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <h4 className="font-medium text-emerald-800 mb-2">Fórmula de Cálculo UST:</h4>
          <p className="text-sm text-emerald-800">
            <strong>UST = FCP × Horas Semanais</strong>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Onde FCP é o Fator de Complexidade do Perfil profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
            <h4 className="font-medium text-emerald-700 mb-2">Valor Total Estimado</h4>
            <p className="text-2xl font-bold text-emerald-800">
              R$ {(data.ustValue * data.contractDuration * data.weeklyHours).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p className="text-xs text-gray-600">Base para 1 UST durante todo o contrato</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
            <h4 className="font-medium text-emerald-700 mb-2">Custo Semanal por UST</h4>
            <p className="text-2xl font-bold text-emerald-800">
              R$ {data.ustValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p className="text-xs text-gray-600">Valor unitário configurado</p>
          </div>
        </div>

        <Card className="border-emerald-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-emerald-700">
                Seleção de Perfis para Composição ({selectedProfileIds.length}/{profiles.length})
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSelectAllProfiles}
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  Selecionar Todos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDeselectAllProfiles}
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  Desmarcar Todos
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {profiles.map((profile) => (
              <div key={profile.id} className="flex items-center space-x-3 p-3 border border-emerald-100 rounded-lg bg-white">
                <Checkbox
                  checked={selectedProfileIds.includes(profile.id)}
                  onCheckedChange={() => onToggleProfile(profile.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-emerald-800">{profile.name}</span>
                    <Badge className={getTypeColor(profile.type)}>
                      {profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    FCP: <span className="font-medium">{profile.fcp}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Apenas os perfis selecionados estarão disponíveis 
            para composição de squads nas próximas etapas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3GeneralParams;
