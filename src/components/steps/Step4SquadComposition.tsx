import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { ProfessionalProfile, SquadComposition } from '@/types/calculator';

interface Step4SquadCompositionProps {
  profiles: ProfessionalProfile[];
  selectedProfileIds: string[];
  squads: SquadComposition[];
  onToggleProfileSelection: (profileId: string) => void;
  onSelectAllProfiles: () => void;
  onDeselectAllProfiles: () => void;
  onAddSquadComposition: (squad: Omit<SquadComposition, 'id'>) => void;
  onUpdateSquadComposition: (id: string, squad: Partial<SquadComposition>) => void;
  onDeleteSquadComposition: (id: string) => void;
}

const Step4SquadComposition: React.FC<Step4SquadCompositionProps> = ({
  profiles,
  selectedProfileIds,
  squads,
  onToggleProfileSelection,
  onSelectAllProfiles,
  onDeselectAllProfiles,
  onAddSquadComposition,
  onUpdateSquadComposition,
  onDeleteSquadComposition
}) => {
  const selectedProfiles = profiles.filter(profile => 
    selectedProfileIds.includes(profile.id)
  );

  const getProfileSquad = (profileId: string) => {
    return squads.find(squad => squad.profileId === profileId);
  };

  const handleQuantityChange = (profileId: string, quantity: number) => {
    const existingSquad = getProfileSquad(profileId);
    
    if (quantity <= 0) {
      if (existingSquad) {
        onDeleteSquadComposition(existingSquad.id);
      }
      return;
    }

    if (existingSquad) {
      onUpdateSquadComposition(existingSquad.id, { quantity });
    } else {
      onAddSquadComposition({
        profileId,
        quantity,
        type: 'projeto',
        complexity: 'media'
      });
    }
  };

  const increaseQuantity = (profileId: string) => {
    const existingSquad = getProfileSquad(profileId);
    const currentQuantity = existingSquad?.quantity || 0;
    handleQuantityChange(profileId, currentQuantity + 1);
  };

  const decreaseQuantity = (profileId: string) => {
    const existingSquad = getProfileSquad(profileId);
    const currentQuantity = existingSquad?.quantity || 0;
    if (currentQuantity > 0) {
      handleQuantityChange(profileId, currentQuantity - 1);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 04 - Composição de Squad</CardTitle>
        <CardDescription className="text-gray-100">
          Defina a quantidade de cada perfil profissional para sua iniciativa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Seleção de Perfis */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-emerald-700">
              Perfis Disponíveis ({profiles.length})
            </h3>
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
                className="border-gray-400 text-gray-600 hover:bg-gray-50"
              >
                Limpar Seleção
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => {
              const isSelected = selectedProfileIds.includes(profile.id);
              return (
                <Card 
                  key={profile.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-md' 
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                  onClick={() => onToggleProfileSelection(profile.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm leading-tight">
                        {profile.name}
                      </h4>
                      {isSelected && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Selecionado
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">
                      FCP: {profile.fcp}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Configuração de Quantidades */}
        {selectedProfiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-emerald-700">
              Configuração de Quantidades
            </h3>
            <p className="text-sm text-gray-600">
              Defina quantos profissionais de cada perfil você precisa em sua iniciativa.
            </p>

            <div className="space-y-4">
              {selectedProfiles.map((profile) => {
                const squad = getProfileSquad(profile.id);
                const quantity = squad?.quantity || 0;

                return (
                  <Card key={profile.id} className="border-emerald-200">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-emerald-700 mb-1">
                            {profile.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            FCP: {profile.fcp} | UST por pessoa/semana: {(profile.fcp * 40).toFixed(0)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Label htmlFor={`quantity-${profile.id}`} className="text-sm font-medium">
                            Quantidade:
                          </Label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => decreaseQuantity(profile.id)}
                              disabled={quantity <= 0}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              id={`quantity-${profile.id}`}
                              type="number"
                              min="0"
                              value={quantity}
                              onChange={(e) => handleQuantityChange(profile.id, parseInt(e.target.value) || 0)}
                              className="w-20 text-center border-emerald-200 focus:border-emerald-600"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => increaseQuantity(profile.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {quantity > 0 && (
                        <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div>
                              <span className="text-gray-600">Total UST/semana:</span>
                              <p className="font-medium text-emerald-700">
                                {(quantity * profile.fcp * 40).toFixed(0)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Valor/semana:</span>
                              <p className="font-medium text-emerald-700">
                                R$ {(quantity * profile.fcp * 40 * 70).toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Pessoas:</span>
                              <p className="font-medium text-emerald-700">{quantity}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">FCP:</span>
                              <p className="font-medium text-emerald-700">{profile.fcp}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {selectedProfiles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum perfil selecionado ainda.</p>
            <p className="text-sm">Selecione os perfis acima para configurar as quantidades.</p>
          </div>
        )}

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <h4 className="font-medium text-emerald-800 mb-2">Instruções:</h4>
          <ul className="text-sm text-emerald-800 space-y-1">
            <li>• Selecione os perfis profissionais necessários para sua iniciativa</li>
            <li>• Defina a quantidade de pessoas para cada perfil selecionado</li>
            <li>• O cálculo UST será feito automaticamente: Quantidade × FCP × 40 horas</li>
            <li>• Use os botões + e - ou digite diretamente a quantidade desejada</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4SquadComposition;