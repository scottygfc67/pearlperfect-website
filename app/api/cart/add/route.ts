import { NextRequest, NextResponse } from 'next/server';
import { addLines } from '@/lib/shopify';
import { getCartId, setCartId } from '@/lib/cart-server';
import { CartLineInput } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId: clientCartId, lines }: { cartId?: string; lines: CartLineInput[] } = body;

    if (!lines || lines.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lines are required' },
        { status: 400 }
      );
    }

    // Use client cart ID or get from server cookie
    let cartId = clientCartId || getCartId();
    
    if (!cartId) {
      return NextResponse.json(
        { success: false, error: 'Cart not found. Please create a cart first.' },
        { status: 400 }
      );
    }

    const result = await addLines(cartId, lines);

    // Update cart ID in cookie
    setCartId(result.cartId);

    return NextResponse.json({
      success: true,
      cartId: result.cartId,
      checkoutUrl: result.checkoutUrl,
      totalQuantity: result.totalQuantity,
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
