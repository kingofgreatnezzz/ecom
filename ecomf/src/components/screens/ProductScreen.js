import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/api/product/${id}`);
        setProduct(data);
      } catch (error) {
        setError(error.response.statusText);
      }
    }
    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {product ? (
        <img src={product.product_img} alt="product details" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductScreen;
