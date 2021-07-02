BEGIN
    CREATE EXTENSION IF NOT EXISTS CITEXT;

    CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) NOT NULL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        pw_hashed VARCHAR(72) NOT NULL,
        in_orgs text[]
    );

    CREATE TABLE IF NOT EXISTS drivers (
        email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
        org_code CHAR(4) NOT NULL REFERENCES organizations(org_code) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (email, org_code)
    );

    CREATE TABLE IF NOT EXISTS organizations (
        org_name VARCHAR(255) NOT NULL,
        org_code CITEXT(4) NOT NULL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        pw_hashed VARCHAR(72) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trips (
        driver VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
        event_id SERIAL REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE,
        passenger VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
        geolocation POINT NOT NULL,
        passengers_num SMALLINT DEFAULT 1 NOT NULL,
        PRIMARY KEY (event_id, passenger)
    );

    CREATE TABLE IF NOT EXISTS trip_requests (
        id SERIAL PRIMARY KEY,
        event_id SERIAL REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE,
        passenger VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
        geolocation POINT NOT NULL,
        passengers_num SMALLINT DEFAULT 1 NOT NULL
    );

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        org_code CHAR(4) NOT NULL REFERENCES organizations(org_code) ON DELETE CASCADE ON UPDATE CASCADE,
        event_name VARCHAR(255) NOT NULL,
        event_date TIMESTAMP NOT NULL,
        include_time BOOLEAN NOT NULL DEFAULT false
    );

END $$ LANGUAGE plpgsql;