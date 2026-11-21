import React, { useEffect, useState } from 'react';
import api from '../api';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import SearchBar from './SearchBar';

function FlightSearch() {
    const location = useLocation();
    const initial = location.state?.search || {};
    const today = new Date().toISOString().split('T')[0];

    const [flights, setFlights] = useState([]);
    const [searched, setSearched] = useState(false);
    const [origin, setOrigin] = useState(initial.origin || '');
    const [destination, setDestination] = useState(initial.destination || '');
    const [departureDate, setDepartureDate] = useState(initial.departureDate || today);
    const { token } = useSelector((store) => store.user);
    const navigate = useNavigate();

    const runSearch = async () => {
        try {
            const formattedDate = departureDate ? new Date(departureDate).toISOString().slice(0, 10) : '';
            const response = await api.get('/flights/search', {
                params: { origin, destination, departureDate: formattedDate },
                headers: { Authorization: `Bearer ${token}` },
            });
            const flightsWithPrices = response.data.map((flight) => ({
                ...flight,
                price: (Math.random() * 15000 + 3500).toFixed(2),
            }));
            setFlights(flightsWithPrices);
            if (flightsWithPrices.length === 0) {
                toast.error("No flights on the selected date");
            }
        } catch (error) {
            setFlights([]);
            toast.error("No flight found...");
            console.log('Error fetching flights:', error);
        } finally {
            setSearched(true);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        runSearch();
    };

    // Auto-run when arriving from the home page search
    useEffect(() => {
        if (initial.origin && initial.destination) runSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBooking = (flight) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        if (flight.departureDate < currentDate) {
            toast.error("Cannot book a flight with a past date.");
        } else {
            navigate("/booking", {
                state: {
                    flightId: flight.id,
                    flightNumber: flight.flightNumber,
                    origin: flight.origin,
                    destination: flight.destination,
                    departureDate: flight.departureDate,
                    flightFare: flight.price,
                },
            });
        }
    };

    return <>
        <ToastContainer />
        <section className="rb-hero" style={{ minHeight: 160 }}>
            <div className="inner" style={{ paddingTop: 36, paddingBottom: 100 }}>
                <h1 style={{ fontSize: '1.8rem' }}>Search flights</h1>
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

        <div className="rb-results">
            {flights.length > 0 && (
                <p className="text-muted mb-3">
                    <strong className="text-dark">{flights.length} flights</strong> found from {origin} to {destination}
                </p>
            )}

            {flights.map((flight, index) => (
                <div className="rb-flight" key={flight.id ?? index}>
                    <div>
                        <div className="num"><i className="bx bxs-plane-alt text-danger"></i> {flight.flightNumber}</div>
                        <div className="meta">{flight.departureDate}</div>
                    </div>
                    <div>
                        <div className="route">
                            <span>{flight.origin}</span>
                            <span className="line"></span>
                            <span>{flight.destination}</span>
                        </div>
                        <div className="meta">Departs {flight.departureTime}</div>
                    </div>
                    <div>
                        <div className="price">₹ {flight.price}</div>
                        <div className="meta text-end">{index + 5} seats left</div>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleBooking(flight)}>
                        Book flight
                    </button>
                </div>
            ))}

            {searched && flights.length === 0 && (
                <div className="rb-empty">
                    <i className="bx bx-search-alt" style={{ fontSize: '3rem' }}></i>
                    <p>No flights found for this route and date. Try another date.</p>
                </div>
            )}
        </div>
    </>
}

export default FlightSearch;
