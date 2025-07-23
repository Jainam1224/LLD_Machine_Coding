import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const productsList = await response.json();
    const slicedProducts = productsList.products.slice(0, 6);
    setProducts(slicedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <span>Trending Products 🔥</span>
      <div className="product-grid">
        {products?.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
