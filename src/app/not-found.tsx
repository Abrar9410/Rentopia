import Link from "next/link";


const NotFoundPage = () => {
    return (
        <div className="flex flex-col h-dvh justify-center items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold animate-bounce">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-portfolio sm:text-7xl">Page not found</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Sorry, Nothing&apos;s Here!</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/" className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio">Go back home</Link>
                    <Link href="/contact" className="text-sm font-semibold hover:underline">Report Problem <span aria-hidden="true">&rarr;</span></Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;