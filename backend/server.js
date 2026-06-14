const express = require('express');
const cors = require('cors');//using cors to connect between two local host ports.
const flightsRouter = require('./routes/flights');
const userRoutes = require('./src/routes/userRoutes');
const poiRoutes = require('./src/routes/poiRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/flights", flightsRouter);
app.use("/api/users", userRoutes);
app.use("/api/poi", poiRoutes);
const PORT = 3001;

app.get("/api/test", (req, res) => {
    res.json({message: "backend works"});
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});