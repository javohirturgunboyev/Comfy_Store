import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
+    </div>
  );
};

export default App;
