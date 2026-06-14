const db = require('../db');

class UserRepository {
    create(email, passwordHash) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Users (email, password_hash) VALUES (?, ?)`;
            db.run(sql, [email, passwordHash], function(err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, email });
            });
        });
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Users WHERE email = ?`;
            db.get(sql, [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    setPreferences(userId, minHours, maxHours, interests) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO UserPreferences (user_id, preferred_layover_hours_min, preferred_layover_hours_max, interests)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(user_id) DO UPDATE SET
                    preferred_layover_hours_min = excluded.preferred_layover_hours_min,
                    preferred_layover_hours_max = excluded.preferred_layover_hours_max,
                    interests = excluded.interests
            `;
            db.run(sql, [userId, minHours, maxHours, JSON.stringify(interests)], function(err) {
                if (err) return reject(err);
                resolve(true);
            });
        });
    }
}

module.exports = new UserRepository();
