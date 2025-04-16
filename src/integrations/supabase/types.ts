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
      companies: {
        Row: {
          address: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          nickname: string | null
          office_email: string | null
          office_phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          nickname?: string | null
          office_email?: string | null
          office_phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          nickname?: string | null
          office_email?: string | null
          office_phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customer_disputes: {
        Row: {
          created_at: string | null
          created_by: string | null
          customer_id: string
          description: string
          document_id: string | null
          id: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          description: string
          document_id?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          description?: string
          document_id?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_disputes_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "customer_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_documents: {
        Row: {
          created_at: string | null
          created_by: string | null
          customer_id: string
          file_path: string
          file_type: string
          id: string
          name: string
          size: number
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          file_path: string
          file_type: string
          id?: string
          name: string
          size: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          file_path?: string
          file_type?: string
          id?: string
          name?: string
          size?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      customer_quotes: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string | null
          customer_id: string
          description: string | null
          id: string
          status: string
          title: string
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          description?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string | null
          valid_until?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      delivery_certificates: {
        Row: {
          created_at: string | null
          customer: string
          date: string
          id: string
          materials: string | null
          operator: string
          pdf_url: string | null
          quantity: string | null
          service_call_id: string | null
          service_details: string
          service_hours: number
          signature_data: string | null
          signature_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer: string
          date: string
          id: string
          materials?: string | null
          operator: string
          pdf_url?: string | null
          quantity?: string | null
          service_call_id?: string | null
          service_details: string
          service_hours?: number
          signature_data?: string | null
          signature_type?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer?: string
          date?: string
          id?: string
          materials?: string | null
          operator?: string
          pdf_url?: string | null
          quantity?: string | null
          service_call_id?: string | null
          service_details?: string
          service_hours?: number
          signature_data?: string | null
          signature_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_certificates_service_call_id_fkey"
            columns: ["service_call_id"]
            isOneToOne: false
            referencedRelation: "service_calls"
            referencedColumns: ["id"]
          },
        ]
      }
      dispute_messages: {
        Row: {
          created_at: string | null
          created_by: string | null
          dispute_id: string | null
          id: string
          is_read: boolean | null
          message: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          dispute_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          dispute_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispute_messages_dispute_id_fkey"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "customer_disputes"
            referencedColumns: ["id"]
          },
        ]
      }
      global_settings: {
        Row: {
          created_at: string | null
          default_language: string
          description: string | null
          email_notifications: boolean
          id: string
          logo_url: string | null
          maintenance_mode: boolean | null
          password_reset_frequency: string
          platform_name: string
          privacy_url: string | null
          push_notifications: boolean
          support_email: string | null
          terms_url: string | null
          two_factor_auth: boolean
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_language?: string
          description?: string | null
          email_notifications?: boolean
          id?: string
          logo_url?: string | null
          maintenance_mode?: boolean | null
          password_reset_frequency?: string
          platform_name?: string
          privacy_url?: string | null
          push_notifications?: boolean
          support_email?: string | null
          terms_url?: string | null
          two_factor_auth?: boolean
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_language?: string
          description?: string | null
          email_notifications?: boolean
          id?: string
          logo_url?: string | null
          maintenance_mode?: boolean | null
          password_reset_frequency?: string
          platform_name?: string
          privacy_url?: string | null
          push_notifications?: boolean
          support_email?: string | null
          terms_url?: string | null
          two_factor_auth?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_contact_person: boolean | null
          phone: string | null
          position: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_contact_person?: boolean | null
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_contact_person?: boolean | null
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      service_calls: {
        Row: {
          crane_size: string | null
          created_at: string | null
          customer: string
          date: string
          delivery_certificate_id: string | null
          general_equipment: string | null
          hourly_booking: number | null
          id: string
          notes: string | null
          operator: string
          project_site: string
          pump_type: string | null
          quantity: string | null
          service_type: string
          start_time: string
          status: string
          updated_at: string | null
          vehicle_number: string | null
          vehicle_type: string | null
        }
        Insert: {
          crane_size?: string | null
          created_at?: string | null
          customer: string
          date: string
          delivery_certificate_id?: string | null
          general_equipment?: string | null
          hourly_booking?: number | null
          id: string
          notes?: string | null
          operator: string
          project_site: string
          pump_type?: string | null
          quantity?: string | null
          service_type: string
          start_time: string
          status?: string
          updated_at?: string | null
          vehicle_number?: string | null
          vehicle_type?: string | null
        }
        Update: {
          crane_size?: string | null
          created_at?: string | null
          customer?: string
          date?: string
          delivery_certificate_id?: string | null
          general_equipment?: string | null
          hourly_booking?: number | null
          id?: string
          notes?: string | null
          operator?: string
          project_site?: string
          pump_type?: string | null
          quantity?: string | null
          service_type?: string
          start_time?: string
          status?: string
          updated_at?: string | null
          vehicle_number?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_save: boolean | null
          created_at: string | null
          id: string
          language: string | null
          notifications: boolean | null
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          auto_save?: boolean | null
          created_at?: string | null
          id: string
          language?: string | null
          notifications?: boolean | null
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_save?: boolean | null
          created_at?: string | null
          id?: string
          language?: string | null
          notifications?: boolean | null
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
