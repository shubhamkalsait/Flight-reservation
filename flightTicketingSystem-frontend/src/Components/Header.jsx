import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "../Redux-config/UserSlice";
import Logo from "../image/combined logo.png";

export default function Header() {
  const { isLoggedIn, roles } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const isAdmin = roles?.includes("ROLE_ADMIN");

  const tabs = isAdmin
    ? [
        { to: "/flight", icon: "bxs-plane-alt", label: "Flights" },
        { to: "/admin", icon: "bxs-shield", label: "Admin" },
      ]
    : [
        { to: isLoggedIn ? "/search-flights" : "/", icon: "bxs-plane-take-off", label: "Flight tickets" },
        { to: "/check-in", icon: "bx-check-shield", label: "Web check-in" },
      ];

  let right;
  if (isLoggedIn) {
    right = (
      <>
        <li>
          <NavLink to="/my-bookings">
            <i className="bx bx-receipt"></i>
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={isAdmin ? "/admin-profile" : "/profile"}>
            <i className="bx bx-user-circle"></i>
            <span>Account</span>
          </NavLink>
        </li>
        <li>
          <Link to="/" onClick={() => dispatch(signOut())}>
            <i className="bx bx-log-out"></i>
            <span>Log out</span>
          </Link>
        </li>
      </>
    );
  } else {
    right = (
      <>
        <li>
          <NavLink to="/contact">
            <i className="bx bx-help-circle"></i>
            <span>Help</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">
            <i className="bx bx-user-plus"></i>
            <span>Sign up</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <i className="bx bx-user-circle"></i>
            <span>Account</span>
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <>
      <div className="promo-strip">
        <i className="bx bxs-offer"></i> <strong>Get 10% Discount</strong> on
        your first flight booking — use code <strong>FLYFIRST</strong>
      </div>
      <header className="rb-header">
        <div className="inner">
          <div className="rb-brand">
            <Link to="/" className="rb-brand">
              <img src={Logo} alt="Home" className="rb-logo" />
            </Link>
            <ul className="rb-tabs">
              {tabs.map((t) => (
                <li key={t.to}>
                  <NavLink to={t.to} end>
                    <i className={`bx ${t.icon}`}></i>
                    {t.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <ul className="rb-nav">{right}</ul>
        </div>
      </header>
    </>
  );
}
