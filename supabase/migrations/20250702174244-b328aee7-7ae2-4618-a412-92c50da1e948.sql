-- Remover tabelas da calculadora UST/CACTIC

-- Remover tabelas com foreign keys primeiro
DROP TABLE IF EXISTS public.calculos_historico CASCADE;
DROP TABLE IF EXISTS public.squad_membros CASCADE;
DROP TABLE IF EXISTS public.squads CASCADE;

-- Remover tabelas sem foreign keys
DROP TABLE IF EXISTS public.configuracoes_complexidade CASCADE;
DROP TABLE IF EXISTS public.perfis_profissionais CASCADE;
DROP TABLE IF EXISTS public.projetos CASCADE;

-- Remover função se não for mais necessária
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;