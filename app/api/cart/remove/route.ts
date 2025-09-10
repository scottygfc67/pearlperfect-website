import { NextRequest, NextResponse } from 'next/server';
import { removeLines } from '@/lib/shopify';
import { getCartId, setCartId } from '@/lib/cart-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId: clientCartId, lineIds }: { cartId?: string; lineIds: string[] } = body;

    if (!lineIds || lineIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Line IDs are required' },
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

    const result = await removeLines(cartId, lineIds);

    // Update cart ID in cookie
    await setCartId(result.cartId);

    return NextResponse.json({
      success: true,
      cartId: result.cartId,
      checkoutUrl: result.checkoutUrl,
      totalQuantity: result.totalQuantity,
    });
  } catch (error) {
    console.error('Remove lines error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove lines from cart',
      },
      { status: 500 }
    );
  }
}
