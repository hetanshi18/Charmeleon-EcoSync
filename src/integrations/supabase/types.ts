export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      brand_profiles: {
        Row: {
          brand_name: string
          business_registration: string | null
          carbon_neutral: boolean | null
          certifications: Json | null
          created_at: string | null
          description: string | null
          id: number
          sustainability_report_url: string | null
          user_id: string
          verification_documents: Json | null
          verification_status: string | null
          verified_at: string | null
          website_url: string | null
        }
        Insert: {
          brand_name: string
          business_registration?: string | null
          carbon_neutral?: boolean | null
          certifications?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          sustainability_report_url?: string | null
          user_id: string
          verification_documents?: Json | null
          verification_status?: string | null
          verified_at?: string | null
          website_url?: string | null
        }
        Update: {
          brand_name?: string
          business_registration?: string | null
          carbon_neutral?: boolean | null
          certifications?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          sustainability_report_url?: string | null
          user_id?: string
          verification_documents?: Json | null
          verification_status?: string | null
          verified_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brand_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: number
          name: string
          parent_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: number
          name: string
          parent_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: number
          name?: string
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          comment_text: string
          created_at: string | null
          id: number
          listing_id: number
          parent_comment_id: number | null
          user_id: string
        }
        Insert: {
          comment_text: string
          created_at?: string | null
          id?: number
          listing_id: number
          parent_comment_id?: number | null
          user_id: string
        }
        Update: {
          comment_text?: string
          created_at?: string | null
          id?: number
          listing_id?: number
          parent_comment_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: number
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: number
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      home_businesses: {
        Row: {
          business_name: string
          business_registration: string | null
          created_at: string
          description: string | null
          id: number
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          business_name: string
          business_registration?: string | null
          created_at?: string
          description?: string | null
          id?: number
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          business_name?: string
          business_registration?: string | null
          created_at?: string
          description?: string | null
          id?: number
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "home_businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "home_businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lca_data: {
        Row: {
          Brand_Name: string | null
          Carbon_Footprint_kg: number | null
          Category: string | null
          Disposal_Score: number | null
          Manufacturing_Score: number | null
          Price: number | null
          Product_ID: string | null
          Product_Name: string | null
          Raw_Materials: string | null
          Raw_Materials_Score: number | null
          Total_Impact_Score: number | null
          Transportation_Score: number | null
          Usage_Score: number | null
          Views: number | null
          Water_Footprint_L: number | null
        }
        Insert: {
          Brand_Name?: string | null
          Carbon_Footprint_kg?: number | null
          Category?: string | null
          Disposal_Score?: number | null
          Manufacturing_Score?: number | null
          Price?: number | null
          Product_ID?: string | null
          Product_Name?: string | null
          Raw_Materials?: string | null
          Raw_Materials_Score?: number | null
          Total_Impact_Score?: number | null
          Transportation_Score?: number | null
          Usage_Score?: number | null
          Views?: number | null
          Water_Footprint_L?: number | null
        }
        Update: {
          Brand_Name?: string | null
          Carbon_Footprint_kg?: number | null
          Category?: string | null
          Disposal_Score?: number | null
          Manufacturing_Score?: number | null
          Price?: number | null
          Product_ID?: string | null
          Product_Name?: string | null
          Raw_Materials?: string | null
          Raw_Materials_Score?: number | null
          Total_Impact_Score?: number | null
          Transportation_Score?: number | null
          Usage_Score?: number | null
          Views?: number | null
          Water_Footprint_L?: number | null
        }
        Relationships: []
      }
      listing_interactions: {
        Row: {
          created_at: string | null
          id: number
          interaction_type: string
          listing_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          interaction_type: string
          listing_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          interaction_type?: string
          listing_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_interactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_interactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          business_id: number | null
          carbon_saved_kg: number | null
          category_id: number | null
          condition: string | null
          created_at: string | null
          delivery_available: boolean | null
          delivery_radius_km: number | null
          description: string
          eco_certifications: Json | null
          id: number
          images: Json | null
          is_available: boolean | null
          likes_count: number | null
          listing_type: string
          pickup_address: string | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          price: number
          seller_id: string
          status: string | null
          stock_quantity: number | null
          sustainability_attributes: Json | null
          sustainability_score: number | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          business_id?: number | null
          carbon_saved_kg?: number | null
          category_id?: number | null
          condition?: string | null
          created_at?: string | null
          delivery_available?: boolean | null
          delivery_radius_km?: number | null
          description: string
          eco_certifications?: Json | null
          id?: number
          images?: Json | null
          is_available?: boolean | null
          likes_count?: number | null
          listing_type: string
          pickup_address?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          price: number
          seller_id: string
          status?: string | null
          stock_quantity?: number | null
          sustainability_attributes?: Json | null
          sustainability_score?: number | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          business_id?: number | null
          carbon_saved_kg?: number | null
          category_id?: number | null
          condition?: string | null
          created_at?: string | null
          delivery_available?: boolean | null
          delivery_radius_km?: number | null
          description?: string
          eco_certifications?: Json | null
          id?: number
          images?: Json | null
          is_available?: boolean | null
          likes_count?: number | null
          listing_type?: string
          pickup_address?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          price?: number
          seller_id?: string
          status?: string | null
          stock_quantity?: number | null
          sustainability_attributes?: Json | null
          sustainability_score?: number | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "home_businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          is_read: boolean | null
          message: string
          notification_type: string
          reference_id: number | null
          reference_type: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message: string
          notification_type: string
          reference_id?: number | null
          reference_type?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message?: string
          notification_type?: string
          reference_id?: number | null
          reference_type?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string | null
          id: number
          listing_id: number
          rating: number
          review_text: string | null
          reviewed_user_id: string
          reviewer_id: string
          sustainability_rating: number | null
          transaction_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          listing_id: number
          rating: number
          review_text?: string | null
          reviewed_user_id: string
          reviewer_id: string
          sustainability_rating?: number | null
          transaction_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          listing_id?: number
          rating?: number
          review_text?: string | null
          reviewed_user_id?: string
          reviewer_id?: string
          sustainability_rating?: number | null
          transaction_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_user_id_fkey"
            columns: ["reviewed_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_user_id_fkey"
            columns: ["reviewed_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          created_at: string | null
          id: number
          notification_enabled: boolean | null
          search_filters: Json
          search_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          notification_enabled?: boolean | null
          search_filters: Json
          search_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          notification_enabled?: boolean | null
          search_filters?: Json
          search_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          buyer_id: string
          carbon_impact_saved: number | null
          completed_at: string | null
          created_at: string | null
          delivery_method: string | null
          id: number
          listing_id: number
          payment_method: string | null
          quantity: number
          seller_id: string
          status: string | null
          total_amount: number
          unit_price: number
        }
        Insert: {
          buyer_id: string
          carbon_impact_saved?: number | null
          completed_at?: string | null
          created_at?: string | null
          delivery_method?: string | null
          id?: number
          listing_id: number
          payment_method?: string | null
          quantity?: number
          seller_id: string
          status?: string | null
          total_amount: number
          unit_price: number
        }
        Update: {
          buyer_id?: string
          carbon_impact_saved?: number | null
          completed_at?: string | null
          created_at?: string | null
          delivery_method?: string | null
          id?: number
          listing_id?: number
          payment_method?: string | null
          quantity?: number
          seller_id?: string
          status?: string | null
          total_amount?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "active_marketplace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          pincode: string | null
          state: string | null
          sustainability_score: number | null
          updated_at: string | null
          user_type: string | null
          username: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          pincode?: string | null
          state?: string | null
          sustainability_score?: number | null
          updated_at?: string | null
          user_type?: string | null
          username: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          pincode?: string | null
          state?: string | null
          sustainability_score?: number | null
          updated_at?: string | null
          user_type?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_marketplace: {
        Row: {
          carbon_saved_kg: number | null
          category_id: number | null
          category_name: string | null
          comment_count: number | null
          condition: string | null
          created_at: string | null
          delivery_available: boolean | null
          delivery_radius_km: number | null
          description: string | null
          eco_certifications: Json | null
          id: number | null
          images: Json | null
          is_available: boolean | null
          likes_count: number | null
          listing_type: string | null
          pickup_address: string | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          price: number | null
          seller_avatar: string | null
          seller_id: string | null
          seller_name: string | null
          seller_sustainability_score: number | null
          seller_username: string | null
          seller_verified: boolean | null
          status: string | null
          stock_quantity: number | null
          sustainability_attributes: Json | null
          sustainability_score: number | null
          title: string | null
          total_likes: number | null
          updated_at: string | null
          views_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user_profiles_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles_summary: {
        Row: {
          active_listings: number | null
          address: string | null
          avatar_url: string | null
          average_rating: number | null
          city: string | null
          created_at: string | null
          email: string | null
          followers_count: number | null
          following_count: number | null
          full_name: string | null
          id: string | null
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          pincode: string | null
          purchases_made: number | null
          sales_completed: number | null
          state: string | null
          sustainability_score: number | null
          total_reviews: number | null
          updated_at: string | null
          user_type: string | null
          username: string | null
        }
        Insert: {
          active_listings?: never
          address?: string | null
          avatar_url?: string | null
          average_rating?: never
          city?: string | null
          created_at?: string | null
          email?: string | null
          followers_count?: never
          following_count?: never
          full_name?: string | null
          id?: string | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          pincode?: string | null
          purchases_made?: never
          sales_completed?: never
          state?: string | null
          sustainability_score?: number | null
          total_reviews?: never
          updated_at?: string | null
          user_type?: string | null
          username?: string | null
        }
        Update: {
          active_listings?: never
          address?: string | null
          avatar_url?: string | null
          average_rating?: never
          city?: string | null
          created_at?: string | null
          email?: string | null
          followers_count?: never
          following_count?: never
          full_name?: string | null
          id?: string | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          pincode?: string | null
          purchases_made?: never
          sales_completed?: never
          state?: string | null
          sustainability_score?: number | null
          total_reviews?: never
          updated_at?: string | null
          user_type?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      search_listings: {
        Args: {
          category_filter?: number
          limit_count?: number
          listing_type_filter?: string
          max_distance_km?: number
          max_price?: number
          min_price?: number
          min_sustainability_score?: number
          offset_count?: number
          search_query?: string
          sort_by?: string
          sort_order?: string
          user_latitude?: number
          user_longitude?: number
        }
        Returns: {
          distance_km: number
          listing_id: number
          price: number
          seller_username: string
          sustainability_score: number
          title: string
        }[]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
