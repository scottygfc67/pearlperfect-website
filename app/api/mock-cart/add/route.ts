import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, lines } = body;

    if (!lines || lines.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lines are required' },
        { status: 400 }
      );
    }

    // Mock successful add
    return NextResponse.json({
      success: true,
      cartId: cartId || `mock_cart_${Date.now()}`,
      checkoutUrl: `https://checkout.shopify.com/mock-checkout?cart=${cartId}`,
      totalQuantity: lines.length,
    });
  } catch (error) {
    console.error('Mock add lines error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add lines to mock cart',
      },
      { status: 500 }
    );
  }
}
