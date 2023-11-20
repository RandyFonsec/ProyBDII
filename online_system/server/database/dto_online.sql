CREATE DATABASE dto_online;

\c dto_online;

CREATE TABLE user_type (
    id_user_type SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE "user" (
    id_user SERIAL PRIMARY KEY,
    full_name TEXT,
    nickname TEXT,
    phone TEXT,
    email TEXT,
    salt TEXT,
    hash TEXT,
    user_type INT REFERENCES user_type (id_user_type)
);

INSERT INTO user_type (name) VALUES ('admin'), ('client');

create function sign_up(in_full_name text, in_nickname text, in_password text, in_phone text, in_email text, in_user_type integer) returns integer
    language plpgsql
as
$$

DECLARE
    salt TEXT;
    hash TEXT;
    out_status_code INTEGER := 200;
BEGIN
    salt := md5(EXTRACT(EPOCH FROM NOW())::VARCHAR);

    hash := md5(in_password || salt);

    BEGIN
        INSERT INTO "user" (full_name, nickname, salt, hash, phone, email, user_type)
        VALUES (in_full_name, in_nickname, salt, hash, in_phone, in_email, in_user_type);

    EXCEPTION
        WHEN OTHERS THEN
            out_status_code := 500;
    END;

    RETURN out_status_code;
END;
$$;

CREATE OR REPLACE FUNCTION auth(
    in_nickname TEXT,
    in_password TEXT
)
    RETURNS INTEGER
    LANGUAGE plpgsql
AS $$
DECLARE
    out_status_code INTEGER := 200;
    user_temp RECORD;
BEGIN

    BEGIN
        SELECT * INTO user_temp
        FROM "user"
        WHERE nickname = in_nickname
        LIMIT 1;

        IF COUNT(*) > 0 THEN
            IF md5(in_password || user_temp.salt) = user_temp.hash THEN
                out_status_code := user_temp.id_user;
            ELSE
                RETURN -401; -- Unauthorized
            END IF;
        ELSE
            out_status_code := -404; -- Not Found
        END IF;

    EXCEPTION
        WHEN OTHERS THEN
            out_status_code := -500; -- Internal Server Error
    END;

    RETURN out_status_code;
END;
$$;
