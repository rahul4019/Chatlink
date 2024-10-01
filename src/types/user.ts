export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  profile_picture?: string;
  status_message?: string;
  is_online?: boolean;
  last_seen?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserSession {
  session_id: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
  created_at: string;
  last_active: string;
  ip_address?: string;
  user_agent?: string;
  is_valid: boolean;
}
