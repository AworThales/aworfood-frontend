import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMeQuery } from '../../redux/api/userApi';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/api/authApi';
import Search from './Search';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    logout();
    navigate(0); // Refresh page
  };

  const capitalizeFirstLetter = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
        <div className="container px-4">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            Awor<span className="text-danger">Food</span>
          </Link>

          <div className="d-none d-lg-block flex-grow-1 px-3">
            <Search />
          </div>

          <div className="d-none d-lg-flex align-items-center ms-auto gap-3">
            <Link className="nav-link position-relative text-white" to="/cart">
              <i className="fa fa-shopping-cart fs-5"></i>
              <span className="ms-1">Cart</span>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems?.length}
              </span>
            </Link>

            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  id="userMenuDesktop"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user?.avatar ? user?.avatar?.url : '/images/default_avatar.jpg'}
                    alt="User"
                    className="rounded-circle me-2"
                    width="30"
                    height="30"
                  />
                  <span>{ capitalizeFirstLetter(user?.name) }</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="userMenuDesktop">
                  <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/me/orders">My Orders</Link></li>
                  <li><Link className="dropdown-item" to="/me/profile">Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={logoutHandler}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-light">Login</Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileNavbar"
            aria-controls="mobileNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileNavbar"
        aria-labelledby="mobileNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileNavbarLabel">Menu</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Search />
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/cart">
                <i className="fa fa-shopping-cart me-2"></i>Cart
                <span className="badge bg-danger ms-2">{cartItems?.length}</span>
              </Link>
            </li>

            {user ? (
              <li className="nav-item">
                {/* User Info */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  <img
                    src={user?.avatar ? user?.avatar?.url : '/images/default_avatar.jpg'}
                    alt="User"
                    className="rounded-circle"
                    width="30"
                    height="30"
                  />
                  <span>{user?.name}</span>
                </div>

                {/* Accordion Dropdown */}
                <div className="accordion" id="userAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseUser"
                        aria-expanded="false"
                        aria-controls="collapseUser"
                      >
                        Account Options
                      </button>
                    </h2>
                    <div
                      id="collapseUser"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#userAccordion"
                    >
                      <div className="accordion-body p-0">
                        <ul className="list-group list-group-flush list-unstyled">
                          <li><Link className="list-group-item" to="/admin/dashboard">Dashboard</Link></li>
                          <li><Link className="list-group-item" to="/me/orders">My Orders</Link></li>
                          <li><Link className="list-group-item" to="/me/profile">Profile</Link></li>
                          <li><button className="list-group-item text-danger" onClick={logoutHandler}>Logout</button></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login" className="btn btn-outline-dark w-100 mt-2">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
