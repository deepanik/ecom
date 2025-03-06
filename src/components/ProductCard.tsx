import React from 'react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-neutral-800 mb-3">
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-lg font-medium text-white">${product.price}</p>
        <h3 className="text-sm text-gray-400">{product.title}</h3>
      </div>
    </div>
  );
};

export default ProductCard; 