
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalculatorData } from '@/types/calculator';

interface Step3GeneralParamsProps {
  data: CalculatorData['generalParams'];
  onChange: (data: Partial<CalculatorData['generalParams']>) => void;
}

const Step3GeneralParams: React.FC<Step3GeneralParamsProps> = ({ 
  data, 
  onChange
}) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 03 - Parâmetros Gerais</CardTitle>
        <CardDescription className="text-gray-100">
          Configure os parâmetros que serão utilizados no cálculo final
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
            <p className="text-xs text-gray-600">Valor em reais para cada UST (padrão: R$ 70,00)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractDuration" className="text-base font-medium text-emerald-700">
              Duração do Contrato (semanas) *
            </Label>
            <Input
              id="contractDuration"
              type="number"
              placeholder="52"
              value={data.contractDuration}
              onChange={(e) => onChange({ contractDuration: parseInt(e.target.value) || 0 })}
              className="border-emerald-200 focus:border-emerald-600"
            />
            <p className="text-xs text-gray-600">Período total em semanas (ex: 52 semanas = 1 ano)</p>
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
            <p className="text-xs text-gray-600">Horas de trabalho por semana (padrão: 40 horas)</p>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <h4 className="font-medium text-emerald-800 mb-3">Como funciona o cálculo da UST:</h4>
          <div className="space-y-2 text-sm text-emerald-800">
            <p><strong>UST = FCP × Carga Horária Semanal</strong></p>
            <p>Onde FCP é o Fator de Complexidade do Perfil profissional</p>
            <p className="text-xs text-gray-600 mt-2">
              Estes parâmetros podem ser alterados conforme as necessidades específicas do seu contrato.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Os valores configurados aqui serão aplicados em todos os cálculos 
            das próximas etapas. Você pode ajustar estes parâmetros conforme as especificidades 
            do seu projeto ou contrato.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3GeneralParams;
