"use client"
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Send,
    Paperclip,
    MoreVertical,
    Search,
    Phone,
    Video,
    ArrowLeft,
    Check,
    CheckCheck
} from "lucide-react";

interface Message {
    id: string;
    sender: "me" | "other";
    content: string;
    time: string;
    read: boolean;
}

interface Conversation {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
}

const conversations: Conversation[] = [
    {
        id: "1",
        name: "AILabs Support",
        lastMessage: "Your API key has been reset successfully",
        time: "2m ago",
        unread: 2,
        online: true,
    },
    {
        id: "2",
        name: "Sarah Chen",
        lastMessage: "Thanks for the quick response!",
        time: "1h ago",
        unread: 0,
        online: true,
    },
    {
        id: "3",
        name: "DevTools Co",
        lastMessage: "We've pushed the update you requested",
        time: "3h ago",
        unread: 0,
        online: false,
    },
    {
        id: "4",
        name: "Marcus Johnson",
        lastMessage: "Can you help me with integration?",
        time: "1d ago",
        unread: 0,
        online: false,
    },
];

const initialMessages: Message[] = [
    {
        id: "m1",
        sender: "other",
        content: "Hi! I noticed you're using our AI Text Analyzer. How can I help you today?",
        time: "10:30 AM",
        read: true,
    },
    {
        id: "m2",
        sender: "me",
        content: "Hi! I'm having trouble with the entity extraction feature. It seems to miss some organization names.",
        time: "10:32 AM",
        read: true,
    },
    {
        id: "m3",
        sender: "other",
        content: "I understand. Could you share an example text where you're seeing this issue? That will help me diagnose the problem.",
        time: "10:33 AM",
        read: true,
    },
    {
        id: "m4",
        sender: "me",
        content: "Sure! Here's an example: \"OpenAI and Anthropic are leading AI research companies based in San Francisco.\" It only extracts OpenAI but misses Anthropic.",
        time: "10:35 AM",
        read: true,
    },
    {
        id: "m5",
        sender: "other",
        content: "Thanks for the example. This looks like it might be a confidence threshold issue. Let me check our recent model updates.",
        time: "10:36 AM",
        read: true,
    },
    {
        id: "m6",
        sender: "other",
        content: "I found the issue! We pushed an update yesterday that accidentally raised the confidence threshold. I've reset it now. Can you try again?",
        time: "10:40 AM",
        read: true,
    },
    {
        id: "m7",
        sender: "me",
        content: "That worked! Both companies are now being extracted. Thank you so much for the quick fix! 🎉",
        time: "10:42 AM",
        read: true,
    },
    {
        id: "m8",
        sender: "other",
        content: "Your API key has been reset successfully. Is there anything else I can help you with?",
        time: "10:45 AM",
        read: false,
    },
];

export default function Messages() {
    const [selectedConversation, setSelectedConversation] = useState<string>("1");
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [showConversations, setShowConversations] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const message: Message = {
            id: `m${Date.now()}`,
            sender: "me",
            content: newMessage,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            read: false,
        };

        setMessages([...messages, message]);
        setNewMessage("");
    };

    const currentConversation = conversations.find((c) => c.id === selectedConversation);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Conversations list */}
                <aside
                    className={`${
                        showConversations ? "flex" : "hidden"
                    } md:flex flex-col w-full md:w-80 lg:w-96 border-r bg-card`}
                >
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold mb-4">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search conversations..." className="pl-9" />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-2">
                            {conversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() => {
                                        setSelectedConversation(conversation.id);
                                        setShowConversations(false);
                                    }}
                                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors ${
                                        selectedConversation === conversation.id
                                            ? "bg-primary/10"
                                            : "hover:bg-secondary"
                                    }`}
                                >
                                    <div className="relative">
                                        <Avatar>
                                            <AvatarImage src={conversation.avatar} />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {conversation.name.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {conversation.online && (
                                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-accent border-2 border-card" />
                                        )}
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-medium truncate">{conversation.name}</p>
                                            <span className="text-xs text-muted-foreground shrink-0">
                        {conversation.time}
                      </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                    {conversation.unread > 0 && (
                                        <Badge className="shrink-0">{conversation.unread}</Badge>
                                    )}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </aside>

                {/* Chat area */}
                <main
                    className={`${
                        showConversations ? "hidden" : "flex"
                    } md:flex flex-1 flex-col`}
                >
                    {currentConversation ? (
                        <>
                            {/* Chat header */}
                            <header className="flex items-center gap-4 p-4 border-b bg-card">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                    onClick={() => setShowConversations(true)}
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <div className="relative">
                                    <Avatar>
                                        <AvatarImage src={currentConversation.avatar} />
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {currentConversation.name.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {currentConversation.online && (
                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-accent border-2 border-card" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{currentConversation.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {currentConversation.online ? "Online" : "Offline"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Phone className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Video className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-5 w-5" />
                                    </Button>
                                </div>
                            </header>

                            {/* Messages */}
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4 max-w-3xl mx-auto">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${
                                                message.sender === "me" ? "justify-end" : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                                    message.sender === "me"
                                                        ? "bg-primary text-primary-foreground rounded-br-md"
                                                        : "bg-secondary rounded-bl-md"
                                                }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <div
                                                    className={`flex items-center justify-end gap-1 mt-1 ${
                                                        message.sender === "me"
                                                            ? "text-primary-foreground/70"
                                                            : "text-muted-foreground"
                                                    }`}
                                                >
                                                    <span className="text-xs">{message.time}</span>
                                                    {message.sender === "me" && (
                                                        message.read ? (
                                                            <CheckCheck className="h-3 w-3" />
                                                        ) : (
                                                            <Check className="h-3 w-3" />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Input area */}
                            <footer className="p-4 border-t bg-card">
                                <div className="flex items-center gap-2 max-w-3xl mx-auto">
                                    <Button variant="ghost" size="icon">
                                        <Paperclip className="h-5 w-5" />
                                    </Button>
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyUp={(e) => e.key === "Enter" && handleSend()}
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="default"
                                        size="icon"
                                        onClick={handleSend}
                                        disabled={!newMessage.trim()}
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </footer>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                            Select a conversation to start messaging
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
