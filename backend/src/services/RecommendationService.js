const MockPoiService = require('./MockPoiService');

class RecommendationService {
    /**
     * Scores a list of flights with layovers based on user interest
     * @param {Array} flightsWithLayovers - Flights that already have calculated layovers
     * @param {string} userInterest - The category the user is interested in (arts, food, nightlife)
     * @returns {Array} - The flights enriched with POIs and a score, sorted by score descending
     */
    async scoreFlights(flightsWithLayovers, userInterest) {
        const scoredFlights = [];

        for (const flight of flightsWithLayovers) {
            let totalFlightScore = 0;
            const enrichedLayovers = [];

            for (const layover of flight.layovers) {
                const deboardingMinutes = 45; // time to exit airport
                const securityCheckInMinutes = 120; // buffer to return and go through security
                const airportBufferMinutes = deboardingMinutes + securityCheckInMinutes; 
                let availableTimeMinutes = layover.durationMinutes - airportBufferMinutes;

                if (availableTimeMinutes <= 0) {
                    enrichedLayovers.push({ ...layover, score: 0, recommendablePois: [], note: "Not enough time to leave airport" });
                    continue;
                }

                // Fetch POIs for the layover city based on interest
                const { pointsOfInterest } = await MockPoiService.getPointsOfInterest(layover.airportCode, userInterest);
                
                let layoverScore = 0;
                const recommendablePois = [];

                for (const poi of pointsOfInterest) {
                    const transitTimeOneWay = poi.estimatedTransitTimeMinutesFromLocation;
                    const roundtripTransitTime = transitTimeOneWay * 2;
                    const exploreTimeMinutes = availableTimeMinutes - roundtripTransitTime;

                    if (exploreTimeMinutes >= 60) {
                        layoverScore += poi.rating; 
                        recommendablePois.push({
                            ...poi,
                            itinerary: {
                                deboarding: deboardingMinutes,
                                transitTo: transitTimeOneWay,
                                exploreTime: exploreTimeMinutes,
                                transitBack: transitTimeOneWay,
                                securityBuffer: securityCheckInMinutes
                            }
                        });
                    }
                }

                // If no interest was provided, or if we found matches, add to total
                if (!userInterest || recommendablePois.length > 0) {
                    // Boost score if they found matching POIs
                    totalFlightScore += (layoverScore + (recommendablePois.length * 5)); 
                }

                enrichedLayovers.push({
                    ...layover,
                    score: layoverScore,
                    recommendablePois
                });
            }

            scoredFlights.push({
                ...flight,
                layovers: enrichedLayovers,
                recommendationScore: totalFlightScore
            });
        }

        // Sort flights from highest recommendation score to lowest
        return scoredFlights.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
}

module.exports = new RecommendationService();
