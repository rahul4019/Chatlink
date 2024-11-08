export interface LatestChat {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  sent_at: Date;
  is_delete: boolean;
  username: string;
  profile_picture: string;
  user_id: string;
}

export interface Message {
  id: 23;
  is_deleted: false;
  message_text: string;
  receiver_id: string;
  sender_id: string;
  sent_at: Date;
}
