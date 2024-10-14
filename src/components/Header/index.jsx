import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

export default function NavBar({ cart, quantity = 0 }) {
  const [showModal, setShowModal] = useState(false);
  const [cartValue, setCartValue] = useState([]);

  const handleCartClick = (e) => {
    setCartValue(cart);
    e.preventDefault(); // Prevent page reload
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    console.log(cartValue);
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#!">
            TSK Shopping
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home/MensTees"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home/mens"
                    >
                      Mens Collections
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home/womens"
                    >
                      Womens Collections
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <button
              className="btn btn-outline-dark"
              type="button"
              onClick={handleCartClick}
            >
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                {quantity}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="cartModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cartModalLabel">
                  Your Cart
                </h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {cartValue && cartValue.length > 0 ? (
                  <ul>
                    {cartValue.map((item, index) => (
                      <li key={index}>
                        <strong>
                          {item.name} - ${item.actualCost}
                        </strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

NavBar.propTypes = {
  quantity: PropTypes.number,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
