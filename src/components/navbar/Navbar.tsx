import NavbarContent from "./NavbarContent";
import { getCurrentUser } from "@/lib/currentUser";


const Navbar = async () => {

    const user = await getCurrentUser();

    return (
        <header className="mb-2 bg-accent/60 dark:bg-accent/60 border-b sticky top-0 z-10 backdrop-blur-md">
            <NavbarContent user={user}/>
        </header>
    );
};

export default Navbar;