const mssqlConnection = require('./mssqlConnection');
// const existingTables = ['Genres']; // Add the names of existing tables

const getExistingTables = async() => {
    try {
        const query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`;
        const result = await mssqlConnection.executeQuery(query);
        return result.map(row => row.TABLE_NAME);
    } catch (error) {
        console.error('Failed to fetch existing tables:', error);
        return [];
    }
};

const generateTables = async() => {
    const existingTables = await getExistingTables();

    const newTables = ['Genres', 'Leagues', 'Team', 'CastCrewRole', 'CastCrew', 'Movie', 'Wishlist', 'Watchlater']; // Add the names of new tables to be created

    for (const table of newTables) {
        if (!existingTables.includes(table)) {
            let createTableQuery = '';

            switch (table) {
                case 'Genres':
                    createTableQuery = `
            CREATE TABLE Genres (
              id INT IDENTITY(1,1) PRIMARY KEY,
              name VARCHAR(255) NOT NULL
            )
          `;
                    break;

                case 'Leagues':
                    createTableQuery = `
            CREATE TABLE Leagues (
              id INT IDENTITY(1,1) PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              country VARCHAR(255) NOT NULL
            )
          `;
                    break;

                case 'Team':
                    createTableQuery = `
            CREATE TABLE Team (
              id INT IDENTITY(1, 1) PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              city VARCHAR(255) NOT NULL,
              leagueId INT NOT NULL,
              FOREIGN KEY (leagueId) REFERENCES Leagues(id),
            )
           `;
                    break;



                case 'Movie':
                    createTableQuery = `
            CREATE TABLE Movie (
              id INT IDENTITY(1, 1) PRIMARY KEY,
              Title VARCHAR(255) NOT NULL,
              MovieYear INT NOT NULL,
              Description VARCHAR(255) NOT NULL,  
              CoverImage VARCHAR(255) NOT NULL,
              MovieLink VARCHAR(255) NOT NULL,
              isPg BIT NOT NULL,
              genreId INT NOT NULL,
              FOREIGN KEY (genreId) REFERENCES Genres(id),
            )
           `;
                    break;

                case 'CastCrewRole':
                    createTableQuery = `
            CREATE TABLE CastCrewRole (
              id INT IDENTITY(1,1) PRIMARY KEY,
              role VARCHAR(255) NOT NULL
            )
          `;
                    break;

                case 'CastCrew':
                    createTableQuery = `
            CREATE TABLE CastCrew (
              id INT IDENTITY(1,1) PRIMARY KEY,
              fullName VARCHAR(255) NOT NULL,
              roleId INT NOT NULL,
              FOREIGN KEY (roleId) REFERENCES CastCrewRole(id)
            )
          `;
                    break;



                case 'Wishlist':
                    createTableQuery = `
              CREATE TABLE Wishlist (
                Id INT IDENTITY(1,1) PRIMARY KEY,
                MovieTitle VARCHAR(255) NOT NULL,
                MovieYear INT,
                MovieCountry VARCHAR(255) NOT NULL,
                Genre VARCHAR(255) NOT NULL,
                Description VARCHAR(255) NOT NULL,
                IsApproved SMALLINT DEFAULT 0 CHECK (IsApproved IN (-1, 0, 1)),
                UserId VARCHAR(255) NOT NULL,
              )
            `;
                    break;

                case 'Watchlater':
                    createTableQuery = `
            CREATE Table Watchlater(
              Id INT IDENTITY(1,1) PRIMARY KEY,
              MovieId INT NOT NULL,
              UserId VARCHAR(255) NOT NULL
            )
          `;
                    break;

                default:
                    console.log(`Table creation not defined for ${table}`);
                    continue;
            }
            try {
                await mssqlConnection.executeQuery(createTableQuery);
                console.log(`Created table ${table}`);
            } catch (error) {
                console.error(`Failed to create table ${table}:`, error);
            }
        }
    }
};

generateTables();