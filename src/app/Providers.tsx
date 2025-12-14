"use client"

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster richColors position="top-right" />
            </ThemeProvider>
    );
};

export default Providers;