import React, { useState } from "react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]); // Store the conversation
  const [inputText, setInputText] = useState(""); // Input text for the question

  // Function to handle input submission
  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    // Add client message to the chat window
    const newMessages = [...messages, { sender: "client", text: inputText }];
    setMessages(newMessages);

    try {
      const response = await fetch("http://localhost:5001/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: inputText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

    const data = await response.json();
    setMessages([...newMessages, { sender: "server", text: data.answer }]);
  } catch (error) {
    console.error("Error fetching response:", error);
  }
  
  setInputText(""); // Clear the input field
};

  // Handling 'Enter' key for sending message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "client" ? "client-message" : "server-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
