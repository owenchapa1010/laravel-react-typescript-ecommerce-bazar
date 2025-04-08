import { Link, usePage } from "@inertiajs/react";
import CurrencyFormatter from "../Core/CurrencyFormatter";
import { productRoute } from "@/types/helpers";

function MiniCartDropDown() {
  const { totalPrice, totalQuantity, miniCartItems } = usePage().props;

  return (
    <div className="dropdown dropdown-end relative">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle me-2">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item bg-blue-500 text-white">
            {totalQuantity}
          </span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-white dark:bg-gray-800 mt-3 w-[380px] sm:w-[480px] shadow-lg rounded-lg z-50 absolute right-0 border border-gray-200 dark:border-gray-700"
        style={{ top: "100%" }}
      >
        <div className="card-body p-4">
          <span className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {totalQuantity} Items
          </span>

          <div className="my-4 max-h-[300px] overflow-auto custom-scrollbar">
            {miniCartItems.length === 0 ? (
              <div className="py-8 text-gray-500 text-center dark:text-gray-400 flex flex-col items-center">
                <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                You don't have any items yet.
              </div>
            ) : (
              miniCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 mb-2"
                >
                  <Link
                    href={productRoute(item)}
                    className="w-16 h-16 flex justify-center items-center bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-white line-clamp-1">
                      <Link
                        href={productRoute(item)}
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="text-gray-700 dark:text-gray-300 font-medium">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 font-semibold">
                        <CurrencyFormatter amount={item.quantity * item.price} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              <CurrencyFormatter amount={totalPrice} />
            </span>
          </div>

          <div className="card-actions mt-4">
            <Link
              href={route("cart.index")}
              className="btn btn-primary btn-block text-white hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniCartDropDown;