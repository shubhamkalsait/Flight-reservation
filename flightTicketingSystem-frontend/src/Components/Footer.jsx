import { Link } from "react-router-dom";
import Logo from "../image/combined logo.png";

const columns = [
  {
    title: "About",
    links: [
      { label: "About us", to: "/" },
      { label: "Contact us", to: "/contact" },
    ],
  },
  {
    title: "Book",
    links: [
      { label: "Flight tickets", to: "/search-flights" },
      { label: "Web check-in", to: "/check-in" },
    ],
  },
  {
    title: "Your trips",
    links: [
      { label: "My bookings", to: "/my-bookings" },
      { label: "Print e-ticket", to: "/my-bookings" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", to: "/login" },
      { label: "Sign up", to: "/register" },
      { label: "Profile", to: "/profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help & FAQ", to: "/contact" },
      { label: "Terms & Conditions", to: "/contact" },
      { label: "Privacy policy", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="rb-footer">
      <div className="inner">
        <div className="cols">
          {columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bottom">
          <div className="d-flex align-items-center gap-3">
            <img src={Logo} alt="" style={{ height: 32 }} />
            <span>
              Book flights, check in online and download e-tickets in a few
              clicks.
            </span>
          </div>
          <div className="social">
            <i className="bx bxl-github"></i>
            <i className="bx bxl-linkedin-square"></i>
            <i className="bx bxl-twitter"></i>
            <i className="bx bxl-instagram"></i>
          </div>
        </div>
        <p className="mt-3 mb-0 text-muted">
          &copy; {new Date().getFullYear()} Flight Reservation System. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
