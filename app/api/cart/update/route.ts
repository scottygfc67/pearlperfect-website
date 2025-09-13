import { NextRequest, NextResponse } from 'next/server';
import { updateLines } from '@/lib/shopify-cart';
import { getCartId, setCartId } from '@/lib/cart-server';
import { CartLineUpdateInput } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId: clientCartId, lines }: { cartId?: string; lines: CartLineUpdateInput[] } = body;

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

    const result = await updateLines(cartId, lines);

    // Update cart ID in cookie
    await setCartId(result.cartId);

    return NextResponse.json({
      success: true,
      cartId: result.cartId,
      checkoutUrl: result.checkoutUrl,
    });
  } catch (error) {
    console.error('Update lines error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update cart lines',
      },
      { status: 500 }
    );
  }
}
