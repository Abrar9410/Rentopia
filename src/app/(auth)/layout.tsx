import { ThemeToggler } from '@/components/ThemeToggler';
import Image from 'next/image';
import Link from 'next/link';



const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <div className="w-11/12 md:w-10/12 mx-auto h-16 flex items-center justify-between">
                <Link href="/">
                    <Image src="/logo.PNG" alt="Logo" width={50} height={50} />
                </Link>
                <ThemeToggler />
            </div>
            {children}
        </>
    );
};

export default AuthLayout;