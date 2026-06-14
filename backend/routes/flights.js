const express = require('express');
const router = express.Router();
const MockFlightService = require('../src/services/MockFlightService');
const LayoverService = require('../src/services/LayoverService');
const RecommendationService = require('../src/services/RecommendationService');

router.get('/search', async (req, res) => {
    try {
        const {from, to, date, interest, minLayoverHours = 4} = req.query;
        
        // Fetch raw flights from mock Amadeus
        const rawFlights = await MockFlightService.searchFlights(from, to, date);
        
        // Process them to find layovers
        const processedFlights = LayoverService.calculateLayovers(rawFlights, parseInt(minLayoverHours));
        
        // Return only flights that actually have layovers
        const layoverFlights = processedFlights.filter(f => f.layovers.length > 0);

        if (layoverFlights.length > 0) {
            // Apply Recommendation Engine scoring
            const scoredFlights = await RecommendationService.scoreFlights(layoverFlights, interest);

            res.json({
                flights: scoredFlights,
                userInterest: interest || "none",
                minLayoverHours: minLayoverHours
            });
        } else {
            res.status(404).json({error: "No layover flights found matching criteria"});
        }
    } catch (error) {
        console.error('Flight search error:', error);
        res.status(500).json({ error: 'Failed to search flights' });
    }
});

module.exports = router;