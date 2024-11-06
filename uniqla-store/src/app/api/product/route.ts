export const dynamic = 'force-static';

import { getAllProducts } from '../../../models/Product';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse pagination and query parameters
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '8', 10);
  const query = searchParams.get('query')?.trim() || '';

  // Validate pagination parameters
  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
  }
  if (isNaN(limit) || limit < 1) {
    return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 });
  }

  try {
    // Fetch products from the database
    const products = await getAllProducts(page, limit, query);
    const totalProducts = products.total;  // Assuming `getAllProducts` returns { data, total }
    const totalPages = Math.ceil(totalProducts / limit);

    // Return products along with pagination metadata
    return NextResponse.json({
      data: products.data,
      page,
      limit,
      totalProducts,
      totalPages,
      query,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
