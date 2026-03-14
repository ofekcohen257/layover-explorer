const express = require('express');
const router = express.Router();

// Example flight data (later i will replace this with real logic)
const flights = [
    {
        from:"TLV",
        to:"NYC",
        layovers: [
            {city: "London",durationHours: 5, price: 600, explore: false},
            {city: "Paris",durationHours: 5, price: 550, explore: true}
        ],
        directPrice: 1000,
    },
    {
        from: "TLV",
        to: "NYC",
        layovers: [
            { city: "Amsterdam", durationHours: 8, price: 580, explore: true },
        ],
        directPrice: 980,
    },
];

router.get('/search', (req, res) => {
    const {from, to, interest, minLayoverHours} = req.query;

    const results = flights.filter(
        //(f) is a single element from the array
        (f) => f.from === from && f.to === to
    )
    //meanwhile return first match, will write logic based on parameters later.
    if (results.length > 0) {
        res.json({
            flights: results,
            userInterest: interest || "none",
            minLayoverHours: minLayoverHours || 0,
        });
    } else {
        res.status(404).json({error: "No flights found"});
    }
});

module.exports = router;