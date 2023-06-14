const mssqlConnection = require('../mssqlConnection');

// Fetch all wishlists
exports.getAllWishlists = async (req, res) => {
    try {
      const query = 'SELECT * FROM Wishlist';
      const result = await mssqlConnection.executeQuery(query);
      res.json(result);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
  };

  // Add a new wishlist
  exports.addToWishlist = async (req, res) => {
    const { MovieTitle, MovieYear, MovieCountry, Genre, Description, UserId } = req.body;
    try {
      const query = `
        INSERT INTO Wishlist (MovieTitle, MovieYear, MovieCountry, Genre, Description, UserId)
        VALUES ('${MovieTitle}', ${MovieYear}, '${MovieCountry}', '${Genre}', '${Description}', '${UserId}')
      `;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to create wishlist:', error);
      res.status(500).json({ error: 'Failed to create wishlist' });
    }
  };

  // Approve Request
  exports.approveRequest = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = `UPDATE Wishlist SET IsApproved = 1 WHERE Id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to update request status:', error);
      res.status(500).json({ error: 'Failed to update request status' });
    }
  };
  
  //Reject Request
  exports.rejectRequest = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = `UPDATE Wishlist SET IsApproved = -1 WHERE Id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to update request status:', error);
      res.status(500).json({ error: 'Failed to update request status' });
    }
  };
  
  //user wishlist
  exports.getUserWishlists = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const query = `SELECT * FROM Wishlist WHERE UserId = '${userId}'`;
      const result = await mssqlConnection.executeQuery(query);
      res.status(200).json(result);
    } catch (error) {
      console.error('Failed to fetch user wishlists:', error);
      res.status(500).json({ error: 'Failed to fetch user wishlists' });
    }
  };
  