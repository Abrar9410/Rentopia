import Image from "next/image";


const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
            {/* Logo / Brand Mark */}
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <Image src="/Rentopia-logo.PNG" alt="Logo" width={40} height={40} priority className="w-10 h-10" />
                </div>

                {/* Spinner */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>

            {/* Text */}
            <div className="mt-6 text-center space-y-1">
                <p className="text-lg font-medium">Rentopia</p>
                <p className="text-sm text-muted-foreground">
                    Finding the perfect rental for you…
                </p>
            </div>
        </div>
    );
};

export default Loading;