import { NextRequest, NextResponse } from 'next/server';
import { addLines } from '@/lib/shopify-cart';
import { getCartId, setCartId } from '@/lib/cart-server';
import { CartLineInput } from '@/lib/shopify-cart';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId: clientCartId, lines }: { cartId?: string; lines: CartLineInput[] } = body;
    
    console.log('Cart add API received:', { clientCartId, lines });

    if (!lines || lines.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lines are required' },
        { status: 400 }
      );
    }

    // Use client cart ID or get from server cookie
    const cartId = clientCartId || (await getCartId());
    
    if (!cartId) {
      return NextResponse.json(
        { success: false, error: 'Cart not found. Please create a cart first.' },
        { status: 400 }
      );
    }

    const result = await addLines(cartId, lines);
    
    console.log('Cart ADD API - addLines result:', result);

    // Update cart ID in cookie
    await setCartId(result.cartId);
    
    console.log('Cart ADD API - updated cart ID in cookie:', result.cartId);

    return NextResponse.json({
      success: true,
      cartId: result.cartId,
      checkoutUrl: result.checkoutUrl,
    });
  } catch (error) {
    console.error('Add lines error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add lines to cart',
      },
      { status: 500 }
    );
  }
}
