import { ThemeToggler } from '@/components/ThemeToggler';
import Image from 'next/image';
import Link from 'next/link';



const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <header className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto my-2 flex h-16 justify-between items-center bg-foreground/60 dark:bg-black/60 text-white border-b rounded-xl px-4 md:px-6 sticky top-2 z-10 backdrop-blur-md">
                <Link href="/" className="flex items-center">
                    <Image src="/Rentopia-logo.PNG" alt="Logo" width={20} height={20} priority className="w-5 h-5" />
                    <div className="w-max text-xl font-bold text-primary">entopia</div>
                </Link>
                <ThemeToggler />
            </header>
            {children}
        </>
    );
};

export default AuthLayout;