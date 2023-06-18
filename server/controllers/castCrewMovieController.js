const mssqlConnection = require('../mssqlConnection');

// Get all castCrewMovies
exports.getAllCastCrewMovies = async (req, res) => {
  try {
    const query = 'SELECT * FROM CastCrewMovie';
    const result = await mssqlConnection.executeQuery(query);
    res.json(result);
  } catch (error) {
    console.error('Failed to fetch castCrewMovies:', error);
    res.status(500).json({ error: 'Failed to fetch castCrewMovies' });
  }
};

// Add a new castCrewMovie
exports.createCastCrewMovie = async (req, res) => {
  const { castCrewId, movieId } = req.body;
  try {
    const query = `
      INSERT INTO CastCrewMovie (castCrewId, movieId)
      VALUES (${castCrewId}, ${movieId})
    `;
    await mssqlConnection.executeQuery(query);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to create castCrewMovie:', error);
    res.status(500).json({ error: 'Failed to create castCrewMovie' });
  }
};

// Update a castCrewMovie
exports.updateCastCrewMovie = async (req, res) => {
  const { id } = req.params;
  const { castCrewId, movieId } = req.body;
  try {
    const query = `
      UPDATE CastCrewMovie
      SET castCrewId = ${castCrewId}, movieId = ${movieId}
      WHERE id = ${id}
    `;
    await mssqlConnection.executeQuery(query);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to update castCrewMovie:', error);
    res.status(500).json({ error: 'Failed to update castCrewMovie' });
  }
};

// Delete a castCrewMovie
exports.deleteCastCrewMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM CastCrewMovie WHERE id = ${id}`;
    await mssqlConnection.executeQuery(query);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to delete castCrewMovie:', error);
    res.status(500).json({ error: 'Failed to delete castCrewMovie' });
  }
};
