// src/ChatBot.js
import React, { useState } from 'react';
import { List, Input, Button } from 'antd';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    const question = { role: 'user', content: inputValue };

    const updatedMessages = [...messages, question]; // 先构造更新后的数组
    setMessages(updatedMessages);
    // 发送请求到后端API
    fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: updatedMessages }),
    })
    .then(response => response.json())
    .then(data => {
      // 假设后端返回的是一个包含所有消息的数组
      console.log(data);
      setMessages(messages => [...messages, { role: 'assistant', content: data.response }]);

    })
    .catch(error => console.error('Error:', error));

    setInputValue(''); // 清空输入框
  };

  return (
    <div>
      <List
        dataSource={messages}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.role === 'user' ? 'user' : 'assistant'}
              description={<ReactMarkdown children={item.content} />}
            />
          </List.Item>
        )}
      />
      <Input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onPressEnter={handleSend}
        placeholder="输入消息..."
        style={{ width: 'calc(100% - 100px)', marginRight: '10px' }}
      />
      <Button onClick={handleSend} type="primary">发送</Button>
    </div>
  );
};

export default ChatBot;
