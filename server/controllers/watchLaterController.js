const mssqlConnection = require('../mssqlConnection');

// Controller method to save the user ID and movie ID into the WatchLater table
exports.addToWatchLater = async (req, res) => {
  const { movieId, userId } = req.body;
  console.log(req.body);
  console.log(movieId);
  console.log(userId)
  try {
    const query = `
      INSERT INTO Watchlater (MovieId, UserId)
      VALUES ('${movieId}', '${userId}')
    `;
    await mssqlConnection.executeQuery(query);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to add this movie to watchLater List:', error);
    res.status(500).json({ error: 'Failed to add this movie to watchLater List' });
  }
};

//user wishlist
exports.getUserWatchLaterList = async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `SELECT * FROM WatchLater WHERE UserId = '${userId}'`;
    const result = await mssqlConnection.executeQuery(query);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to fetch user WatchLaterList:', error);
    res.status(500).json({ error: 'Failed to fetch user WatchLaterList' });
  }
};

// Remove a movie from the user's WatchLater list
exports.removeFromWatchLater = async (req, res) => {
    const { movieId, userId } = req.params;
  
    try {
      const query = `
        DELETE FROM WatchLater
        WHERE MovieId = '${movieId}' AND UserId = '${userId}'
      `;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to remove movie from WatchLater list:', error);
      res.status(500).json({ error: 'Failed to remove movie from WatchLater list' });
    }
  };