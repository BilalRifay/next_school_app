"use client"

import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "../ui/alert-dialog";

const languages = [
    { code: "en", lang: "English" },
    { code: "hi", lang: "Hindi" },
    { code: "ta", lang: "Tamil" }
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = async (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="flex items-center space-x-2">
                        <Languages className="w-6 h-6 text-blue-900 " />
                        <p className="lg:hidden block text-gray-700 font-medium">Select Your Language</p>
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-100 p-6 rounded-lg max-w-lg w-full mx-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold">Choose Your Language</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-gray-600">
                            Please select the language you would like to use.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {languages.map((lng) => (
                                <AlertDialogAction
                                    key={lng.code}
                                    onClick={() => changeLanguage(lng.code)}
                                    className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 text-center text-sm"
                                >
                                    {lng.lang}
                                </AlertDialogAction>
                            ))}
                        </div>
                        <AlertDialogCancel className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 text-center text-sm">
                            Cancel
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default LanguageSelector;