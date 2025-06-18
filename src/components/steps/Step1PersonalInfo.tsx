
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
  { name: 'Casa Civil', acronym: 'CC' },
  { name: 'Secretaria de Estado da Economia', acronym: 'SEE' },
  { name: 'Secretaria de Estado da Educação', acronym: 'SEDUC' },
  { name: 'Secretaria de Estado da Saúde', acronym: 'SES' },
  { name: 'Secretaria de Estado da Segurança Pública', acronym: 'SSP' },
  { name: 'Secretaria de Estado de Desenvolvimento Social', acronym: 'SEDS' },
  { name: 'Secretaria de Estado de Meio Ambiente e Desenvolvimento Sustentável', acronym: 'SEMAD' },
  { name: 'Secretaria de Estado de Infraestrutura', acronym: 'SEINFRA' },
  { name: 'Secretaria de Estado da Agricultura, Pecuária e Abastecimento', acronym: 'SEAPA' },
  { name: 'Secretaria de Estado de Desenvolvimento e Inovação', acronym: 'SEDI' },
  { name: 'Secretaria de Estado da Cidadania', acronym: 'SECID' },
  { name: 'Secretaria de Estado da Cultura', acronym: 'SECULT' },
  { name: 'Secretaria de Estado do Esporte e Lazer', acronym: 'SEEL' }
];

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({ data, onChange }) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 01 - Informações Pessoais</CardTitle>
        <CardDescription className="text-gray-100">
          Identifique o responsável pelo preenchimento e o órgão de origem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium text-emerald-700">
            Nome Completo *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Digite seu nome completo"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="border-emerald-200 focus:border-emerald-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium text-emerald-700">
            E-mail Institucional *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="nome@go.gov.br"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="border-emerald-200 focus:border-emerald-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="organ" className="text-base font-medium text-emerald-700">
            Órgão do Estado de Goiás *
          </Label>
          <Select value={data.organ} onValueChange={(value) => onChange({ organ: value })}>
            <SelectTrigger className="border-emerald-200 focus:border-emerald-600">
              <SelectValue placeholder="Selecione o órgão" />
            </SelectTrigger>
            <SelectContent>
              {organs.map((organ) => (
                <SelectItem key={organ.acronym} value={organ.name}>
                  <div className="flex items-center justify-between w-full">
                    <span>{organ.name}</span>
                    <span className="text-emerald-600 font-medium ml-2">({organ.acronym})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800">
            <strong>Importante:</strong> Todas as informações fornecidas serão utilizadas 
            exclusivamente para fins de cálculo e controle interno da SGG/GO.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step1PersonalInfo;
