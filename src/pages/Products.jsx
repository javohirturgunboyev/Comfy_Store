import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [company, setCompany] = useState("all");
    const [order, setOrder] = useState("a-z");
    const [price, setPrice] = useState(100000);
    const [page, setPage] = useState(1);

    const fetchProducts = () => {
        setLoading(true);
        axios
            .get(
                `https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${order}&price=${price}&page=${page}`
            )
            .then((response) => {
                setProducts(response.data?.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const handleSearch = () => {
        setPage(1);
        fetchProducts();
    };

    if (loading) return <p className="text-center mt-10 text-gray-700 dark:text-white">Loading...</p>;

    return (
        <div className="p-8">
            <div className="bg-blue-100 p-4 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search Product"
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="Tables">Tables</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Kids">Kids</option>
                    <option value="Sofas">Sofas</option>
                    <option value="Beds">Beds</option>
                </select>
                <select
                    className="select select-bordered w-full"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                >
                    <option value="all">All Companies</option>
                    <option value="Modenza">Modenza</option>
                    <option value="Luxora">Luxora</option>
                    <option value="Artifex">Artifex</option>
                    <option value="Comfora">Comfora</option>
                    <option value="Homestead">Homestead</option>
                </select>
                <select
                    className="select select-bordered w-full"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="high"> High</option>
                    <option value="low"> Low</option>
                </select>
                <div className="flex items-center space-x-2 col-span-1 lg:col-span-2">
                    <input
                        type="range"
                        className="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="text-sm">Max: ${price}</span>
                </div>
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                <button className="btn btn-secondary" onClick={() => window.location.reload()}>Reset</button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

            <div className="flex justify-center space-x-4 mt-6">
                <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                <button className="btn" onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
