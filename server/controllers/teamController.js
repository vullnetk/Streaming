const mssqlConnection = require('../mssqlConnection');

// Get all movies
exports.getAllTeams = async(req, res) => {
    try {
        const query = 'SELECT * FROM Team';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch teams:', error);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};

// Get a single movie by ID
exports.getTeamById = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM Team WHERE id = ${id}`;
        const result = await mssqlConnection.executeQuery(query);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(result[0]);
    } catch (error) {
        console.error('Failed to fetch movie:', error);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
};

// Create a new movie
exports.createTeam = async(req, res) => {
    const { title, city, leagueId } = req.body;
    try {
        const query = `
        INSERT INTO Team (title, city, leagueId)
        VALUES ('${title}','${city}', ${leagueId})
      `;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to create movie:', error);
        res.status(500).json({ error: 'Failed to create movie' });
    }
};

// Update a movie
exports.updateTeam = async(req, res) => {
    const { id } = req.params;
    const { title, city, leagueId } = req.body;
    try {
        const query = `
        UPDATE Team
        SET title = '${title}', city = '${city}', leagueId = ${leagueId}
        WHERE id = ${id}
      `;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to update movie:', error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
};

// Delete a movie
exports.deleteTeam = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const query = `DELETE FROM Team WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to delete movie:', error);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};