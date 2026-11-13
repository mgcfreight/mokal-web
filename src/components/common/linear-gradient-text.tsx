'use client';

import { LinearGradientTextProp } from "@/utils/types";
import { useTranslate } from "@/providers/locale-provider";

export default function LinearGradientText({ text, extraClass }: LinearGradientTextProp) {
    const t = useTranslate();
    return <span className={`text-transparent bg-gradientText bg-clip-text ${extraClass}`} >{t(text)}</span>
}