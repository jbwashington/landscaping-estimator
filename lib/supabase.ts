import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      estimates: {
        Row: {
          id: string;
          user_id: string;
          address: string;
          polygon: number[][];
          square_footage: number;
          grass_length: string;
          obstacles: string;
          slope: string;
          access: string;
          estimate_low: number;
          estimate_high: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          address: string;
          polygon: number[][];
          square_footage: number;
          grass_length: string;
          obstacles: string;
          slope: string;
          access: string;
          estimate_low: number;
          estimate_high: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          address?: string;
          polygon?: number[][];
          square_footage?: number;
          grass_length?: string;
          obstacles?: string;
          slope?: string;
          access?: string;
          estimate_low?: number;
          estimate_high?: number;
          created_at?: string;
        };
      };
    };
  };
};
