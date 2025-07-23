import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const productsList = await response.json();
    setProduct(productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <div>
      <h2>Product Detail Page</h2>
      {product ? (
        <div>
          <img src={product.thumbnail} alt="Product" />
          <h3>{product.title}</h3>
          <h3>$ {product.price}</h3>
          <p>{product.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
