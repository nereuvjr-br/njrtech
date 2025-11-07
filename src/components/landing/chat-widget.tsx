'use client';

import * as React from 'react';
import { Loader2, Send, Bot, X, MessageSquare, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { continueChat, type ChatOutput } from '@/ai/flows/chat-briefing';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useChat } from '@/hooks/use-chat';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialMessage: Message = {
  role: 'model',
  content: 'Olá! Sou o Nexus, assistente da NJR Tech. Para começarmos, qual é o seu nome?',
};

export function ChatWidget() {
  const { toast } = useToast();
  const { isOpen, setOpen } = useChat();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [userInput, setUserInput] = React.useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [briefingData, setBriefingData] = React.useState<{ name?: string }>({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [requiresConfirmation, setRequiresConfirmation] = React.useState(false);
  const [protocol, setProtocol] = React.useState<string | null>(null);
  const [isCopied, setIsCopied] = React.useState(false);


  const resetChat = React.useCallback(() => {
    setMessages([initialMessage]);
    setUserInput('');
    setIsComplete(false);
    setRequiresConfirmation(false);
    setProtocol(null);
  }, []);

  React.useEffect(() => {
    if (isOpen && messages.length === 0) {
      resetChat();
    }
  }, [isOpen, resetChat, messages.length]);

  React.useEffect(() => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
           viewport.scrollTo({
            top: viewport.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    }, 100);
  }, [messages]);

  const focusInput = React.useCallback(() => {
    setTimeout(() => {
      if (!isComplete && !requiresConfirmation) {
         inputRef.current?.focus();
      }
    }, 100);
  }, [isComplete, requiresConfirmation]);

  React.useEffect(() => {
    if (isOpen) {
      focusInput();
    }
  }, [isOpen, focusInput]);

  const processChat = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: messageContent }];
    setMessages(newMessages);
    setUserInput('');
    setIsSubmitting(true);
    setRequiresConfirmation(false);

    try {
      const result: ChatOutput = await continueChat({ history: newMessages });

      if (result.response) {
        setMessages([...newMessages, { role: 'model', content: result.response }]);
      }
      
      if (result.briefing?.name) {
        setBriefingData(prev => ({ ...prev, name: result.briefing?.name }));
      }
      
      setRequiresConfirmation(result.requiresConfirmation || false);

      if (result.isComplete) {
         setIsComplete(true);
         setProtocol(result.protocol || null);
         toast({
          title: 'Briefing Concluído! ✅',
          description: "Seu protocolo foi gerado. Entraremos em contato em breve!",
        });
      }

    } catch (error) {
      console.error('Error submitting chat:', error);
      setMessages([
        ...newMessages,
        {
          role: 'model',
          content: 'Desculpe, algo deu errado por aqui. Poderia tentar novamente? 😕',
        },
      ]);
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Não foi possível continuar o chat. Tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
      focusInput();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    processChat(userInput);
  }

  const handleConfirmation = (confirmation: 'sim' | 'não') => {
    processChat(confirmation);
  };
  
  const handleCopyProtocol = () => {
    if (protocol) {
      navigator.clipboard.writeText(protocol);
      setIsCopied(true);
      toast({
        title: 'Protocolo copiado!',
      });
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2s
    }
  };

  const getUserInitial = () => {
    if (briefingData.name) {
      return briefingData.name.charAt(0).toUpperCase();
    }
    const nameMessage = messages.find(m => m.role === 'user' && m.content.length > 1);
    if (nameMessage) {
        const potentialName = nameMessage.content.split(' ')[0];
        if (potentialName.length > 0) return potentialName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <div className={cn(
        "fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-y-[200%]" : "translate-y-0"
      )}>
        <Button size="lg" className="rounded-full shadow-lg h-16 w-16" onClick={() => setOpen(true)}>
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Abrir Chat</span>
        </Button>
      </div>

      <div className={cn(
        "fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-md transition-all duration-300 ease-in-out",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <Card className="flex h-[70vh] max-h-[600px] flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Vamos começar seu projeto?</CardTitle>
              <CardDescription>
                Responda algumas perguntas para criarmos seu orçamento.
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="flex flex-col gap-4 p-4">
                {messages.map((message, index) => (
                    <div
                    key={index}
                    className={cn(
                        'flex items-start gap-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                    >
                    {message.role === 'model' && (
                        <Avatar className="w-8 h-8 border-2 border-primary/50 bg-background">
                            <AvatarFallback className="bg-transparent text-primary">
                                <Bot className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        'max-w-xs rounded-lg p-3 text-sm sm:max-w-sm whitespace-pre-wrap',
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                    >
                        {message.content}
                         {isComplete && protocol && message.role === 'model' && message.content.includes(protocol) && (
                            <div className="mt-4 flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 p-2">
                                <span className="text-sm font-semibold text-primary-foreground/90 flex-1">{protocol}</span>
                                <Button size="sm" variant="ghost" className="h-auto p-1 text-primary-foreground/90 hover:bg-primary/20" onClick={handleCopyProtocol}>
                                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    <span className="sr-only">Copiar Protocolo</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    {message.role === 'user' && (
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>
                                {getUserInitial()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {isSubmitting && !requiresConfirmation &&(
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="w-8 h-8 border-2 border-primary/50 bg-background">
                            <AvatarFallback className="bg-transparent text-primary">
                                <Bot className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="ml-0 max-w-xs rounded-lg bg-muted p-3 text-sm sm:max-w-sm flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
             {requiresConfirmation && !isSubmitting && (
              <div className="border-t p-4 flex flex-col sm:flex-row gap-2">
                <Button className="w-full" onClick={() => handleConfirmation('sim')}>Sim, estão corretos</Button>
                <Button className="w-full" variant="outline" onClick={() => handleConfirmation('não')}>Não, quero corrigir</Button>
              </div>
            )}


            <form onSubmit={handleSubmit} className={cn("flex items-center gap-2 border-t p-4", { 'hidden': requiresConfirmation })}>
              <Input
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={isComplete ? "Obrigado! Entraremos em contato." : "Digite sua mensagem..."}
                disabled={isSubmitting || isComplete || requiresConfirmation}
                autoComplete="off"
              />
              <Button type="submit" size="icon" disabled={isSubmitting || !userInput.trim() || isComplete}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
