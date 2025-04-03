export interface FormData {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at?: Date;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
} 