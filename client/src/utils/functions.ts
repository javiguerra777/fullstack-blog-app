export default function convertUnixToDate(unix: number): string {
  const date: Date = new Date(unix);
  return date.toLocaleString('en-US');
}

export function limitCharacters(text: string, length: number) {
  const newText = text.slice(0, length);
  return newText;
}
