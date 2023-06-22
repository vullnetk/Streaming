const mssqlConnection = require('../mssqlConnection');

// Fetch all genres
exports.getAllLeagues = async(req, res) => {
    try {
        const query = 'SELECT * FROM Leagues';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch leagues:', error);
        res.status(500).json({ error: 'Failed to fetch leagues' });
    }
};

exports.getLeagueById = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM Leagues WHERE id = ${id}`;
        const result = await mssqlConnection.executeQuery(query);
        if (result.length === 0) {
            return res.status(404).json({ error: 'League not found' });
        }
        res.json(result[0]);
    } catch (error) {
        console.error('Failed to fetch league:', error);
        res.status(500).json({ error: 'Failed to fetch league' });
    }
};

// Add a new genre
exports.addLeague = async(req, res) => {
    const { name, country } = req.body;
    try {
        const query = `
        INSERT INTO Leagues (name,country )
        VALUES ('${name}', '${country}')
      `;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to create league:', error);
        res.status(500).json({ error: 'Failed to create league' });
    }
};

// Edit a genre
exports.editLeague = async(req, res) => {
    const { id } = req.params;
    const { name, country } = req.body;
    try {
        const query = `
        UPDATE Leagues
        SET name = '${name}', country = '${country}'
        WHERE id = ${id}
      `;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to update league:', error);
        res.status(500).json({ error: 'Failed to update league' });
    }
};

// Delete a genre
exports.deleteLeague = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM Leagues WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to delete league:', error);
        res.status(500).json({ error: 'Failed to delete league' });
    }
};