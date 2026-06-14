class MockFlightService {
    async searchFlights(origin, dest, date) {
        // Mock Amadeus-style response
        const mockFlights = [
            {
                id: "mock_flight_1",
                airline: "British Airways",
                price: 600.00,
                currency: "USD",
                segments: [
                    {
                        origin: "TLV",
                        destination: "LHR",
                        departureTime: "2026-04-15T08:00:00Z",
                        arrivalTime: "2026-04-15T11:30:00Z"
                    },
                    {
                        origin: "LHR",
                        destination: "JFK",
                        departureTime: "2026-04-15T18:30:00Z",
                        arrivalTime: "2026-04-15T21:00:00Z"
                    }
                ]
            },
            {
                id: "mock_flight_2",
                airline: "Air France",
                price: 650.00,
                currency: "USD",
                segments: [
                    {
                        origin: "TLV",
                        destination: "CDG",
                        departureTime: "2026-04-15T06:00:00Z",
                        arrivalTime: "2026-04-15T10:00:00Z"
                    },
                    {
                        origin: "CDG",
                        destination: "JFK",
                        departureTime: "2026-04-15T20:00:00Z",
                        arrivalTime: "2026-04-15T22:30:00Z"
                    }
                ]
            },
            {
                id: "mock_flight_3",
                airline: "Lufthansa",
                price: 450.00,
                currency: "USD",
                segments: [
                    {
                        origin: "TLV",
                        destination: "FRA",
                        departureTime: "2026-04-15T05:00:00Z",
                        arrivalTime: "2026-04-15T08:30:00Z"
                    },
                    {
                        origin: "FRA",
                        destination: "CDG",
                        departureTime: "2026-04-15T12:00:00Z",
                        arrivalTime: "2026-04-15T13:30:00Z"
                    }
                ]
            },
            {
                id: "mock_flight_bkk",
                airline: "Thai Airways",
                price: 850.00,
                currency: "USD",
                segments: [
                    {
                        origin: "TLV",
                        destination: "BKK",
                        departureTime: "2026-04-15T09:00:00Z",
                        arrivalTime: "2026-04-15T18:00:00Z"
                    },
                    {
                        origin: "BKK",
                        destination: "SIN",
                        departureTime: "2026-04-16T02:00:00Z",
                        arrivalTime: "2026-04-16T04:30:00Z"
                    }
                ]
            },
            {
                id: "mock_flight_direct",
                airline: "El Al",
                price: 1000.00,
                currency: "USD",
                segments: [
                    {
                        origin: "TLV",
                        destination: "JFK",
                        departureTime: "2026-04-15T10:00:00Z",
                        arrivalTime: "2026-04-15T15:00:00Z"
                    }
                ]
            }
        ];

        const filteredFlights = mockFlights.filter(f => {
            const firstSeg = f.segments[0];
            const lastSeg = f.segments[f.segments.length - 1];
            
            const matchOrigin = firstSeg.origin === origin || (origin === 'NYC' && firstSeg.origin === 'JFK');
            const matchDest = lastSeg.destination === dest || (dest === 'NYC' && lastSeg.destination === 'JFK');
            
            return matchOrigin && matchDest;
        });

        return { flights: filteredFlights };
    }
}

module.exports = new MockFlightService();
