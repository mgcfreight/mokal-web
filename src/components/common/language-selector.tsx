'use client'; 
import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@heroui/react';
import type { Selection } from '@heroui/react';
import { FiGlobe } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSelector() {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState<Set<string>>(new Set(['en']));

    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )lang=([^;]+)'));
        const cookieLang = match ? match[2] : 'en';
        setSelectedLanguage(new Set([cookieLang]));
    }, []);

    const handleLanguageChange = (keys: Selection) => {
        const languageCode = Array.from(keys)[0] as string;
        if (!languageCode) return;

        setSelectedLanguage(new Set([languageCode]));

        // Set cookie 'lang' with the selected language
        document.cookie = `lang=${languageCode}; path=/; max-age=31536000; SameSite=Lax`;

        // Refresh the page so Server Components reload with the new language
        router.refresh();
    };

    return (
        <div className="w-[140px]">
            <Select
                aria-label="Select language"
                selectedKeys={selectedLanguage}
                onSelectionChange={handleLanguageChange}
                size="sm"
                variant="bordered"
                classNames={{
                    trigger: "bg-white border border-gray-300 shadow-sm hover:bg-gray-50 h-9 min-h-9 px-2 py-1",
                    value: "text-sm",
                }}
                startContent={<FiGlobe className="w-4 h-4 text-gray-500 flex-shrink-0 mr-1" />}
            >
                {languages.map((language) => (
                    <SelectItem 
                        key={language.code}
                        startContent={<span>{language.flag}</span>}
                        textValue={`${language.flag} ${language.name}`}
                    >
                        {language.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
