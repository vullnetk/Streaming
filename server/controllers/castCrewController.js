const mssqlConnection = require('../mssqlConnection');

// Fetch all castCrews
exports.getAllcastCrews = async(req, res) => {
    try {
        const query = 'SELECT * FROM CastCrew';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch castCrews:', error);
        res.status(500).json({ error: 'Failed to fetch castCrews' });
    }
};

// Add a new castCrew
exports.addCastCrew = async (req, res) => {
    const { fullName, roleId } = req.body;
    try {
      const query = `INSERT INTO CastCrew (fullName, roleId) VALUES ('${fullName}', '${roleId}')`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to add castCrew:', error);
      res.status(500).json({ error: 'Failed to add castCrew' });
    }
  };
  

// Edit a castCrew
exports.editCastCrew = async (req, res) => {
    const { id } = req.params;
    const { fullName, roleId } = req.body;
    try {
      const query = `UPDATE CastCrew SET fullName = '${fullName}', roleId = ${roleId} WHERE id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to edit castCrew:', error);
      res.status(500).json({ error: 'Failed to edit castCrew' });
    }
  };
  

// Delete a castCrew
exports.deleteCastCrew = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM CastCrew WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to delete castCrew:', error);
        res.status(500).json({ error: 'Failed to delete castCrew' });
    }
};

//comment