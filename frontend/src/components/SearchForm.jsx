import {useState} from 'react';

export default function SearchForm({onResults}) {
    const [from, setFrom] = useState("TLV");
    const [to, setTo] = useState("NYC");
    const [interest, setInterest] = useState("arts");
    const [minLayoverHours, setMinLayoverHours] = useState("4");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `http://localhost:3001/api/flights/search?from=${from}&to=${to}&interest=${interest}&minLayoverHours=${minLayoverHours}`
            );
            if (response.ok) {
                const data = await response.json();
                if (onResults) onResults(data);
            } else {
                if (onResults) onResults({flights: []});
            }
        } catch (error) {
            console.error("Search error", error);
            if (onResults) onResults({flights: []});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Find Your Perfect Layover</h2>
            <p style={{marginBottom: 'var(--space-4x)'}}>
                We'll match your interests with the best layover cities.
            </p>
            <form onSubmit={handleSearch}>
                <div className="grid-2">
                    <div>
                        <label>Origin</label>
                        <input
                            type="text"
                            placeholder="e.g. TLV"
                            value={from}
                            onChange={(e) => setFrom(e.target.value.toUpperCase())}
                            required
                        />
                    </div>
                    <div>
                        <label>Destination</label>
                        <input
                            type="text"
                            placeholder="e.g. NYC"
                            value={to}
                            onChange={(e) => setTo(e.target.value.toUpperCase())}
                            required
                        />
                    </div>
                </div>

                <div className="grid-2" style={{marginTop: 'var(--space-2x)'}}>
                    <div>
                        <label>Your Interest</label>
                        <select
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="arts">Arts & Museums</option>
                            <option value="nightlife">Nightlife & Clubs</option>
                            <option value="food">Food & Dining</option>
                        </select>
                    </div>
                    <div>
                        <label>Min Layover Hours</label>
                        <input
                            type="number"
                            min="1"
                            max="24"
                            value={minLayoverHours}
                            onChange={(e) => setMinLayoverHours(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <div style={{marginTop: 'var(--space-4x)'}}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Searching..." : "Explore Flights"}
                    </button>
                </div>
            </form>
        </div>
    );
}
