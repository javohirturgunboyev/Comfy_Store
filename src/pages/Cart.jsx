import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const total = storedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, []);

  const handleRemoveItem = (id) => {
 
    const updatedCart = cart.filter((item) => item.id !== id);


    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setTotalPrice(0);
  };

  return (
    <section className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => window.history.back()}
        className="text-blue-500 hover:underline mb-4"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-white">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-4 border rounded shadow-lg w-full md:w-1/3"
              >
                <img
                  src={item.image || "https://via.placeholder.com/400"}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold dark:text-white">{item.title}</h2>
                <p className="text-lg text-gray-500 dark:text-gray-300">
                  ${item.price}
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-300">
                  Quantity: {item.quantity}
                </p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-2xl font-semibold dark:text-white">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleClearCart}
                className="px-6 py-3 bg-red-600 text-white rounded shadow hover:bg-red-700"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
