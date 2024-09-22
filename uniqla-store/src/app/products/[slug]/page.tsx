import { notFound } from 'next/navigation';
import { Product, getProductBySlug } from '../../../models/Product';
import ProductDetail from './ProductDetail';

// Server Component
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
