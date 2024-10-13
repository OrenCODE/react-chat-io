import React from 'react';
import Avatar from '../components/Avatar.tsx';
import {UserInfo} from "../utils/sliceHelpers.ts";

export type Message = {
  type: 'text' | 'voice';
  text?: string;
  voiceData?: Blob;
  senderId: string;
  senderName: string;
  timestamp: number;
}

type ChatFeedProps = {
  messages: Message[];
  userInfo: UserInfo;
}

const ChatFeed: React.FC<ChatFeedProps> = ({messages, userInfo}) => {

  const messageSender = (message: Message) => {
    if (userInfo) {
      return message.senderId === userInfo.id ? 'user' : 'remoteUser';
    }
    return 'remoteUser';
  };

  return (
    <div className="message-feed">
      {messages
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((message, index) => (
          <div className="message-wrapper" key={index}>
            {message.senderId !== 'system' && (
              <>
                <Avatar name={message.senderName} />
                <div className={`message ${messageSender(message)}`}>
                  {message.type === 'text' ? message.text : message.voiceData ? (
                    <audio controls>
                      <source src={URL.createObjectURL(message?.voiceData)} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : null}
                </div>
              </>
            )}
            {message.senderId === 'system' && (
              <div className="welcome-message">
                <span>{message.text}</span>
              </div>
            )}
            {message.senderId !== 'system' && (
              <span className="message-timestamp">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
            )}
          </div>
        ))}
    </div>
  );
};

export default ChatFeed;
