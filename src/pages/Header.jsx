import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useState, useEffect } from "react";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-100 dark:bg-gray-800 shadow">
      <h1 className="text-2xl font-bold dark:text-white">Comfy Store</h1>
      <nav className="flex gap-4">
        <Link className="text-lg dark:text-white" to="/">Home</Link>
        <Link className="text-lg dark:text-white" to="/products">Products</Link>
        <Link className="text-lg dark:text-white" to="/about">About</Link>
        <div className="relative">
          <Link className="text-lg dark:text-white" to="/cart">Cart</Link>
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
            {cartCount}
          </span>
        </div>
      </nav>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
