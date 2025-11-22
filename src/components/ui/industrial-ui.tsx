import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TechCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'glow';
}

export function TechCard({ children, className, variant = 'default', ...props }: TechCardProps) {
    return (
        <div
            className={cn(
                "relative p-6 transition-all duration-300 group",
                "bg-card/50 backdrop-blur-sm border border-white/10",
                variant === 'glow' && "hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:border-primary/50",
                className
            )}
            {...props}
        >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/50 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50 group-hover:border-primary transition-colors" />

            {children}
        </div>
    );
}

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
}

export function NeonButton({ children, className, variant = 'primary', ...props }: NeonButtonProps) {
    const variants = {
        primary: "bg-primary/10 text-primary border-primary hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]",
        secondary: "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40",
        danger: "bg-destructive/10 text-destructive border-destructive hover:bg-destructive hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]",
    };

    return (
        <Button
            className={cn(
                "relative overflow-hidden border transition-all duration-300 uppercase tracking-wider font-bold",
                variants[variant],
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Button>
    );
}

export function GlitchText({ text, className }: { text: string, className?: string }) {
    return (
        <div className={cn("relative inline-block group", className)}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:animate-glitch translate-x-[2px]">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-destructive opacity-0 group-hover:opacity-70 group-hover:animate-glitch translate-x-[-2px] animation-delay-100">
                {text}
            </span>
        </div>
    );
}

export function SectionHeader({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) {
    return (
        <div className={cn("mb-12 text-center relative", className)}>
            <div className="inline-block">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10 uppercase tracking-tight">
                    <GlitchText text={title} />
                </h2>
                <div className="h-1 w-24 bg-primary mx-auto mb-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full bg-white/50 animate-scanline" />
                </div>
            </div>
            {subtitle && (
                <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm md:text-base">
                    {`// ${subtitle}`}
                </p>
            )}
        </div>
    );
}

export function StatusBadge({ status }: { status: 'online' | 'offline' | 'busy' }) {
    const colors = {
        online: 'bg-neon-green shadow-[0_0_10px_#0aff00]',
        offline: 'bg-gray-500',
        busy: 'bg-neon-pink shadow-[0_0_10px_#ff00aa]',
    };

    return (
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground border border-white/10 px-2 py-1 rounded-full bg-black/40">
            <span className={cn("w-2 h-2 rounded-full animate-pulse", colors[status])} />
            <span className="uppercase">{status} SYSTEM</span>
        </div>
    );
}
