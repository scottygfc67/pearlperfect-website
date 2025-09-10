const CART_COOKIE_NAME = 'pp_cart_id';

// Client-side cart ID helpers
export function getCartIdClient(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CART_COOKIE_NAME);
}

export function setCartIdClient(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_COOKIE_NAME, id);
}

export function removeCartIdClient(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_COOKIE_NAME);
}
