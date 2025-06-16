
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculatorData } from '@/types/calculator';

interface Step1PersonalInfoProps {
  data: CalculatorData['personalInfo'];
  onChange: (data: Partial<CalculatorData['personalInfo']>) => void;
}

const organs = [
  'GEINOVA',
  'Casa Civil',
  'Secretaria de Estado da Economia',
  'Secretaria de Estado da Educação',
  'Secretaria de Estado da Saúde',
  'Secretaria de Estado da Segurança Pública',
  'Secretaria de Estado de Desenvolvimento Social',
  'Secretaria de Estado de Meio Ambiente e Desenvolvimento Sustentável',
  'Secretaria de Estado de Infraestrutura',
  'Secretaria de Estado da Agricultura, Pecuária e Abastecimento',
  'Secretaria de Estado de Desenvolvimento e Inovação',
  'Secretaria de Estado da Cidadania',
  'Secretaria de Estado da Cultura',
  'Secretaria de Estado do Esporte e Lazer',
  'Outro'
];

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({ data, onChange }) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-goias-green to-goias-dark-green text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 01 - Informações Pessoais</CardTitle>
        <CardDescription className="text-gray-100">
          Identifique o responsável pelo preenchimento e o órgão de origem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium text-goias-green">
            Nome Completo *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Digite seu nome completo"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="border-goias-green/20 focus:border-goias-green"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium text-goias-green">
            E-mail Institucional *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="nome@go.gov.br"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="border-goias-green/20 focus:border-goias-green"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organ" className="text-base font-medium text-goias-green">
            Órgão/Unidade Administrativa *
          </Label>
          <Select value={data.organ} onValueChange={(value) => onChange({ organ: value })}>
            <SelectTrigger className="border-goias-green/20 focus:border-goias-green">
              <SelectValue placeholder="Selecione o órgão" />
            </SelectTrigger>
            <SelectContent>
              {organs.map((organ) => (
                <SelectItem key={organ} value={organ}>
                  {organ}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-goias-light-green/20 p-4 rounded-lg border border-goias-green/20">
          <p className="text-sm text-goias-dark-green">
            <strong>Importante:</strong> Todas as informações fornecidas serão utilizadas 
            exclusivamente para fins de cálculo e controle interno da SGG/GO.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step1PersonalInfo;
