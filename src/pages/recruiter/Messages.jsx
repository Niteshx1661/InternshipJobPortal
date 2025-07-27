import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Info,
  Star,
  Circle
} from 'lucide-react';

const RecruiterMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CS Student at Stanford',
      avatar: '👩‍🎓',
      lastMessage: 'Thank you for considering my application. I\'m very interested in the position.',
      timestamp: '5 min ago',
      unread: true,
      online: true,
      jobTitle: 'Software Engineer Intern'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineering Student',
      avatar: '👨‍💻',
      lastMessage: 'I have experience with the technologies mentioned in the job description.',
      timestamp: '2 hours ago',
      unread: false,
      online: true,
      jobTitle: 'Backend Developer Intern'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'CS Student at MIT',
      avatar: '👩‍🔬',
      lastMessage: 'When would be a good time for the technical interview?',
      timestamp: '1 day ago',
      unread: true,
      online: false,
      jobTitle: 'Data Science Intern'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Computer Engineering Student',
      avatar: '👨‍🔧',
      lastMessage: 'I appreciate the feedback on my application.',
      timestamp: '2 days ago',
      unread: false,
      online: false,
      jobTitle: 'Hardware Engineer Intern'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      role: 'CS Student at UCLA',
      avatar: '👩‍💼',
      lastMessage: 'Looking forward to hearing about next steps.',
      timestamp: '3 days ago',
      unread: false,
      online: true,
      jobTitle: 'Full Stack Developer'
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: 'candidate',
        content: 'Hi! Thank you for reviewing my application for the Software Engineer Intern position. I\'m very excited about the opportunity to work at Google.',
        timestamp: '2:30 PM'
      },
      {
        id: 2,
        sender: 'recruiter',
        content: 'Hello Sarah! Thank you for your interest in the position. I\'ve reviewed your application and I\'m impressed with your background. Your projects demonstrate strong technical skills.',
        timestamp: '2:35 PM'
      },
      {
        id: 3,
        sender: 'candidate',
        content: 'Thank you so much! I\'ve been working on several projects that align with the role requirements. I\'d love to discuss how my experience can contribute to your team.',
        timestamp: '2:40 PM'
      },
      {
        id: 4,
        sender: 'recruiter',
        content: 'That sounds great! I\'d like to schedule a phone interview with you. Are you available this week for a 30-minute call?',
        timestamp: '2:45 PM'
      },
      {
        id: 5,
        sender: 'candidate',
        content: 'Yes, I\'m available this week. I\'m flexible with timing. What days and times work best for you?',
        timestamp: '5 min ago'
      }
    ]
  };

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
  const currentMessages = messages[selectedConversation] || [];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Mock sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900 mb-3">Messages</h1>
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.role}</p>
                    <p className="text-xs text-blue-600 truncate">{conversation.jobTitle}</p>
                    <p className="text-sm text-gray-700 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                        {currentConversation.avatar}
                      </div>
                      {currentConversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{currentConversation.name}</h2>
                      <p className="text-sm text-gray-600">{currentConversation.role}</p>
                      <p className="text-xs text-blue-600">{currentConversation.jobTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Star className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Info className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'recruiter'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'recruiter' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-end space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      rows={1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center space-x-2 mt-2">
                  <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors">
                    Schedule Interview
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    Send Job Details
                  </button>
                  <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors">
                    Request Portfolio
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging candidates.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterMessages;