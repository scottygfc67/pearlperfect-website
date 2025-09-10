import { cookies } from 'next/headers';

const CART_COOKIE_NAME = 'pp_cart_id';

// Server-side cart ID helpers
export async function getCartId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE_NAME)?.value || null;
}

export async function setCartId(id: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
