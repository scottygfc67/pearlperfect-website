import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lines } = body;

    // Generate a mock cart ID
    const cartId = `mock_cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json({
      success: true,
      cartId,
      checkoutUrl: `https://checkout.shopify.com/mock-checkout?cart=${cartId}`,
      totalQuantity: lines?.length || 0,
    });
  } catch (error) {
    console.error('Mock cart creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create mock cart',
      },
      { status: 500 }
    );
  }
}
