export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          acao: string
          created_at: string | null
          detalhes: Json | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          acao: string
          created_at?: string | null
          detalhes?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          acao?: string
          created_at?: string | null
          detalhes?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      api_usage: {
        Row: {
          created_at: string
          data_uso: string
          geocoding_requests: number
          id: string
          mapas_carregados: number
          rotas_criadas: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_uso?: string
          geocoding_requests?: number
          id?: string
          mapas_carregados?: number
          rotas_criadas?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_uso?: string
          geocoding_requests?: number
          id?: string
          mapas_carregados?: number
          rotas_criadas?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          cidade: string
          created_at: string
          dificuldades: string
          id: string
          nome: string
          profissao: string
        }
        Insert: {
          cidade: string
          created_at?: string
          dificuldades: string
          id?: string
          nome: string
          profissao: string
        }
        Update: {
          cidade?: string
          created_at?: string
          dificuldades?: string
          id?: string
          nome?: string
          profissao?: string
        }
        Relationships: []
      }
      geocoding_cache: {
        Row: {
          created_at: string
          endereco: string
          id: string
          latitude: number
          longitude: number
        }
        Insert: {
          created_at?: string
          endereco: string
          id?: string
          latitude: number
          longitude: number
        }
        Update: {
          created_at?: string
          endereco?: string
          id?: string
          latitude?: number
          longitude?: number
        }
        Relationships: []
      }
      otimizacoes: {
        Row: {
          created_at: string | null
          economia_distancia: number | null
          economia_tempo: number | null
          id: string
          rota_id: string
          rota_original: Json
          rota_otimizada: Json
          user_id: string
        }
        Insert: {
          created_at?: string | null
          economia_distancia?: number | null
          economia_tempo?: number | null
          id?: string
          rota_id: string
          rota_original: Json
          rota_otimizada: Json
          user_id: string
        }
        Update: {
          created_at?: string | null
          economia_distancia?: number | null
          economia_tempo?: number | null
          id?: string
          rota_id?: string
          rota_original?: Json
          rota_otimizada?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "otimizacoes_rota_id_fkey"
            columns: ["rota_id"]
            isOneToOne: false
            referencedRelation: "rotas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          email: string | null
          empresa: string | null
          id: string
          limite_rotas: number | null
          nome: string | null
          plano: string | null
          stripe_customer_id: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          email?: string | null
          empresa?: string | null
          id: string
          limite_rotas?: number | null
          nome?: string | null
          plano?: string | null
          stripe_customer_id?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          limite_rotas?: number | null
          nome?: string | null
          plano?: string | null
          stripe_customer_id?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rastreamento_publico: {
        Row: {
          created_at: string
          id: string
          link_publico: string
          posicao_atual: number | null
          rota_id: string
          status: string
          tempo_fim: string | null
          tempo_inicio: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          link_publico: string
          posicao_atual?: number | null
          rota_id: string
          status?: string
          tempo_fim?: string | null
          tempo_inicio?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          link_publico?: string
          posicao_atual?: number | null
          rota_id?: string
          status?: string
          tempo_fim?: string | null
          tempo_inicio?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rastreamento_publico_rota_id_fkey"
            columns: ["rota_id"]
            isOneToOne: false
            referencedRelation: "rotas"
            referencedColumns: ["id"]
          },
        ]
      }
      rotas: {
        Row: {
          coordenadas: Json | null
          criado_em: string
          distancia_total: number | null
          id: string
          nome: string | null
          otimizada: boolean | null
          paradas: Json
          status: string
          tempo_estimado: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          coordenadas?: Json | null
          criado_em?: string
          distancia_total?: number | null
          id?: string
          nome?: string | null
          otimizada?: boolean | null
          paradas: Json
          status?: string
          tempo_estimado?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          coordenadas?: Json | null
          criado_em?: string
          distancia_total?: number | null
          id?: string
          nome?: string | null
          otimizada?: boolean | null
          paradas?: Json
          status?: string
          tempo_estimado?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      route_cache: {
        Row: {
          created_at: string
          distancia_total: number | null
          hash_pontos: string
          id: string
          pontos: Json
          rota_otimizada: Json
          tempo_estimado: number | null
        }
        Insert: {
          created_at?: string
          distancia_total?: number | null
          hash_pontos: string
          id?: string
          pontos: Json
          rota_otimizada: Json
          tempo_estimado?: number | null
        }
        Update: {
          created_at?: string
          distancia_total?: number | null
          hash_pontos?: string
          id?: string
          pontos?: Json
          rota_otimizada?: Json
          tempo_estimado?: number | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          id: string
          limite_rotas: number
          nome: string
          preco: number
          recursos: Json
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          limite_rotas: number
          nome: string
          preco: number
          recursos: Json
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          id?: string
          limite_rotas?: number
          nome?: string
          preco?: number
          recursos?: Json
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assunto: string
          created_at: string | null
          id: string
          mensagem: string
          prioridade: string | null
          resposta: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assunto: string
          created_at?: string | null
          id?: string
          mensagem: string
          prioridade?: string | null
          resposta?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assunto?: string
          created_at?: string | null
          id?: string
          mensagem?: string
          prioridade?: string | null
          resposta?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          fuso_horario: string | null
          id: string
          idioma: string | null
          notificacoes_email: boolean | null
          tema: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          fuso_horario?: string | null
          id?: string
          idioma?: string | null
          notificacoes_email?: boolean | null
          tema?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          fuso_horario?: string | null
          id?: string
          idioma?: string | null
          notificacoes_email?: boolean | null
          tema?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_api_limit: {
        Args: { p_user_id: string; p_tipo: string }
        Returns: Json
      }
      increment_api_usage: {
        Args: { p_user_id: string; p_tipo: string; p_quantidade?: number }
        Returns: boolean
      }
      update_user_plan: {
        Args: {
          p_email: string
          p_plano?: string
          p_ativo?: boolean
          p_stripe_customer_id?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
