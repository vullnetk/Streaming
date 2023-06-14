const mssqlConnection = require('../mssqlConnection');

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
      const query = 'SELECT * FROM Movie';
      const result = await mssqlConnection.executeQuery(query);
      res.json(result);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  };
  
// Get a single movie by ID
exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
      const query = `SELECT * FROM Movie WHERE id = ${id}`;
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
  exports.createMovie = async (req, res) => {
    const { Title, MovieYear, Description, CoverImage, MovieLink, isPg, genreId } = req.body;
    try {
      const query = `
        INSERT INTO Movie (Title, MovieYear, Description, CoverImage, MovieLink, isPg, genreId)
        VALUES ('${Title}', ${MovieYear}, '${Description}', '${CoverImage}', '${MovieLink}', ${isPg ? 1 : 0}, ${genreId})
      `;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to create movie:', error);
      res.status(500).json({ error: 'Failed to create movie' });
    }
  };

  // Update a movie
  exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { Title, MovieYear, Description, CoverImage, MovieLink, isPg, genreId } = req.body;
    try {
      const query = `
        UPDATE Movie
        SET Title = '${Title}', MovieYear = ${MovieYear}, Description = '${Description}', CoverImage = '${CoverImage}',
        MovieLink = '${MovieLink}', isPg = ${isPg ? 1 : 0}, genreId = ${genreId}
        WHERE id = ${id}
      `;
      await mssqlConnection.executeQuery(query);
      console.log('aaaaaaaaa');
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to update movie:', error);
      res.status(500).json({ error: 'Failed to update movie' });
    }
  };
  
  // Delete a movie
  exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const query = `DELETE FROM Movie WHERE id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to delete movie:', error);
      res.status(500).json({ error: 'Failed to delete movie' });
    }
  };