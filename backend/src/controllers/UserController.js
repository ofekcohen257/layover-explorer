const UserService = require('../services/UserService');

class UserController {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.registerUser(email, password);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Failed to register user' });
        }
    }

    async setPreferences(req, res) {
        try {
            const userId = req.params.userId;
            const { minHours, maxHours, interests } = req.body;
            
            await UserService.savePreferences(userId, minHours, maxHours, interests);
            res.status(200).json({ message: 'Preferences updated successfully' });
        } catch (error) {
            console.error('Preferences error:', error);
            res.status(500).json({ error: 'Failed to update preferences' });
        }
    }
}

module.exports = new UserController();
