import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const productsList = await response.json();
    setProducts(productsList.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product Listing</h2>
      <div>
        {products?.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
