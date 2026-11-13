import { cookies } from 'next/headers';

export async function getLocale(): Promise<"en" | "fr"> {
  const cookieStore = await cookies();
  return cookieStore.get('lang')?.value as "en" | "fr" || 'en';
}
