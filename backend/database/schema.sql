CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS UserPreferences (
    user_id INTEGER PRIMARY KEY,
    preferred_layover_hours_min INTEGER DEFAULT 4,
    preferred_layover_hours_max INTEGER DEFAULT 12,
    interests TEXT, -- Stored as JSON string (e.g., ["arts", "nightlife", "food"])
    FOREIGN KEY(user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Airports (
    iata_code TEXT PRIMARY KEY,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    lat REAL,
    lon REAL
);

CREATE TABLE IF NOT EXISTS SearchHistory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    date TEXT NOT NULL,
    selected_flight_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(id)
);
