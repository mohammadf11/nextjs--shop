import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from 'js-cookie'

function Navbar() {
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const { auth } = state;
  const isActive = (rout: string) => {
    if (rout == router.pathname) return "active";
    else return "";
  };
  const handleLogout = () => {

    Cookie.remove('refresh_token',{path: "api/auth/accessToken",})
    localStorage.removeItem('firstLogin')
    dispatch({
      type: "AUTH",
      payload: {},
    });
    dispatch({
      type: "NOTIFY",
      payload: {success:"Logged out!"},
    });
  };
  
  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown text-bg-success rounded">
        <Link legacyBehavior href="/user">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={auth.user?.avatar}
              alt={auth.user?.avatar}
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                transform: "translateY(-3px)",
                marginRight: "10px",
              }}
            />
            {auth.user?.name}
          </a>
        </Link>
        <ul className="dropdown-menu">
          <li>
            <Link legacyBehavior href="/Profile">
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </li>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link legacyBehavior href="/">
          <a className="navbar-brand">DEVAT</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ">
            <li className="nav-item text-bg-info me-2 rounded ">
              <Link legacyBehavior href="/cart">
                <a className={"nav-link" + isActive("cart")}>
                  <i className="fa fa-shopping-cart"></i>
                  <span className="ms-1">Cart</span>
                </a>
              </Link>
            </li>
            {Object.keys(auth).length == 0 ? (
              <li className="nav-item text-bg-warning me-2 rounded">
                <Link legacyBehavior href="/signin">
                  <a className={"nav-link" + isActive("signin")}>
                    <i className="fa fa-user"></i>
                    <span className="ms-1">Sing In</span>
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
