// [GET] https://api.escuelajs.co/api/v1/products.

import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';

const LoadingDots = () => {
  return (
    <span className="inline-flex ml-2">
      <span className="animate-dot">.</span>
      <span className="animate-dot" style={{ animationDelay: '0.4s' }}>.</span>
      <span className="animate-dot" style={{ animationDelay: '0.6s' }}>.</span>
    </span>
  );
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mr-3"></div>
          <span className="text-xl text-white font-mono">Loading<LoadingDots /></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

