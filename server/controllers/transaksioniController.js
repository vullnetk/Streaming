const mssqlConnection = require('../mssqlConnection');

// Fetch all
exports.getTransaksione = async(req, res) => {
    try {
        const query = 'SELECT * FROM Transaksioni';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch transaksioni:', error);
        res.status(500).json({ error: 'Failed to fetch transaksioni' });
    }
};

// Add
exports.addTransaksioni = async (req, res) => {
    const { name, llogariaId } = req.body;
    try {
      const query = `INSERT INTO Transaksioni (name, llogariaId) VALUES ('${name}', '${llogariaId}')`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to add transaksioni:', error);
      res.status(500).json({ error: 'Failed to add transaksioni' });
    }
  };
  

// Edit
exports.editTransaksioni = async (req, res) => {
    const { id } = req.params;
    const { name, llogariaId } = req.body;
    try {
      const query = `UPDATE Transaksioni SET name = '${name}', llogariaId = ${llogariaId} WHERE id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to edit transaksioni:', error);
      res.status(500).json({ error: 'Failed to edit transaksioni' });
    }
  };
  

// Delete
exports.deleteTransaksioni = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM Transaksioni WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to transaksioni:', error);
        res.status(500).json({ error: 'Failed to delete transaksioni' });
    }
};

//comment