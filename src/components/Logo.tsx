import Image from "next/image";


interface ILogoProps {
    width?: number;
    height?: number;
    className?: string;
};


const Logo = ({width=20, height=20, className="w-5 h-5"}: ILogoProps) => {
    return (
        <Image
            src="/Rentopia-logo.PNG"
            alt="Logo"
            width={width}
            height={height}
            priority
            className={className}
        />
    );
};

export default Logo;