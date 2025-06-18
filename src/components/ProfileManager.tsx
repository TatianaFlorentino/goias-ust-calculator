
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash } from 'lucide-react';
import { ProfessionalProfile } from '@/types/calculator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProfileManagerProps {
  profiles: ProfessionalProfile[];
  onAddProfile: (profile: Omit<ProfessionalProfile, 'id'>) => void;
  onUpdateProfile: (id: string, profile: Partial<ProfessionalProfile>) => void;
  onDeleteProfile: (id: string) => void;
}

const defaultProfiles = [
  { name: 'Analista de Requisitos/Processos/Negócios Júnior', fcp: 1.1 },
  { name: 'Analista de Requisitos/Processos/Negócios Pleno', fcp: 1.3 },
  { name: 'Analista de Requisitos/Processos/Negócios Sênior', fcp: 1.5 },
  { name: 'Analista de Testes/Qualidade Pleno', fcp: 1.3 },
  { name: 'Analista de Testes/Qualidade Sênior', fcp: 1.5 },
  { name: 'Arquiteto de Software/Soluções Júnior', fcp: 1.6 },
  { name: 'Arquiteto de Software/Soluções Pleno', fcp: 2.1 },
  { name: 'Arquiteto de Software/Soluções Sênior', fcp: 3.2 },
  { name: 'Desenvolvedor de Software Júnior', fcp: 1.0 },
  { name: 'Desenvolvedor de Software Pleno', fcp: 1.1 },
  { name: 'Desenvolvedor de Software Sênior', fcp: 1.7 },
  { name: 'Designer de UX/UI Pleno', fcp: 1.1 },
  { name: 'Designer de UX/UI Sênior', fcp: 1.3 },
  { name: 'Gerente de Projetos de TIC Pleno', fcp: 2.1 },
  { name: 'Gerente de Projetos de TIC Sênior', fcp: 3.2 },
  { name: 'Líder de Equipe Pleno', fcp: 2.1 },
  { name: 'Líder de Equipe Sênior', fcp: 3.2 },
  { name: 'Líder Técnico/Líder de Produto Pleno', fcp: 2.1 },
  { name: 'Líder Técnico/Líder de Produto Sênior', fcp: 3.2 },
  { name: 'Scrum Master/Agilista Pleno', fcp: 1.9 },
  { name: 'Scrum Master/Agilista Sênior', fcp: 3.0 },
  { name: 'Supervisor Técnico Pleno', fcp: 1.3 }
];

const ProfileManager: React.FC<ProfileManagerProps> = ({
  profiles,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProfile, setNewProfile] = useState<Omit<ProfessionalProfile, 'id'>>({
    name: '',
    fcp: 1.0
  });

  const handleAdd = () => {
    if (newProfile.name && newProfile.fcp) {
      onAddProfile(newProfile);
      setNewProfile({ name: '', fcp: 1.0 });
      setIsAdding(false);
    }
  };

  const handleEdit = (profile: ProfessionalProfile) => {
    setEditingId(profile.id);
    setNewProfile({
      name: profile.name,
      fcp: profile.fcp
    });
  };

  const handleUpdate = () => {
    if (editingId && newProfile.name && newProfile.fcp) {
      onUpdateProfile(editingId, newProfile);
      setEditingId(null);
      setNewProfile({ name: '', fcp: 1.0 });
    }
  };

  const addDefaultProfile = (defaultProfile: { name: string; fcp: number }) => {
    onAddProfile(defaultProfile);
  };

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-emerald-700">
              PERFIS x FCP ({profiles.length})
            </CardTitle>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Perfil
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(isAdding || editingId) && (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Perfil Profissional *</Label>
                    <Input
                      placeholder="Ex: Desenvolvedor Sênior"
                      value={newProfile.name}
                      onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>FCP *</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="1.0"
                      value={newProfile.fcp}
                      onChange={(e) => setNewProfile({ ...newProfile, fcp: parseFloat(e.target.value) || 1.0 })}
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {editingId ? 'Atualizar' : 'Adicionar'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                      setNewProfile({ name: '', fcp: 1.0 });
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="border border-emerald-200 rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-emerald-50">
                  <TableHead className="text-emerald-700 font-semibold">Perfil Profissional</TableHead>
                  <TableHead className="text-emerald-700 font-semibold text-center">FCP</TableHead>
                  <TableHead className="text-emerald-700 font-semibold text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id} className="hover:bg-emerald-50">
                    <TableCell className="font-medium">{profile.name}</TableCell>
                    <TableCell className="text-center font-semibold text-emerald-600">{profile.fcp}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(profile)}
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteProfile(profile.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-100"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-lg text-emerald-700">
            Perfis Padrão Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {defaultProfiles.map((defaultProfile, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => addDefaultProfile(defaultProfile)}
                className="justify-between text-left h-auto p-3 border-emerald-200 hover:bg-emerald-50"
                disabled={profiles.some(p => p.name === defaultProfile.name)}
              >
                <span className="text-xs">{defaultProfile.name}</span>
                <span className="text-emerald-600 font-semibold text-xs">FCP: {defaultProfile.fcp}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManager;
