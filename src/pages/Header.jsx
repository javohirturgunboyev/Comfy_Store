import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-100 dark:bg-gray-800 shadow">
      <h1 className="text-2xl font-bold dark:text-white">Comfy Store</h1>
      <nav className="flex gap-4">
        <Link className="text-lg dark:text-white" to="/">Home</Link>
        <Link className="text-lg dark:text-white" to="/products">Products</Link>
      </nav>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
