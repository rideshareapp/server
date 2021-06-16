BEGIN
    CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) NOT NULL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        pw_hashed VARCHAR(72) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS drivers (
        email VARCHAR(255) PRIMARY KEY REFERENCES users(email) ON DELETE CASCADE,
        seats SMALLINT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS organizations (
        org_name VARCHAR(255) NOT NULL,
        org_code CHAR(4) NOT NULL,
        email VARCHAR(255) NOT NULL PRIMARY KEY,
        pw_hashed VARCHAR(72) NOT NULL,
        events JSONB
    );

    CREATE TABLE IF NOT EXISTS trips (
        id SERIAL PRIMARY KEY,
        driver VARCHAR(255) REFERENCES drivers(email),
        passengers text[][]
    );

END $$ LANGUAGE plpgsql;