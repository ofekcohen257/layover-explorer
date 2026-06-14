const MockPoiService = require('../services/MockPoiService');

class PoiController {
    async getPois(req, res) {
        try {
            const { city, type } = req.query;
            if (!city) {
                return res.status(400).json({ error: 'City code is required' });
            }
            const pois = await MockPoiService.getPointsOfInterest(city, type);
            res.status(200).json(pois);
        } catch (error) {
            console.error('POI error:', error);
            res.status(500).json({ error: 'Failed to fetch points of interest' });
        }
    }
}

module.exports = new PoiController();
