import { cookies } from 'next/headers';

const CART_COOKIE_NAME = 'pp_cart_id';

// Server-side cart ID helpers
export function getCartId(): string | null {
  const cookieStore = cookies();
  return cookieStore.get(CART_COOKIE_NAME)?.value || null;
}

export function setCartId(id: string): void {
  const cookieStore = cookies();
  cookieStore.set(CART_COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
