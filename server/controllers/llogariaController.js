const mssqlConnection = require('../mssqlConnection');

// Fetch all 
exports.getLlogari = async(req, res) => {
    try {
        const query = 'SELECT * FROM Llogaria';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch llogari:', error);
        res.status(500).json({ error: 'Failed to fetch llogari' });
    }
};

// Add 
exports.addLlogari = async(req, res) => {
    const { name } = req.body;
    try {
        const query = `INSERT INTO Llogaria (name) VALUES ('${name}')`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to add llogari:', error);
        res.status(500).json({ error: 'Failed to add llogari' });
    }
};

// Edit 
exports.editLlogari = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const query = `UPDATE Llogaria SET name = '${name}' WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to edit llogari name:', error);
        res.status(500).json({ error: 'Failed to edit llogari name' });
    }
};

// Delete
exports.deleteLlogari = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM Llogari WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to delete llogari:', error);
        res.status(500).json({ error: 'Failed to delete llogari' });
    }
};

//comment