const toISO = (d) => d.toISOString().slice(0, 10);

export default function SearchBar({
  origin,
  destination,
  departureDate,
  setOrigin,
  setDestination,
  setDepartureDate,
  onSubmit,
}) {
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);

  const swap = (e) => {
    e.preventDefault();
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <form className="rb-search-wrap" onSubmit={onSubmit}>
      <div className="rb-search">
        <div className="rb-field">
          <i className="bx bxs-plane-take-off"></i>
          <div className="flex-grow-1">
            <label htmlFor="origin">From</label>
            <input
              id="origin"
              placeholder="Origin city"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </div>
          <button type="button" className="rb-swap" onClick={swap} aria-label="Swap cities">
            <i className="bx bx-transfer-alt"></i>
          </button>
        </div>
        <div className="rb-field">
          <i className="bx bxs-plane-land"></i>
          <div className="flex-grow-1">
            <label htmlFor="destination">To</label>
            <input
              id="destination"
              placeholder="Destination city"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="rb-field">
          <i className="bx bx-calendar"></i>
          <div className="flex-grow-1">
            <label htmlFor="date">Date of journey</label>
            <input
              id="date"
              type="date"
              min={toISO(today)}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <button type="button" className="rb-chip" onClick={() => setDepartureDate(toISO(today))}>
            Today
          </button>
          <button type="button" className="rb-chip" onClick={() => setDepartureDate(toISO(tomorrow))}>
            Tomorrow
          </button>
        </div>
      </div>
      <button type="submit" className="rb-search-btn">
        <i className="bx bx-search"></i> Search flights
      </button>
    </form>
  );
}
