class MockPoiService {
    async getPointsOfInterest(cityCode, type) {
        const mockDb = {
            "LHR": [
                { id: "poi_lhr_1", name: "The British Museum", category: "arts", rating: 4.8, estimatedTransitTimeMinutesFromLocation: 45 },
                { id: "poi_lhr_2", name: "Fabric London", category: "nightlife", rating: 4.5, estimatedTransitTimeMinutesFromLocation: 50 },
                { id: "poi_lhr_3", name: "Dishoom", category: "food", rating: 4.9, estimatedTransitTimeMinutesFromLocation: 40 }
            ],
            "CDG": [
                { id: "poi_cdg_1", name: "The Louvre", category: "arts", rating: 4.9, estimatedTransitTimeMinutesFromLocation: 40 },
                { id: "poi_cdg_2", name: "Le Caveau de la Huchette", category: "nightlife", rating: 4.6, estimatedTransitTimeMinutesFromLocation: 50 },
                { id: "poi_cdg_3", name: "Le Meurice", category: "food", rating: 4.7, estimatedTransitTimeMinutesFromLocation: 45 }
            ],
            "BKK": [
                { id: "poi_bkk_1", name: "Wat Pho", category: "arts", rating: 4.8, estimatedTransitTimeMinutesFromLocation: 45 },
                { id: "poi_bkk_2", name: "Khaosan Road", category: "nightlife", rating: 4.4, estimatedTransitTimeMinutesFromLocation: 50 },
                { id: "poi_bkk_3", name: "Jay Fai", category: "food", rating: 4.7, estimatedTransitTimeMinutesFromLocation: 40 }
            ]
        };

        const cityPois = mockDb[cityCode] || [];
        if (type) {
            return { pointsOfInterest: cityPois.filter(poi => poi.category === type) };
        }
        return { pointsOfInterest: cityPois };
    }
}

module.exports = new MockPoiService();
