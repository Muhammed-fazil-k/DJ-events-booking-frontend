//While going for producition Api url will use next public api url instead of localhost

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'