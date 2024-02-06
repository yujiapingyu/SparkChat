// src/ChatBot.js
import React, { useEffect, useState } from 'react';
import { List, Input, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css'

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    
  }, []);

  const handleSend = () => {
    const question = { role: 'user', content: inputValue };

    const updatedMessages = [...messages, question]; // 先构造更新后的数组
    setMessages(updatedMessages);
    // 发送请求到后端API
    fetch('http://47.97.117.242:5000/chat', {
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
    <div className="chat-container">
      <div className="message-list">
        <List
          dataSource={messages}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.role === 'user' ? 'user' : 'assistant'}
                description={<ReactMarkdown>{item.content}</ReactMarkdown>}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="input-section">
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={handleSend}
          placeholder="输入消息...[Developed by Yujiaping. Using Xunfei Spark API.]"
          style={{ width: 'calc(100% - 100px)', marginRight: '10px' }}
        />
        <Button onClick={handleSend} type="primary">发送</Button>
      </div>
    </div>
  );
};

export default ChatBot;
