import { sha1 } from 'crypto-hash';

export const generateId = async (text, length) => {
   const hash = sha1(text);
   return (await hash).substring(0, length || 32);
}
