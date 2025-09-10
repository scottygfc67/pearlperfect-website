import { NextRequest, NextResponse } from 'next/server';
import { getCart } from '@/lib/shopify';
import { getCartId } from '@/lib/cart-server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientCartId = searchParams.get('id');

    // Use client cart ID or get from server cookie
    const cartId = clientCartId || (await getCartId());

    if (!cartId) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      );
    }

    const cart = await getCart(cartId);

    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get cart',
      },
      { status: 500 }
    );
  }
}
