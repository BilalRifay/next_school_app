import Link from "next/link";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../ui/command"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../ui/menubar';


export const ResponsiveMenu = ({ quick_Access }) => (
    <Command className="hidden md:block rounded-lg border shadow-md font-poppins">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Admin Panel">
                {Object.entries(quick_Access).map(([label, link], index) => (
                    <CommandItem key={index}>
                        <Link href={link}>{label}</Link>
                        <CommandSeparator />
                    </CommandItem>
                ))}
            </CommandGroup>
        </CommandList>
    </Command>
);



export const ResponsiveNavbar = ({ schoolSections = [] }) => {
    return (
        <Menubar className="bg-blue-800/80 w-full flex justify-center rounded-none border-none">
            {schoolSections.map((section, index) => (
                <MenubarMenu key={index} className="relative">
                    <MenubarTrigger asChild>
                        <button className="text-white font-semibold bg-transparent hover:bg-transparent transition-transform transform hover:scale-105">
                            {section.title}
                        </button>
                    </MenubarTrigger>
                    <MenubarContent className="bg-white shadow-lg absolute left-0 mt-2">
                        {section.items && section.items.map((item, itemIndex) => (
                            <MenubarItem asChild key={itemIndex}>
                                <Link href={section.links ? section.links[itemIndex] : '#'} className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-800">
                                    {item}
                                </Link>
                            </MenubarItem>
                        ))}
                    </MenubarContent>
                </MenubarMenu>
            ))}
        </Menubar>
    );
};
