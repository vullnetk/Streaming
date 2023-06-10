const mssqlConnection = require('../mssqlConnection');

// Fetch all genres
exports.getAllGenres = async (req, res) => {
    try {
      const query = 'SELECT * FROM Genres';
      const result = await mssqlConnection.executeQuery(query);
      res.json(result);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      res.status(500).json({ error: 'Failed to fetch genres' });
    }
  };

  // Add a new genre
  exports.addGenre = async (req, res) => {
    const { name } = req.body;
    try {
      const query = `INSERT INTO Genres (name) VALUES ('${name}')`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to add genre:', error);
      res.status(500).json({ error: 'Failed to add genre' });
    }
  };

  // Edit a genre
exports.editGenre = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const query = `UPDATE Genres SET name = '${name}' WHERE id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to edit genre:', error);
      res.status(500).json({ error: 'Failed to edit genre' });
    }
  };
  
  // Delete a genre
  exports.deleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
      const query = `DELETE FROM Genres WHERE id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to delete genre:', error);
      res.status(500).json({ error: 'Failed to delete genre' });
    }
  };