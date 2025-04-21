import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Send } from "lucide-react"

const Chatpage = () => {
  const [chats] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, is this still available?",
      time: "10:30 AM",
      unread: 2,
      avatar: "https://github.com/shadcn.png",
      messages: [
        { text: "Hey, is this still available?", sender: "other", time: "10:30 AM" },
        { text: "Yes, it is!", sender: "me", time: "10:31 AM" },
        { text: "Great! Can we meet tomorrow?", sender: "other", time: "10:32 AM" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "I'm interested in your item",
      time: "Yesterday",
      unread: 0,
      avatar: "https://github.com/shadcn.png",
      messages: [
        { text: "I'm interested in your item", sender: "other", time: "Yesterday" },
        { text: "What's your offer?", sender: "me", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Can we negotiate the price?",
      time: "2 days ago",
      unread: 1,
      avatar: "https://github.com/shadcn.png",
      messages: [
        { text: "Can we negotiate the price?", sender: "other", time: "2 days ago" },
        { text: "Sure, what's your budget?", sender: "me", time: "2 days ago" }
      ]
    }
  ])

  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              text: newMessage,
              sender: "me",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ],
          lastMessage: newMessage,
          time: "Just now"
        }
      }
      return chat
    })

    setSelectedChat(updatedChats.find(chat => chat.id === selectedChat.id))
    setNewMessage("")
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Chat List Sidebar */}
      <Card className="w-full md:w-1/3 border-r p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-500" />
          <Input placeholder="Search chats..." className="flex-1" />
        </div>
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${selectedChat?.id === chat.id ? 'bg-gray-100' : ''}`}
              onClick={() => handleChatSelect(chat)}
            >
              <Avatar>
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {selectedChat.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-center md:text-left">Select a chat to start messaging</h2>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">No chat selected</p>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Chatpage