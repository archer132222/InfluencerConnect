import { useState } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLocation, Link } from "wouter";
import { 
  Send, 
  ChevronLeft, 
  MessageSquare, 
  Search,
  Clock,
  CheckCheck,
  Loader2
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useUser } from "@/lib/store";

type ViewState = 'inbox' | 'compose' | 'conversation';

interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}

interface ConversationMessage {
  id: string;
  content: string;
  sender: 'me' | 'them';
  time: string;
}

export default function Messages() {
  const { t } = useLanguage();
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const [view, setView] = useState<ViewState>('inbox');
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState({ to: "", subject: "", content: "" });
  const [replyContent, setReplyContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const mockMessages: Message[] = [
    {
      id: "1",
      senderName: "Sarah Wilson",
      senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop",
      subject: "Re: Summer Collection Campaign",
      preview: "Hi! I'd love to discuss the details of your campaign. The concept sounds amazing...",
      time: "2h ago",
      unread: true,
    },
    {
      id: "2",
      senderName: "Ahmed Jalal",
      senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop",
      subject: "Campaign Proposal Received",
      preview: "Thank you for reaching out! I've reviewed your proposal and I'm interested...",
      time: "1d ago",
      unread: false,
    },
    {
      id: "3",
      senderName: "Omar Shalan",
      senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop",
      subject: "Gaming Review Schedule",
      preview: "I can start filming next week. Let me know if that works for your timeline...",
      time: "3d ago",
      unread: false,
    },
  ];

  const mockConversation: ConversationMessage[] = [
    {
      id: "1",
      content: "Hi! I saw your profile and I think you'd be a great fit for our new campaign. Would you be interested in collaborating?",
      sender: "me",
      time: "Yesterday, 2:30 PM",
    },
    {
      id: "2",
      content: "Hi! Thanks for reaching out. I'd love to hear more about the campaign. What's the product and target audience?",
      sender: "them",
      time: "Yesterday, 4:15 PM",
    },
    {
      id: "3",
      content: "It's for our new tech gadget launch. The target audience is young professionals aged 25-35 who are into the latest technology.",
      sender: "me",
      time: "Yesterday, 5:00 PM",
    },
    {
      id: "4",
      content: "That sounds right up my alley! I have a lot of experience with tech reviews. What's the timeline and budget you're working with?",
      sender: "them",
      time: "Today, 10:30 AM",
    },
  ];

  const filteredMessages = mockMessages.filter(
    (msg) =>
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (!newMessage.to || !newMessage.subject || !newMessage.content) return;
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSending(false);
    setNewMessage({ to: "", subject: "", content: "" });
    setView('inbox');
  };

  const handleSendReply = async () => {
    if (!replyContent.trim()) return;
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSending(false);
    setReplyContent("");
  };

  const openConversation = (message: Message) => {
    setSelectedConversation(message);
    setView('conversation');
  };

  const renderContent = () => {
    switch (view) {
      case 'compose':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setView('inbox')} className="text-white hover:bg-white/10">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <h2 className="text-xl font-display font-bold">New Message</h2>
            </div>

            <Card className="bg-[#1a1a1a] border-white/10 text-white">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">To (Influencer)</label>
                  <Input
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500"
                    placeholder="Search influencer name or email..."
                    value={newMessage.to}
                    onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Subject</label>
                  <Input
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500"
                    placeholder="Campaign collaboration request..."
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Message</label>
                  <Textarea
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 min-h-[200px]"
                    placeholder="Hi! I'd like to discuss a potential collaboration..."
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  />
                </div>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isSending || !newMessage.to || !newMessage.subject || !newMessage.content}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  {isSending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'conversation':
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setView('inbox')} className="text-white hover:bg-white/10">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white/10">
                  <AvatarImage src={selectedConversation?.senderAvatar} />
                  <AvatarFallback>{selectedConversation?.senderName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-display font-bold">{selectedConversation?.senderName}</h2>
                  <p className="text-xs text-gray-400">{selectedConversation?.subject}</p>
                </div>
              </div>
            </div>

            <Card className="bg-[#1a1a1a] border-white/10 text-white">
              <CardContent className="p-4">
                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                  {mockConversation.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.sender === 'me'
                            ? 'bg-red-600 text-white rounded-br-sm'
                            : 'bg-[#2A2A2A] text-white rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-red-200' : 'text-gray-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <Input
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 flex-1"
                    placeholder="Type your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  />
                  <Button 
                    onClick={handleSendReply}
                    disabled={isSending || !replyContent.trim()}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-display font-bold">Messages</h1>
              <Button onClick={() => setView('compose')} className="bg-red-600 hover:bg-red-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 pl-10"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              {filteredMessages.length === 0 ? (
                <Card className="bg-[#1a1a1a] border-white/10 text-white">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No messages found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredMessages.map((message) => (
                  <Card
                    key={message.id}
                    onClick={() => openConversation(message)}
                    className={`bg-[#1a1a1a] border-white/10 text-white cursor-pointer hover:bg-[#222] transition-colors ${
                      message.unread ? 'border-l-4 border-l-red-500' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-white/10">
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className={`font-medium truncate ${message.unread ? 'text-white' : 'text-gray-300'}`}>
                              {message.senderName}
                            </h3>
                            <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
                              <Clock className="h-3 w-3" />
                              {message.time}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${message.unread ? 'text-white font-medium' : 'text-gray-400'}`}>
                            {message.subject}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                        </div>
                        {!message.unread && (
                          <CheckCheck className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
}