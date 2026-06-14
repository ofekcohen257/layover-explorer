const UserRepository = require('../repositories/UserRepository');

class UserService {
    async registerUser(email, password) {
        // In a real app we'd hash the password here (e.g., using bcrypt)
        const passwordHash = password; // DUMMY implementation for now
        return await UserRepository.create(email, passwordHash);
    }

    async getUser(email) {
        return await UserRepository.findByEmail(email);
    }

    async savePreferences(userId, minHours, maxHours, interests) {
        return await UserRepository.setPreferences(userId, minHours, maxHours, interests);
    }
}

module.exports = new UserService();
