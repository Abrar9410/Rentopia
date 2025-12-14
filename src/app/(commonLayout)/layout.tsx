import Navbar from "@/components/navbar/Navbar";


const commonLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default commonLayout;