export interface User {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
  statusMessage?: string;
  is_online?: boolean;
  last_seen?: Date;
}

export interface SelectedUser extends Omit<User, "email"> {
  isTyping: boolean;
}
