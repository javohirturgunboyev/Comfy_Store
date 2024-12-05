import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => {
        setProduct(response.data?.data?.attributes || null);
        setLoading(false);
      })
      .catch(() => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id]);

  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-700 dark:text-white">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/products")}
        className="text-blue-500 hover:underline mb-4"
      >
        Home &gt; Products
      </button>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.title || "Product"}
            className="w-full h-auto object-cover rounded shadow"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">{product.title}</h1>
          <h2 className="text-xl text-gray-500 mb-4">{product.company || "Brand"}</h2>
          <p className="text-2xl font-semibold mb-6 dark:text-white">${product.price || "N/A"}</p>
          <p className="text-gray-700 mb-6 dark:text-gray-300">
            {product.description || "No description available."}
          </p>

         
          <div className="mb-4">
            <h3 className="font-semibold dark:text-white">Select Colors</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {(product.colors || ["#FF0000", "#00FF00", "#0000FF"]).map((color, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorSelection(color)}
                  />
                  <span
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: color,
                      border: "2px solid #fff",
                    }}
                  ></span>
                </label>
              ))}
            </div>
          </div>

     
          <div className="mb-6">
            <h3 className="font-semibold dark:text-white">Amount</h3>
            <select className="mt-2 px-3 py-2 border rounded w-48">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Add to Bag
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
