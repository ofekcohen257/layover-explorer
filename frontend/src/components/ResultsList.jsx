export default function ResultsList({flights}) {
    if (!flights || !flights.flights) {
        return <p>No results yet. Try searching for a flight.</p>;
    }

    return (
        <div>
            {flights.flights.map((flight, i) => (
                <div key={i} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
                    <h2>Flight: {flight.from} to {flight.to}</h2>
                    <p>Direct price: ${flight.directPrice}</p>
                    <h3>Layovers:</h3>
                    <ul>
                        {flight.layovers.map((layover, j) => (
                            <li key={j}>
                                {layover.city} - {layover.durationHours}h - ${layover.price} -
                                {layover.explore ? "Explore" : "Stay at airport"}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}