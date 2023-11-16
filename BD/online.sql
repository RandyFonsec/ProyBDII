create table user_type (
    id serial primary key,
    name text
)

create table "user" (
    id integer primary key,
    name text,
    user_type_id INTEGER REFERENCES user_type(id),
    username text,
    salt text,
    hash text,
    lastname text,
    phone text,
    email text
)

create function register_user(in_name text, in_lastname text, in_username text, in_password text, in_phone text, in_email text, in_user_type integer) returns integer
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
        INSERT INTO "user" (name, lastname, username, salt, hash, phone, email, user_type_id)
        VALUES (in_name, in_lastname, in_username, salt, hash, in_phone, in_email, in_user_type);

    EXCEPTION
        WHEN OTHERS THEN
            out_status_code := 500;
    END;

    RETURN out_status_code;
END;
$$;

create function register_user(in_name text, in_lastname text, in_username text, in_password text, in_phone text, in_email text, in_user_type integer) returns integer
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
        INSERT INTO "user" (name, lastname, username, salt, hash, phone, email, user_type_id)
        VALUES (in_name, in_lastname, in_username, salt, hash, in_phone, in_email, in_user_type);

    EXCEPTION
        WHEN OTHERS THEN
            out_status_code := 500;
    END;

    RETURN out_status_code;
END;
$$;

create function check_login(in_username text, in_password text) returns integer
    language plpgsql
as
$$
DECLARE
    out_status_code INTEGER := -200;
    user_row RECORD;
BEGIN
    BEGIN
        SELECT * INTO user_row FROM "user" WHERE username = in_username;

        IF FOUND THEN
            IF md5(in_password || user_row.salt) = user_row.hash THEN
                out_status_code := user_row.id;
            ELSE
                out_status_code := -401;
            END IF;
        ELSE
            out_status_code := -404;
        END IF;

    EXCEPTION
        WHEN others THEN
            out_status_code := -500;
    END;

    RETURN out_status_code;
END;
$$;

drop function get_user_info

create function get_user_info(user_id integer) returns record
    language plpgsql
as
$$
DECLARE
    user_row RECORD;
    out_status_code INT := 200;
BEGIN
    BEGIN
        SELECT id, name, lastname, username, phone, email, user_type_id INTO user_row FROM "user" WHERE id = user_id;

        IF FOUND THEN
            RETURN user_row;
        ELSE
            out_status_code := 404;
        END IF;

    EXCEPTION
        WHEN others THEN
            out_status_code := 500;
    END;

    IF out_status_code <> 200 THEN
        RAISE EXCEPTION 'User not found for ID: %', user_id;
    END IF;

    RETURN NULL;
END;
$$;


create function get_products_by_order(in_order_id integer)
    returns TABLE(product_id character varying, quantity integer)
    language plpgsql
as
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM "Order" WHERE "Order".order_id = in_order_id) THEN
        RAISE EXCEPTION 'El order_id % no es válido.', in_order_id;
    END IF;

    RETURN QUERY
        SELECT PB.product_id, PB.quantity
        FROM ProductsByOrder AS PB
        WHERE PB.order_id = in_order_id;
END;
$$; 
