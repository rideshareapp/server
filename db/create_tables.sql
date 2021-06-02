BEGIN
    CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        pw_hashed BINARY(72) NOT NULL,
        PRIMARY KEY ( email )
    );

END $$ LANGUAGE plpgsql;