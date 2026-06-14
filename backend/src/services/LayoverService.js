class LayoverService {
    calculateLayovers(flightsData, minLayoverHours = 4, maxLayoverHours = 24) {
        const processedFlights = [];

        for (const flight of flightsData.flights) {
            const layovers = [];
            
            for (let i = 0; i < flight.segments.length - 1; i++) {
                const currentSegment = flight.segments[i];
                const nextSegment = flight.segments[i+1];
                
                const arrivalTime = new Date(currentSegment.arrivalTime);
                const departureTime = new Date(nextSegment.departureTime);
                
                const durationMinutes = (departureTime - arrivalTime) / (1000 * 60);
                const durationHours = durationMinutes / 60;
                
                if (durationHours >= minLayoverHours && durationHours <= maxLayoverHours) {
                    layovers.push({
                        airportCode: currentSegment.destination,
                        durationMinutes,
                        durationHours,
                        landingTime: currentSegment.arrivalTime,
                        leavingTime: nextSegment.departureTime
                    });
                }
            }

            processedFlights.push({
                ...flight,
                layovers
            });
        }

        return processedFlights;
    }
}

module.exports = new LayoverService();
