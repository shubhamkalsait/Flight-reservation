import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const offers = [
  { tag: "Flight", title: "Save up to ₹500 on domestic flights", code: "FLYFIRST", bg: "bg-pink", art: "bxs-plane-alt", type: "flight" },
  { tag: "Flight", title: "Flat ₹300 off on weekday departures", code: "WEEKDAY300", bg: "bg-yellow", art: "bxs-calendar-star", type: "flight" },
  { tag: "Check-in", title: "Skip the queue with free web check-in", code: "WEBCHECK", bg: "bg-blue", art: "bx-check-shield", type: "checkin" },
  { tag: "Flight", title: "Extra 10% off on round trips", code: "ROUND10", bg: "bg-pink", art: "bxs-briefcase-alt-2", type: "flight" },
];

const features = [
  { cls: "f-purple", icon: "bxs-shield-plus", title: "Travel protection", text: "Secure your journey with trip assistance." },
  { cls: "f-maroon", icon: "bx-revision", title: "Free cancellation", text: "Get 100% refund on eligible cancellations." },
  { cls: "f-light", icon: "bx-time-five", title: "Live flight status", text: "Track departures and arrivals in real time." },
  { cls: "f-sky", icon: "bxs-calendar-edit", title: "Flexi ticket", text: "Change your travel date at no extra cost." },
];

const testimonials = [
  { text: "Booking took less than a minute and the e-ticket arrived instantly.", name: "Amol B.", since: "Customer since 2022" },
  { text: "Web check-in was smooth — no queues at the airport.", name: "Priya S.", since: "Customer since 2023" },
  { text: "Great prices and a really clean booking experience.", name: "Rahul K.", since: "Customer since 2021" },
];

const faqs = [
  { q: "How do I book a flight?", a: "Log in, enter your origin, destination and date, pick a flight from the results and complete passenger details and payment." },
  { q: "How do I check in online?", a: "Use Web check-in from the header, log in, and enter your booking ID to check in and get your boarding details." },
  { q: "Where can I download my ticket?", a: "Open Bookings from the header and use Download Ticket next to any upcoming trip." },
  { q: "Do I need an account to book?", a: "Yes — create a free account so your bookings and tickets are saved in one place." },
];

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().slice(0, 10));
  const [filter, setFilter] = useState("all");
  const { isLoggedIn } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const search = { origin, destination, departureDate };
    navigate(isLoggedIn ? "/search-flights" : "/login", { state: { search } });
  };

  const shownOffers = offers.filter((o) => filter === "all" || o.type === filter);

  return (
    <main>
      <section className="rb-hero">
        <div className="inner">
          <h1>
            India's simple
            <br />
            flight booking site
          </h1>
          <i className="bx bxs-plane hero-plane"></i>
        </div>
      </section>

      <SearchBar
        origin={origin}
        destination={destination}
        departureDate={departureDate}
        setOrigin={setOrigin}
        setDestination={setDestination}
        setDepartureDate={setDepartureDate}
        onSubmit={handleSearch}
      />

      <section className="rb-section">
        <div className="rb-section-head">
          <h2>Offers for you</h2>
        </div>
        <div className="rb-filter">
          {["all", "flight", "checkin"].map((f) => (
            <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
              {f === "all" ? "All" : f === "flight" ? "Flight" : "Check-in"}
            </button>
          ))}
        </div>
        <div className="rb-grid">
          {shownOffers.map((o) => (
            <div key={o.code} className={`rb-offer ${o.bg}`}>
              <div>
                <span className="tag">{o.tag}</span>
                <h3>{o.title}</h3>
                <small>Valid till 31 Dec</small>
              </div>
              <span className="code">
                <i className="bx bx-purchase-tag-alt"></i> {o.code}
              </span>
              <i className={`bx ${o.art} art`}></i>
            </div>
          ))}
        </div>
      </section>

      <section className="rb-section">
        <h2>Already booked?</h2>
        <p className="sub">Check in online and download your e-ticket</p>
        <div className="rb-strip">
          <span>
            Save time at the airport with <strong>Web check-in</strong>
          </span>
          <div className="d-flex gap-2">
            <Link to="/my-bookings" className="btn">My bookings</Link>
            <Link to="/check-in" className="btn">Check in now</Link>
          </div>
        </div>
      </section>

      <section className="rb-section">
        <h2>What's new</h2>
        <div className="rb-grid mt-3">
          {features.map((f) => (
            <div key={f.title} className={`rb-feature ${f.cls}`}>
              <i className={`bx ${f.icon}`}></i>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rb-section">
        <h2>Testimonials</h2>
        <p className="sub">Hear from our satisfied customers in their own words</p>
        <div className="rb-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="rb-testimonial">
              <p className="mb-3">{t.text}</p>
              <div>
                <strong>{t.name}</strong>
                <small>{t.since}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rb-section">
        <div className="rb-app-banner">
          <div>
            <h3>Grab 10% off now</h3>
            <p className="mb-0">Book your first flight and unlock the offer</p>
          </div>
          <Link to={isLoggedIn ? "/search-flights" : "/register"} className="btn">
            {isLoggedIn ? "Book now" : "Create free account"}
          </Link>
        </div>
      </section>

      <section className="rb-section rb-faq">
        <h2>FAQs related to flight booking</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
