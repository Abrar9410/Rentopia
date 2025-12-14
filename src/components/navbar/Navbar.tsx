
import { getCookie } from "@/lib/cookies-tokens";
import NavbarContent from "./NavbarContent";
import { verifyToken } from "@/lib/jwtHandlers";
import { IUser } from "@/types";


const Navbar = async () => {

    let user: Partial<IUser> | undefined = undefined;
    const result = await getCookie("token");
    if (result) {
        const verifiedToken = await verifyToken(result.value);
        if (verifiedToken.success) {
            user = verifiedToken.payload as Partial<IUser>;
        };
    };

    return (
        <header className="mb-2 bg-background/60 dark:bg-black/60 border-b sticky top-2 z-10 backdrop-blur-md">
            <NavbarContent user={user}/>
        </header>
    );
};

export default Navbar;