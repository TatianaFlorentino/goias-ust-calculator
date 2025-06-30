-- Criar tabela para projetos
CREATE TABLE public.projetos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nome TEXT NOT NULL,
  tipo_projeto TEXT NOT NULL, -- 'desenvolvimento', 'manutencao', 'consultoria'
  complexidade TEXT NOT NULL, -- 'baixa', 'media', 'alta'
  duracao_meses INTEGER NOT NULL DEFAULT 12,
  descricao TEXT,
  status TEXT NOT NULL DEFAULT 'rascunho', -- 'rascunho', 'finalizado', 'aprovado'
  total_horas INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para perfis profissionais padrão CACTIC
CREATE TABLE public.perfis_profissionais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE, -- 'GP', 'AS', 'AN', 'DS', 'PR', 'TS', 'TI'
  nome TEXT NOT NULL,
  descricao TEXT,
  horas_mes_padrao INTEGER NOT NULL,
  nivel_senioridade TEXT NOT NULL, -- 'junior', 'pleno', 'senior'
  categoria TEXT NOT NULL, -- 'gestao', 'analise', 'desenvolvimento', 'teste', 'infraestrutura'
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para squads de projetos
CREATE TABLE public.squads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  projeto_id UUID NOT NULL REFERENCES public.projetos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL, -- 'desenvolvimento', 'sustentacao', 'infraestrutura'
  percentual_dedicacao INTEGER NOT NULL DEFAULT 100,
  periodo_inicio INTEGER NOT NULL DEFAULT 1, -- mês de início
  periodo_fim INTEGER NOT NULL DEFAULT 12, -- mês de fim
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para membros dos squads
CREATE TABLE public.squad_membros (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  squad_id UUID NOT NULL REFERENCES public.squads(id) ON DELETE CASCADE,
  perfil_id UUID NOT NULL REFERENCES public.perfis_profissionais(id),
  quantidade INTEGER NOT NULL DEFAULT 1,
  horas_mes INTEGER NOT NULL,
  percentual_dedicacao INTEGER NOT NULL DEFAULT 100,
  periodo_inicio INTEGER NOT NULL DEFAULT 1,
  periodo_fim INTEGER NOT NULL DEFAULT 12,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para configurações de complexidade por tipo de projeto
CREATE TABLE public.configuracoes_complexidade (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo_projeto TEXT NOT NULL,
  complexidade TEXT NOT NULL,
  multiplicador_horas DECIMAL(3,2) NOT NULL DEFAULT 1.0,
  squad_minimo INTEGER NOT NULL DEFAULT 1,
  squad_maximo INTEGER NOT NULL DEFAULT 5,
  perfis_obrigatorios TEXT[], -- array de códigos de perfis obrigatórios
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tipo_projeto, complexidade)
);

-- Criar tabela para histórico de cálculos
CREATE TABLE public.calculos_historico (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  projeto_id UUID NOT NULL REFERENCES public.projetos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  total_horas INTEGER NOT NULL,
  total_squads INTEGER NOT NULL,
  total_membros INTEGER NOT NULL,
  detalhes_calculo JSONB NOT NULL, -- JSON com breakdown detalhado
  versao_calculo INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfis_profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squad_membros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes_complexidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculos_historico ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para projetos
CREATE POLICY "Usuários podem ver seus próprios projetos" 
ON public.projetos 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios projetos" 
ON public.projetos 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios projetos" 
ON public.projetos 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios projetos" 
ON public.projetos 
FOR DELETE 
USING (auth.uid() = user_id);

-- Políticas RLS para perfis profissionais (público para leitura)
CREATE POLICY "Perfis profissionais são públicos para leitura" 
ON public.perfis_profissionais 
FOR SELECT 
USING (true);

-- Políticas RLS para squads
CREATE POLICY "Usuários podem ver squads de seus projetos" 
ON public.squads 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.projetos 
  WHERE projetos.id = squads.projeto_id 
  AND projetos.user_id = auth.uid()
));

CREATE POLICY "Usuários podem criar squads em seus projetos" 
ON public.squads 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.projetos 
  WHERE projetos.id = squads.projeto_id 
  AND projetos.user_id = auth.uid()
));

CREATE POLICY "Usuários podem atualizar squads de seus projetos" 
ON public.squads 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.projetos 
  WHERE projetos.id = squads.projeto_id 
  AND projetos.user_id = auth.uid()
));

CREATE POLICY "Usuários podem deletar squads de seus projetos" 
ON public.squads 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.projetos 
  WHERE projetos.id = squads.projeto_id 
  AND projetos.user_id = auth.uid()
));

-- Políticas RLS para membros de squads
CREATE POLICY "Usuários podem ver membros de squads de seus projetos" 
ON public.squad_membros 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.squads s
  JOIN public.projetos p ON p.id = s.projeto_id
  WHERE s.id = squad_membros.squad_id 
  AND p.user_id = auth.uid()
));

CREATE POLICY "Usuários podem criar membros em squads de seus projetos" 
ON public.squad_membros 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.squads s
  JOIN public.projetos p ON p.id = s.projeto_id
  WHERE s.id = squad_membros.squad_id 
  AND p.user_id = auth.uid()
));

CREATE POLICY "Usuários podem atualizar membros de squads de seus projetos" 
ON public.squad_membros 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.squads s
  JOIN public.projetos p ON p.id = s.projeto_id
  WHERE s.id = squad_membros.squad_id 
  AND p.user_id = auth.uid()
));

CREATE POLICY "Usuários podem deletar membros de squads de seus projetos" 
ON public.squad_membros 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.squads s
  JOIN public.projetos p ON p.id = s.projeto_id
  WHERE s.id = squad_membros.squad_id 
  AND p.user_id = auth.uid()
));

-- Políticas RLS para configurações de complexidade (público para leitura)
CREATE POLICY "Configurações de complexidade são públicas para leitura" 
ON public.configuracoes_complexidade 
FOR SELECT 
USING (true);

-- Políticas RLS para histórico de cálculos
CREATE POLICY "Usuários podem ver seu próprio histórico" 
ON public.calculos_historico 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seu próprio histórico" 
ON public.calculos_historico 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Inserir perfis profissionais padrão CACTIC
INSERT INTO public.perfis_profissionais (codigo, nome, descricao, horas_mes_padrao, nivel_senioridade, categoria) VALUES
('GP', 'Gerente de Projeto', 'Responsável pelo gerenciamento geral do projeto', 160, 'senior', 'gestao'),
('AS', 'Analista de Sistemas', 'Analista responsável por levantamento de requisitos e análise', 160, 'pleno', 'analise'),
('AN', 'Analista de Negócios', 'Especialista em processos de negócio e requisitos', 160, 'pleno', 'analise'),
('DS', 'Desenvolvedor Senior', 'Desenvolvedor com experiência avançada', 160, 'senior', 'desenvolvimento'),
('PR', 'Programador', 'Desenvolvedor responsável pela codificação', 160, 'pleno', 'desenvolvimento'),
('TS', 'Testador Senior', 'Especialista em testes e qualidade de software', 160, 'senior', 'teste'),
('TI', 'Técnico em Informática', 'Suporte técnico e infraestrutura', 160, 'junior', 'infraestrutura');

-- Inserir configurações de complexidade padrão
INSERT INTO public.configuracoes_complexidade (tipo_projeto, complexidade, multiplicador_horas, squad_minimo, squad_maximo, perfis_obrigatorios) VALUES
('desenvolvimento', 'baixa', 1.0, 1, 3, ARRAY['GP', 'AS', 'PR']),
('desenvolvimento', 'media', 1.5, 2, 4, ARRAY['GP', 'AS', 'DS', 'PR', 'TS']),
('desenvolvimento', 'alta', 2.0, 3, 6, ARRAY['GP', 'AS', 'AN', 'DS', 'PR', 'TS', 'TI']),
('manutencao', 'baixa', 0.8, 1, 2, ARRAY['AS', 'PR']),
('manutencao', 'media', 1.2, 1, 3, ARRAY['GP', 'AS', 'DS', 'TS']),
('manutencao', 'alta', 1.8, 2, 4, ARRAY['GP', 'AS', 'DS', 'PR', 'TS']),
('consultoria', 'baixa', 1.0, 1, 2, ARRAY['AS', 'AN']),
('consultoria', 'media', 1.3, 1, 3, ARRAY['GP', 'AS', 'AN']),
('consultoria', 'alta', 1.6, 2, 4, ARRAY['GP', 'AS', 'AN', 'DS']);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_projetos_updated_at
  BEFORE UPDATE ON public.projetos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_squads_updated_at
  BEFORE UPDATE ON public.squads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_squad_membros_updated_at
  BEFORE UPDATE ON public.squad_membros
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();