import { useGlobalContext } from "../hooks/useGlobalReducer";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { store, actions } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-light bg-light mb-4 px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <img
            src="https://images.seeklogo.com/logo-png/13/1/star-wars-logo-png_seeklogo-131743.png"
            alt="Star Wars"
            height="60"
          />
        </Link>

        <div className="d-flex align-items-center">
          <Link to="/people" className="nav-link mx-2">
            People
          </Link>
          <Link to="/vehicles" className="nav-link mx-2">
            Vehicles
          </Link>
          <Link to="/planets" className="nav-link mx-2">
            Planets
          </Link>

          <div className="dropdown mx-3">
            <button
              className="btn btn-primary dropdown-toggle"
              onClick={toggleDropdown}
              type="button"
            >
              Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
            </button>

            {isOpen && (
              <ul
                className="dropdown-menu show position-absolute end-0 mt-2"
                style={{ minWidth: "200px" }}
              >
                {store.favorites.length === 0 ? (
                  <li className="dropdown-item text-center text-muted">No favorites</li>
                ) : (
                  store.favorites.map((fav, index) => (
                    <li
                      key={index}
                      className="dropdown-item d-flex justify-content-between align-items-center"
                    >
                      <span>{fav.name}</span>
                      <i
                        className="fa-solid fa-trash text-danger"
                        role="button"
                        onClick={() => actions.removeFavorite(fav.uid)}
                      ></i>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
