export default function ResultsList({flights}) {
    if (!flights || !flights.flights || flights.flights.length === 0) {
        return (
            <div className="card" style={{textAlign: 'center', padding: 'var(--space-6x)'}}>
                <h3>No Flights Found</h3>
                <p>Try adjusting your search criteria.</p>
            </div>
        );
    }

    return (
        <div>
            {flights.flights.map((flight, i) => (
                <div key={i} className="card">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2x)'}}>
                        <div>
                            <h2 style={{margin: 0, color: 'var(--primary)'}}>{flight.airline}</h2>
                            <p style={{margin: 'var(--space-05x) 0 0 0'}}>
                                ID: {flight.id} • <strong style={{color: 'var(--text-primary)'}}>${flight.price} {flight.currency}</strong>
                            </p>
                        </div>
                        {flight.recommendationScore > 0 && (
                            <div className={flight.recommendationScore >= 10 ? 'badge-score-success' : 'badge-score-accent'}>
                                Match Score: {flight.recommendationScore.toFixed(1)}
                            </div>
                        )}
                    </div>
                    
                    <h3 style={{marginTop: 'var(--space-3x)', borderBottom: `1px solid var(--border-color)`, paddingBottom: 'var(--space-1x)'}}>The Layover Experience</h3>
                    
                    {flight.layovers.map((layover, j) => {
                        const landingTime = layover.landingTime ? new Date(layover.landingTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
                        const leavingTime = layover.leavingTime ? new Date(layover.leavingTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
                        
                        return (
                        <div key={j} style={{background: 'var(--bg-main)', padding: 'var(--space-2x)', borderRadius: '8px', marginTop: 'var(--space-2x)', border: `1px solid var(--border-color)`}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <div>
                                    <strong style={{color: 'var(--text-primary)', fontSize: '16px'}}>{layover.durationHours} Hours in {layover.airportCode}</strong>
                                    {(landingTime && leavingTime) && (
                                        <p style={{fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '500'}}>
                                            Arrive: {landingTime} • Depart: {leavingTime}
                                        </p>
                                    )}
                                </div>
                                {layover.score > 0 && <span style={{color: 'var(--warning)', fontWeight: '600'}}>★ {layover.score.toFixed(1)}</span>}
                            </div>
                            
                            {layover.recommendablePois && layover.recommendablePois.length > 0 ? (
                                <div style={{marginTop: 'var(--space-2x)'}}>
                                    <span className="text-small" style={{color: 'var(--text-secondary)'}}>Recommended Spots & Layover Itinerary:</span>
                                    <div style={{marginTop: 'var(--space-1x)'}}>
                                        {layover.recommendablePois.map((poi, k) => (
                                            <div key={k} style={{background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: 'var(--space-2x)', marginBottom: 'var(--space-1x)'}}>
                                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1x)'}}>
                                                    <strong style={{color: 'var(--primary)'}}>{poi.name}</strong>
                                                    <span style={{color: 'var(--warning)'}}>★ {poi.rating}</span>
                                                </div>
                                                {poi.itinerary && (
                                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2x)', fontSize: '12px', color: 'var(--text-secondary)'}}>
                                                        <span>🛬 Exit: {poi.itinerary.deboarding}m</span>
                                                        <span>🚆 Transit: {poi.itinerary.transitTo}m</span>
                                                        <span style={{color: 'var(--success)', fontWeight: '600'}}>🎯 Explore/Eat: {Math.floor(poi.itinerary.exploreTime / 60)}h {poi.itinerary.exploreTime % 60}m</span>
                                                        <span>🚆 Return: {poi.itinerary.transitBack}m</span>
                                                        <span>🛡️ Check-in/Security: {poi.itinerary.securityBuffer}m</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-small" style={{marginTop: 'var(--space-1x)'}}>
                                    {layover.note || "No specific matches found for your interest here."}
                                </p>
                            )}
                        </div>
                    )})}
                </div>
            ))}
        </div>
    );
}