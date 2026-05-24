import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { useAuth } from '../../auth/hooks/useAuth';
import remarkGfm from 'remark-gfm'
import { useNavigate } from "react-router";
import { Navigate } from 'react-router'



const Dashboard = () => {
  const chat = useChat()
  const { handleLogout } = useAuth()
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats || {})
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const user = useSelector((state) => state.auth.user)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    chat.intializeSocket()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }, [])

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  const onLogoutClick = async () => {
    await handleLogout(); // Pehle backend aur Redux se logout hone ka wait karega
    navigate('/login');   // Fir login page par bhej dega
  };

 
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`${sidebarOpen ? 'w-64' : 'w-0'
          } fixed md:static md:translate-x-0 h-screen bg-slate-900 text-white flex flex-col overflow-hidden transition-ease-in duration-300 z-50 md:z-0`}
      >
        <div className="p-3 md:p-4 border-b border-slate-800 flex items-center justify-between">
          <button className="flex-1 flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm md:text-base">
            <span className="text-lg">+</span>
            <span>New Chat</span>
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden ml-2 text-white hover:bg-slate-800 rounded p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2">
          <div className="text-xs text-slate-400 uppercase font-semibold px-2 py-3">CHATS</div>
          {Object.values(chats).map((chatItem) => (
            <motion.div
              key={chatItem.id}
              whileHover={{ x: 5 }}
              className="group p-2 md:p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors flex items-center justify-between"
            >
              <div
                onClick={() => {
                  openChat(chatItem.id)
                  setSidebarOpen(false)
                }}
                className="flex-1 min-w-0"
              >
                <p className="text-xs md:text-sm truncate">{chatItem.title}</p>
              </div>
             <button
                onClick={(e) => {
                  e.stopPropagation()
                  chat.handleDeleteChat(chatItem.id)
                }}
                className="opacity-0 group-hover:opacity-100 ml-2 text-red-400 hover:text-red-500 transition-all text-sm flex-shrink-0"
                title="Delete chat"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-3 md:p-3 space-y-4">
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-xs md:text-sm">
            Upgrade to Voxa Plus+
          </button>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {user?.user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs md:text-sm font-medium truncate">{user?.user?.username || 'User'}</div>
              <div className="text-xs text-slate-400 truncate">{user?.user?.email || 'user@email.com'}</div>
            </div>
            <button 
              onClick={onLogoutClick}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors flex-shrink-0"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900 px-3 md:px-4 py-3 md:py-4 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white transition-colors text-xl md:text-2xl "
          >
            ☰
          </button>
          <h1 className="text-white font-semibold text-sm md:text-base flex-1 text-center">
            Voxa Chat Assistant
          </h1>
          <div className="w-6 md:hidden" />
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-slate-950">
          {Object.values(chats).length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center px-4">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Welcome to Voxa</h2>
                <p className="text-slate-400 text-sm md:text-base">Start a new conversation</p>
              </div>
            </div>
          ) : (
            chats[currentChatId]?.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs sm:text-sm ${message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-100 rounded-bl-none'
                    }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-800 bg-slate-900 p-3 md:p-4 flex-shrink-0">
          <form onSubmit={handleSubmitMessage} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message Voxa AI..."
              className="flex-1 bg-slate-800 text-white rounded-lg px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 text-sm"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 md:px-6 py-2 font-semibold transition-colors text-sm"
            >
              Send
            </button>
          </form>
          {/* <div className="flex flex-wrap gap-2 mt-3">
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors whitespace-nowrap">
              📎 Attach
            </button>
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors whitespace-nowrap">
              🎨 Create Image
            </button>
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors whitespace-nowrap">
              📊 Analyze Data
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )

}
export default Dashboard

