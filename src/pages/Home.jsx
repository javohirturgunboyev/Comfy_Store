import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then((response) => {
        setProducts(response.data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-700 dark:text-white">Loading...</p>;

  return (
    <>
      <header className="p-8 bg-white dark:bg-gray-900 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            We are changing the way people shop
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim
            soluta temporibus asperiores aut obcaecati perferendis porro nobis.
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            OUR PRODUCTS
          </button>
        </div>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
      className="rounded-box" />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
      className="rounded-box" />
  </div>
</div>
      </header>
      <hr />
<h4>featured products</h4>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {products.map((value, index) => (
          <div key={index} className="border p-4 rounded shadow dark:bg-gray-800">
            <img
              src={value.attributes.image}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2 dark:text-white">
              {value.attributes.title}
            </h2>
            <p className="dark:text-gray-300">${value.attributes.price}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
