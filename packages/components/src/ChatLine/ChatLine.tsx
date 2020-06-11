import React from 'react';
import { Chat } from '../types';

interface ChatLineProps {
  chat: Chat;
}

export const ChatLine: React.FC<ChatLineProps> = ({ chat }) => {
  return (
    <div>
      <img src={chat.avatar} width={32} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{chat.name}</span>
        <span>{chat.userCount}</span>
      </div>
    </div>
  );
};
