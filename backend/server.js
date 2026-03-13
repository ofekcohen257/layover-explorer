const express = require('express');
const app = express();
const PORT = 3001;

app.get("/api/test", (req, res) => {
    res.json({message: "backend works"});
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});