"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";



const CTASearchBar = () => {

    const [value, setValue] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/items?searchTerm=${value}`);
    };

    return (
        <div className="relative">
            <Input
                placeholder="What are you looking for?"
                className="pr-12 w-full bg-background text-foreground"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button
                onClick={handleSearch}
                variant="ghost"
                className="absolute right-0 top-1/2 -translate-y-1/2"
            >
                <Search />
            </Button>
        </div>
    );
};

export default CTASearchBar;