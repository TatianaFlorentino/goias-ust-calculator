
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalculatorData } from '@/types/calculator';

interface Step2GeneralParamsProps {
  data: CalculatorData['generalParams'];
  onChange: (data: Partial<CalculatorData['generalParams']>) => void;
}

const Step2GeneralParams: React.FC<Step2GeneralParamsProps> = ({ data, onChange }) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-goias-green to-goias-dark-green text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 02 - Parâmetros Gerais</CardTitle>
        <CardDescription className="text-gray-100">
          Defina os parâmetros base que serão utilizados no cálculo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="ustValue" className="text-base font-medium text-goias-green">
              Valor Unitário da UST (R$) *
            </Label>
            <Input
              id="ustValue"
              type="number"
              step="0.01"
              placeholder="70.00"
              value={data.ustValue}
              onChange={(e) => onChange({ ustValue: parseFloat(e.target.value) || 0 })}
              className="border-goias-green/20 focus:border-goias-green"
            />
            <p className="text-xs text-gray-600">Valor padrão: R$ 70,00</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractDuration" className="text-base font-medium text-goias-green">
              Duração Total do Contrato (semanas) *
            </Label>
            <Input
              id="contractDuration"
              type="number"
              placeholder="52"
              value={data.contractDuration}
              onChange={(e) => onChange({ contractDuration: parseInt(e.target.value) || 0 })}
              className="border-goias-green/20 focus:border-goias-green"
            />
            <p className="text-xs text-gray-600">Exemplo: 52 semanas = 1 ano</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weeklyHours" className="text-base font-medium text-goias-green">
              Carga Horária Semanal (horas) *
            </Label>
            <Input
              id="weeklyHours"
              type="number"
              placeholder="40"
              value={data.weeklyHours}
              onChange={(e) => onChange({ weeklyHours: parseInt(e.target.value) || 0 })}
              className="border-goias-green/20 focus:border-goias-green"
            />
            <p className="text-xs text-gray-600">Padrão: 40 horas/semana</p>
          </div>
        </div>

        <div className="bg-goias-light-green/20 p-4 rounded-lg border border-goias-green/20">
          <h4 className="font-medium text-goias-dark-green mb-2">Fórmula de Cálculo UST:</h4>
          <p className="text-sm text-goias-dark-green">
            <strong>UST = FCP × Horas Semanais</strong>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Onde FCP é o Fator de Complexidade do Perfil profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-goias-green/20 shadow-sm">
            <h4 className="font-medium text-goias-green mb-2">Valor Total Estimado</h4>
            <p className="text-2xl font-bold text-goias-dark-green">
              R$ {(data.ustValue * data.contractDuration * data.weeklyHours).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p className="text-xs text-gray-600">Base para 1 UST durante todo o contrato</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-goias-green/20 shadow-sm">
            <h4 className="font-medium text-goias-green mb-2">Custo Semanal por UST</h4>
            <p className="text-2xl font-bold text-goias-dark-green">
              R$ {data.ustValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p className="text-xs text-gray-600">Valor unitário configurado</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2GeneralParams;
