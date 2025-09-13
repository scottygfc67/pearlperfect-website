import { NextRequest, NextResponse } from 'next/server';
import { getCart } from '@/lib/shopify-cart';
import { getCartId } from '@/lib/cart-server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientCartId = searchParams.get('id');
    
    console.log('Cart GET API - clientCartId:', clientCartId);

    // Use client cart ID or get from server cookie
    const cartId = clientCartId || (await getCartId());
    
    console.log('Cart GET API - using cartId:', cartId);

    if (!cartId) {
      console.log('Cart GET API - no cart ID found');
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      );
    }

    const cart = await getCart(cartId);
    
    console.log('Cart GET API - cart data:', cart);

    if (!cart) {
      console.log('Cart GET API - cart is null');
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
