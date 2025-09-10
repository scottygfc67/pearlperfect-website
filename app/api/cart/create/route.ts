import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';
import { setCartId } from '@/lib/cart-server';
import { CartLineInput } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lines }: { lines?: CartLineInput[] } = body;

    const result = await createCart(lines);

    // Set cart ID in cookie for future requests
    setCartId(result.cartId);

    return NextResponse.json({
      success: true,
      cartId: result.cartId,
      checkoutUrl: result.checkoutUrl,
      totalQuantity: result.totalQuantity,
    });
  } catch (error) {
    console.error('Cart creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create cart',
      },
      { status: 500 }
    );
  }
}
