import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://strapi-store-server.onrender.com/api/products")
            .then((response) => {
                setProducts(response.data?.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-700 dark:text-white">Loading...</p>;

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {products.map((value) => (
                <Link
                    to={`/products/${value.id}`}
                    key={value.id}
                    className="border p-4 rounded shadow dark:bg-gray-800"
                >
                    <img
                        src={value.attributes.image || "https://via.placeholder.com/150"}
                        alt={value.attributes.title || "Product Image"}
                        className="w-full h-48 object-cover rounded"
                    />
                    <h2 className="text-lg font-bold mt-2 dark:text-white">{value.attributes.title}</h2>
                    <p className="dark:text-gray-300">${value.attributes.price}</p>
                </Link>
            ))}
        </section>
    );
};

export default Products;
