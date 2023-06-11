const mssqlConnection = require('../mssqlConnection');

// Fetch all genres
exports.getAllcastCrewRoles = async(req, res) => {
    try {
        const query = 'SELECT * FROM CastCrewRole';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch cast crew roles:', error);
        res.status(500).json({ error: 'Failed to fetch cast crew roles' });
    }
};

// Add a new genre
exports.addCastCrewRole = async(req, res) => {
    const { role } = req.body;
    try {
        const query = `INSERT INTO CastCrewRole (role) VALUES ('${role}')`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to add cast crew role:', error);
        res.status(500).json({ error: 'Failed to add cast crew roles' });
    }
};

// Edit a genre
exports.editCastCrewRole = async(req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const query = `UPDATE CastCrewRole SET role = '${role}' WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to edit cast crew roles:', error);
        res.status(500).json({ error: 'Failed to edit cast crew roles' });
    }
};

// Delete a genre
exports.deleteCastCrewRole = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM CastCrewRole WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to delete cast crew roles:', error);
        res.status(500).json({ error: 'Failed to delete cast crew roles' });
    }
};