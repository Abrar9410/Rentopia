"use client"

import { Button } from "@/components/ui/button";


const GlobalError = ({error, reset}: {error: Error & {digest?: string}, reset: () => void}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-red-500 text-center text-xl">Something Went Wrong!</p>
            <p className="text-red-500 text-center text-xl">{error?.message}</p>
            <Button
                onClick={ () => reset() }
                className="bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground cursor-pointer"
            >
                Try Again
            </Button>
        </div>
    );
};

export default GlobalError;