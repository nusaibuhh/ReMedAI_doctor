import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI medical assistant. I can help you evaluate medication choices based on patient data and provide recommendations. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getMockResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('lisinopril') && lowerInput.includes('amlodipine')) {
      return "Based on the patient's data, the combination of Lisinopril and Amlodipine is commonly used to treat hypertension. However, monitor blood pressure closely as both medications lower blood pressure and may cause hypotension. Recommended to start with lower doses and adjust as needed.";
    }
    
    if (lowerInput.includes('metformin')) {
      return "For patients with Type 2 Diabetes, Metformin is typically a first-line treatment. Ensure the patient has normal kidney function and remind them to take it with meals to minimize gastrointestinal side effects.";
    }
    
    if (lowerInput.includes('side effect') || lowerInput.includes('adverse')) {
      return "To properly assess side effects, please provide more specific information about the medication and the patient's symptoms. Include details about when the symptoms started and their severity.";
    }
    
    return "I understand you're asking about medication. To provide the most accurate recommendation, please include:\n1. The specific medication(s) in question\n2. Relevant patient history\n3. Any current symptoms or concerns";
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Medical Assistant</h1>
        <p className="mt-2 text-gray-600">
          Get AI-powered insights for medication decisions
        </p>
      </div>

      {/* Chat messages */}
      <div className="flex-1 card overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {message.sender === 'user' ? (
                  <FaUser className="w-4 h-4" />
                ) : (
                  <FaRobot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`flex-1 px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-primary-100'
                      : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="card">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="input flex-1"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!input.trim()}
          >
            <FaPaperPlane className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
} 