import React from "react";

import MessageItem from "./MessageItem";

const MessageList = ({
  messages,
  onEditMessage,
  onRemoveMessage,
  authUser
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        authUser={authUser}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default MessageList;
