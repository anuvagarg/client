// client/src/components/Chat/index.js
import React, { useEffect, useState, useCallback } from 'react';
import { Input, Button, Container, Row, Col, Collapse } from 'reactstrap';
import '../../index.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [oldSessions, setOldSessions] = useState([{ id: 1, name: "Session 1" }, { id: 2, name: "Session 2" }]);
  const [activeSession, setActiveSession] = useState(null);
  const [showSessions, setShowSessions] = useState(false); // Toggle for old sessions visibility

  const sendMessage = async (user, sessionId, message) => {
    const response = await fetch('http://localhost:1337/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, sessionId, message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data; // Return the created message data
  };

  const getMessages = async (sessionId) => {
    const response = await fetch(`http://localhost:1337/messages?sessionId=${sessionId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve messages');
    }

    const data = await response.json();
    return data; // Return the list of messages
  };

  const fetchMessages = useCallback(async (sessionId) => {
    try {
      const messages = await getMessages(sessionId);
      setChatHistory(messages); // Set chat history with fetched messages
    } catch (error) {
      console.error(error);
    }
  }, []); // Empty dependency array since it doesn't depend on props/state

  useEffect(() => {
    if (activeSession) {
      fetchMessages(activeSession);
    }
  }, [activeSession, fetchMessages]); // Include fetchMessages in the dependency array

  const handleSendMessage = async () => {
    try {
      const messageData = await sendMessage('currentUser', activeSession, message);
      setChatHistory((prev) => [...prev, messageData]);
      setMessage(''); // Clear input
    } catch (error) {
      console.error(error);
    }
  };

  const switchSession = (sessionId) => {
    setActiveSession(sessionId);
    setChatHistory([]); // Clear chat history when switching sessions
    setShowSessions(false); // Hide sessions when switching
  };

  const createNewChat = () => {
    const newSessionId = oldSessions.length + 1; // Example logic for a new session ID
    setOldSessions([...oldSessions, { id: newSessionId, name: `Session ${newSessionId}` }]);
    setActiveSession(newSessionId); // Set the new session as active
    setChatHistory([]); // Clear chat history for the new session
    setShowSessions(false); // Hide sessions
  };

  return (
    <Container fluid className="chat-container">
      <Button className="hamburger" onClick={() => setShowSessions(!showSessions)}>
         ☰ {/* Hamburger icon */}
      </Button>
      <Collapse isOpen={showSessions}>
        <div className="session-list">
          <Button className="create-chat-btn" onClick={createNewChat}>
            Create New Chat
          </Button>
          {oldSessions.map((session) => (
            <div 
              key={session.id} 
              className={`session-item ${activeSession === session.id ? 'active' : ''}`}
              onClick={() => switchSession(session.id)}
            >
              {session.name}
            </div>
          ))}
        </div>
      </Collapse>
      <Row className="chat-box">
        <Col>
          <div className="chat-messages">
            {chatHistory.map((msg, index) => (
              <div key={index} className="chat-message">
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <div className="input-group">
            <Input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button className="btn btn-primary" onClick={handleSendMessage}>Send</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
