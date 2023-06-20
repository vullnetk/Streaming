const mssqlConnection = require('../mssqlConnection');

// Fetch all genres
exports.getAllartikujt = async(req, res) => {
    try {
        const query = 'SELECT * FROM Artikulli';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch artikujt:', error);
        res.status(500).json({ error: 'Failed to fetch artikujt' });
    }
};

// Add a new genre
exports.addArtikuj = async(req, res) => {
    const { name,title } = req.body;
    try {
        const query = `INSERT INTO Artikulli (name,title) VALUES ('${name}','${title}')`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to add artikulli:', error);
        res.status(500).json({ error: 'Failed to add artikulli' });
    }
};

// Edit a artikull
exports.editArtikulli = async(req, res) => {
    const { id } = req.params;
    const { name,title } = req.body;
    try {
        const query = `UPDATE Artikulli SET name = '${name}', title = '${title}' WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to edit artikulli:', error);
        res.status(500).json({ error: 'Failed to edit artikulli' });
    }
};

// Delete a genre
exports.deleteArtikulli = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM Artikulli WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to delete artikulli:', error);
        res.status(500).json({ error: 'Failed to delete artikulli' });
    }
};

//comment