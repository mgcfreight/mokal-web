export function translate(field: any, lang: string): any {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    return field[lang] || field.en || '';
  }
  return field;
}
