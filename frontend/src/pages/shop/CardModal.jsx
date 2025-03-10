import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "./OrderSummary";
import { updateQuantity, removeFromCart } from "../../redux/features/cart/cartSlice";

const CardModal = ({ isOpen, onClose }) => {
  const products = useSelector((state) => state.cart.products); // Accede al estado global
  const dispatch = useDispatch();

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              onClick={onClose}
              aria-label="Close cart modal"
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="cart-items">
            {products.length === 0 ? (
              <div className="text-center text-gray-500">Your Cart is Empty</div>
            ) : (

              products.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4 rounded-lg"
                >
                  <div className="mr-4 px-2 bg-primary text-white rounded-full">
                    {index + 1}
                  </div>

                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                    <div>
                      <span className="text-lg font-medium text-gray-700">{item.name}</span>
                      <div className="text-sm text-gray-500">
                        Price: ${item.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Description: {item.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 md:mt-0">
                    <button
                      onClick={() => handleQuantity("decrement", item.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-primary hover:text-white rounded-full"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="mx-3 text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity("increment", item.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-primary hover:text-white rounded-full"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4 mt-4 md:mt-0"
                    aria-label="Remove item from cart"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};

export default CardModal;
