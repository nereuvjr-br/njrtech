'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, Loader2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { handleQuoteRequest } from '@/ai/flows/handle-quote-request';
import { useToast } from '@/hooks/use-toast';
import { useChat } from '@/hooks/use-chat';

type FormData = {
    name: string;
    projectDescription: string;
    whatsapp: string;
    email: string;
    company: string;
};

const initialData: FormData = {
    name: '',
    projectDescription: '',
    whatsapp: '',
    email: '',
    company: '',
};

export function LeadFormModal() {
    const { isOpen, setOpen } = useChat();
    const [step, setStep] = React.useState(0);
    const [formData, setFormData] = React.useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [protocol, setProtocol] = React.useState<string | null>(null);
    const { toast } = useToast();

    const totalSteps = 4; // Name, Description, Contact, Success

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(step + 1);
        }
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const timestamp = Date.now().toString().slice(-4);
            const generatedProtocol = `NJR-${year}${month}${day}-${timestamp}`;

            const result = await handleQuoteRequest({
                ...formData,
                protocol: generatedProtocol
            });

            setProtocol(generatedProtocol);
            setStep(totalSteps);
            toast({
                title: 'Solicitação enviada!',
                description: result.confirmationMessage,
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Erro ao enviar',
                description: 'Tente novamente mais tarde.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (step === 0 && formData.name) handleNext();
            if (step === 1 && formData.projectDescription) handleNext();
        }
    };

    const resetForm = () => {
        setStep(0);
        setFormData(initialData);
        setProtocol(null);
    }

    React.useEffect(() => {
        if (!isOpen) {
            if (step === totalSteps) {
                setTimeout(resetForm, 500);
            }
        }
    }, [isOpen, step]);


    return (
        <>
            <div className={cn(
                "fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out",
                isOpen ? "translate-y-[200%]" : "translate-y-0"
            )}>
                <Button
                    size="lg"
                    className="rounded-full shadow-lg h-16 w-16 animate-in fade-in zoom-in duration-300"
                    onClick={() => setOpen(true)}
                >
                    <MessageSquare className="h-8 w-8" />
                    <span className="sr-only">Falar com Especialista</span>
                </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl h-[80vh] sm:h-[600px] p-0 gap-0 overflow-hidden border-none bg-background/95 backdrop-blur-xl shadow-2xl [&>button]:hidden">
                    <DialogTitle className="sr-only">Formulário de Contato</DialogTitle>

                    {/* Header / Progress */}
                    <div className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center">
                        <div className="flex gap-1">
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1 w-8 rounded-full transition-all duration-300",
                                        i <= step ? "bg-primary" : "bg-muted"
                                    )}
                                />
                            ))}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full hover:bg-muted/50">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="flex flex-col justify-center h-full px-8 sm:px-16 relative">
                        <AnimatePresence mode="wait">
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                        Olá! 👋 <br />
                                        Para começarmos, como você se chama?
                                    </h2>
                                    <Input
                                        autoFocus
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Digite seu nome..."
                                        className="text-xl sm:text-2xl border-0 border-b-2 border-primary/20 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary bg-transparent placeholder:text-muted-foreground/50"
                                    />
                                    <div className="pt-4">
                                        <Button
                                            onClick={handleNext}
                                            disabled={!formData.name}
                                            size="lg"
                                            className="text-lg px-8 rounded-full"
                                        >
                                            Continuar <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                        Prazer, {formData.name.split(' ')[0]}! <br />
                                        Qual é o maior desafio do seu negócio hoje?
                                    </h2>
                                    <Textarea
                                        autoFocus
                                        value={formData.projectDescription}
                                        onChange={(e) => handleChange('projectDescription', e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.ctrlKey) handleNext();
                                        }}
                                        placeholder="Ex: Preciso vender mais pelo Google, meu site está lento..."
                                        className="text-lg sm:text-xl min-h-[150px] border-2 border-primary/10 rounded-xl p-4 focus-visible:ring-0 focus-visible:border-primary bg-muted/30 resize-none"
                                    />
                                    <div className="pt-4 flex items-center gap-4">
                                        <Button
                                            onClick={handleNext}
                                            disabled={!formData.projectDescription}
                                            size="lg"
                                            className="text-lg px-8 rounded-full"
                                        >
                                            Continuar <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        <span className="text-xs text-muted-foreground hidden sm:inline-block">
                                            Pressione <strong>Ctrl + Enter</strong> para avançar
                                        </span>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                        Perfeito. <br />
                                        Para te enviarmos uma proposta personalizada, precisamos do seu contato.
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">WhatsApp</label>
                                            <Input
                                                value={formData.whatsapp}
                                                onChange={(e) => handleChange('whatsapp', e.target.value)}
                                                placeholder="(83) 99999-9999"
                                                className="text-lg border-primary/20 bg-transparent"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                placeholder="seu@email.com"
                                                className="text-lg border-primary/20 bg-transparent"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Nome da Empresa (Opcional)</label>
                                            <Input
                                                value={formData.company}
                                                onChange={(e) => handleChange('company', e.target.value)}
                                                placeholder="Sua Empresa Ltda"
                                                className="text-lg border-primary/20 bg-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={!formData.whatsapp || !formData.email || isSubmitting}
                                            size="lg"
                                            className="text-lg px-8 rounded-full w-full sm:w-auto"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    Finalizar e Receber Proposta <Check className="ml-2 h-5 w-5" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === totalSteps && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight">
                                        Recebemos sua solicitação!
                                    </h2>
                                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                                        Obrigado, <strong>{formData.name}</strong>. Já enviamos seus dados para nossa equipe de especialistas.
                                    </p>

                                    {protocol && (
                                        <div className="bg-muted/50 p-6 rounded-xl max-w-sm mx-auto mt-8 border border-primary/10">
                                            <p className="text-sm text-muted-foreground mb-2">Seu número de protocolo:</p>
                                            <p className="text-2xl font-mono font-bold tracking-wider text-primary select-all">
                                                {protocol}
                                            </p>
                                        </div>
                                    )}

                                    <div className="pt-8">
                                        <Button variant="outline" onClick={() => setOpen(false)}>
                                            Fechar
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
