declare module 'near-social-vm';

declare module 'nanoid' {
  export function nanoid(size?: number): string;
}

interface Window {
  zE: (name: string, method: string) => void | undefined;
}
