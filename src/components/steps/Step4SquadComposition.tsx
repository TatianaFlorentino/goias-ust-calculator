
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, X } from 'lucide-react';
import { ProfessionalProfile, SquadComposition } from '@/types/calculator';

interface Step4SquadCompositionProps {
  profiles: ProfessionalProfile[];
  squads: SquadComposition[];
  onAddSquad: (squad: Omit<SquadComposition, 'id'>) => void;
  onUpdateSquad: (id: string, squad: Partial<SquadComposition>) => void;
  onDeleteSquad: (id: string) => void;
}

const Step4SquadComposition: React.FC<Step4SquadCompositionProps> = ({
  profiles,
  squads,
  onAddSquad,
  onUpdateSquad,
  onDeleteSquad
}) => {
  const [isAddingSquad, setIsAddingSquad] = useState(false);
  const [newSquad, setNewSquad] = useState<Omit<SquadComposition, 'id'>>({
    profileId: '',
    quantity: 1,
    type: 'projeto',
    complexity: 'baixa'
  });

  const handleAddSquad = () => {
    if (newSquad.profileId) {
      onAddSquad(newSquad);
      setNewSquad({
        profileId: '',
        quantity: 1,
        type: 'projeto',
        complexity: 'baixa'
      });
      setIsAddingSquad(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'projeto': return 'bg-blue-100 text-blue-800';
      case 'sustentacao': return 'bg-purple-100 text-purple-800';
      case 'gestao': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity?: string) => {
    switch (complexity) {
      case 'baixa': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProfileName = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    return profile ? profile.name : 'Perfil não encontrado';
  };

  const getProfileFCP = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    return profile ? profile.fcp : 0;
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-goias-green to-goias-dark-green text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 04 - Formato dos Squads</CardTitle>
        <CardDescription className="text-gray-100">
          Defina a composição das equipes por tipo de atuação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-goias-green">
            Composições de Squad ({squads.length})
          </h3>
          <Button
            onClick={() => setIsAddingSquad(true)}
            className="bg-goias-green hover:bg-goias-dark-green"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Composição
          </Button>
        </div>

        {isAddingSquad && (
          <Card className="border-goias-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-goias-green">Adicionar Composição de Squad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Perfil Profissional *</Label>
                  <Select 
                    value={newSquad.profileId} 
                    onValueChange={(value) => setNewSquad({ ...newSquad, profileId: value })}
                  >
                    <SelectTrigger className="border-goias-green/20 focus:border-goias-green">
                      <SelectValue placeholder="Selecione um perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name} (FCP: {profile.fcp})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quantidade de Profissionais *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="1"
                    value={newSquad.quantity}
                    onChange={(e) => setNewSquad({ ...newSquad, quantity: parseFloat(e.target.value) || 0 })}
                    className="border-goias-green/20 focus:border-goias-green"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Atuação *</Label>
                  <Select 
                    value={newSquad.type} 
                    onValueChange={(value: any) => setNewSquad({ ...newSquad, type: value })}
                  >
                    <SelectTrigger className="border-goias-green/20 focus:border-goias-green">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projeto">Projeto</SelectItem>
                      <SelectItem value="sustentacao">Sustentação</SelectItem>
                      <SelectItem value="gestao">Gestão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newSquad.type === 'projeto' && (
                  <div className="space-y-2">
                    <Label>Complexidade *</Label>
                    <Select 
                      value={newSquad.complexity} 
                      onValueChange={(value: any) => setNewSquad({ ...newSquad, complexity: value })}
                    >
                      <SelectTrigger className="border-goias-green/20 focus:border-goias-green">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddSquad} className="bg-goias-green hover:bg-goias-dark-green">
                  Adicionar
                </Button>
                <Button variant="outline" onClick={() => setIsAddingSquad(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {squads.map((squad) => (
            <Card key={squad.id} className="border-goias-green/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-goias-dark-green mb-2">
                      {getProfileName(squad.profileId)}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className={getTypeColor(squad.type)}>
                        {squad.type.charAt(0).toUpperCase() + squad.type.slice(1)}
                      </Badge>
                      {squad.complexity && (
                        <Badge className={getComplexityColor(squad.complexity)}>
                          {squad.complexity.charAt(0).toUpperCase() + squad.complexity.slice(1)}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Quantidade:</span>
                        <p className="font-medium">{squad.quantity}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">FCP:</span>
                        <p className="font-medium">{getProfileFCP(squad.profileId)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">UST/Semana:</span>
                        <p className="font-medium">{(squad.quantity * getProfileFCP(squad.profileId) * 40).toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteSquad(squad.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {squads.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma composição de squad cadastrada ainda.</p>
            <p className="text-sm">Clique em "Nova Composição" para começar.</p>
          </div>
        )}

        <div className="bg-goias-light-green/20 p-4 rounded-lg border border-goias-green/20">
          <p className="text-sm text-goias-dark-green">
            <strong>Dica:</strong> Você pode aplicar composições padrão da CACTIC ou 
            personalizar conforme as necessidades específicas do órgão.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4SquadComposition;
