import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('id');

    if (!cartId) {
      return NextResponse.json(
        { success: false, error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Mock cart data
    const mockCart = {
      id: cartId,
      checkoutUrl: `https://checkout.shopify.com/mock-checkout?cart=${cartId}`,
      totalQuantity: 1,
      cost: {
        subtotalAmount: {
          amount: '29.99',
          currencyCode: 'USD'
        },
        totalAmount: {
          amount: '29.99',
          currencyCode: 'USD'
        }
      },
      lines: {
        edges: [
          {
            node: {
              id: 'mock_line_1',
              quantity: 1,
              merchandise: {
                id: 'gid://shopify/ProductVariant/1',
                title: '14 Strips (7 Treatments)',
                image: {
                  url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee1?w=150&h=150&fit=crop&crop=center',
                  altText: 'PearlPerfect V34 - 14 Strips'
                },
                product: {
                  title: 'PearlPerfect V34 Teeth Whitening Strips',
                  handle: 'v34-teeth-whitening-strips'
                },
                price: {
                  amount: '29.99',
                  currencyCode: 'USD'
                }
              }
            }
          }
        ]
      }
    };

    return NextResponse.json({
      success: true,
      cart: mockCart,
    });
  } catch (error) {
    console.error('Mock get cart error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get mock cart',
      },
      { status: 500 }
    );
  }
}
