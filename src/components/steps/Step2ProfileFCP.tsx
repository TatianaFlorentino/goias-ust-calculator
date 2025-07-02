
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileManager from '@/components/ProfileManager';
import { CalculatorData } from '@/types/calculator';

interface Step2ProfileFCPProps {
  profiles: CalculatorData['profiles'];
  onAddProfile: (profile: Omit<CalculatorData['profiles'][0], 'id'>) => void;
  onUpdateProfile: (id: string, profile: Partial<CalculatorData['profiles'][0]>) => void;
  onDeleteProfile: (id: string) => void;
}

const Step2ProfileFCP: React.FC<Step2ProfileFCPProps> = ({
  profiles,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile
}) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 02 - Cadastro de Perfis</CardTitle>
        <CardDescription className="text-gray-100">
          Gerencie os perfis profissionais com suas quantidades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <h4 className="font-medium text-emerald-800 mb-2">Perfis Profissionais</h4>
          <p className="text-sm text-emerald-800 mb-2">
            Cadastre os perfis profissionais necessários e defina as quantidades para cada um.
          </p>
          <p className="text-xs text-gray-600">
            Cada perfil deve ter uma quantidade específica conforme a necessidade do projeto.
          </p>
        </div>

        <ProfileManager
          profiles={profiles}
          onAddProfile={onAddProfile}
          onUpdateProfile={onUpdateProfile}
          onDeleteProfile={onDeleteProfile}
        />
      </CardContent>
    </Card>
  );
};

export default Step2ProfileFCP;
