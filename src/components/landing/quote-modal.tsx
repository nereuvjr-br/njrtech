'use client';

import * as React from 'react';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { continueChat } from '@/ai/flows/chat-briefing';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NjrTechLogo } from '@/components/icons';

interface QuoteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialMessage: Message = {
  role: 'model',
  content: 'Olá! Sou o assistente da NJR Tech. Para começarmos, qual é o seu nome?',
};

export function QuoteModal({ isOpen, onOpenChange }: QuoteModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([initialMessage]);
  const [userInput, setUserInput] = React.useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setMessages([initialMessage]);
      setUserInput('');
    }
    onOpenChange(open);
  };
  
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsSubmitting(true);

    try {
      const result = await continueChat({ history: newMessages });

      if (result.response) {
        setMessages([...newMessages, { role: 'model', content: result.response }]);
      }
      
      if (result.isComplete) {
         toast({
          title: 'Briefing Concluído!',
          description: result.response,
        });
        setTimeout(() => handleOpenChange(false), 3000);
      }

    } catch (error) {
      console.error('Error submitting chat:', error);
      setMessages([
        ...newMessages,
        {
          role: 'model',
          content: 'Desculpe, algo deu errado. Poderia tentar novamente?',
        },
      ]);
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Não foi possível continuar o chat. Tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg flex flex-col h-[70vh]">
        <DialogHeader>
          <DialogTitle>Solicitar Orçamento</DialogTitle>
          <DialogDescription>
            Vamos conversar um pouco sobre seu projeto.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
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
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            <NjrTechLogo className="w-8 h-8" />
                        </AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={cn(
                    'max-w-xs rounded-lg p-3 text-sm sm:max-w-sm',
                    message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                >
                    {message.content}
                </div>
                {message.role === 'user' && (
                     <Avatar className="w-8 h-8">
                        <AvatarFallback>
                            U
                        </AvatarFallback>
                    </Avatar>
                )}
                </div>
            ))}
             {isSubmitting && (
                <div className="flex justify-start">
                     <Avatar className="w-8 h-8 border">
                         <AvatarFallback className="bg-primary text-primary-foreground">
                            <NjrTechLogo className="w-8 h-8" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-3 max-w-xs rounded-lg bg-muted p-3 text-sm sm:max-w-sm flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                </div>
            )}
            </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t pt-4">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isSubmitting}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isSubmitting || !userInput.trim()}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
