DROP TABLE IF EXISTS roles CASCADE; 
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,  /*  BIGSERIAL: sirve para incrementar utomaticamente el id*/
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(250) NULL,
	route VARCHAR(250) NULL,
	create_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL

);
/* insertamos los 3 roles */
INSERT INTO roles(
	name,
	route,
	create_at,
	update_at
)
VALUES(
	'CLIENTE',
	'client/products/list',
	'2021-11-26',
	'2021-11-26'
);
INSERT INTO roles(
	name,
	route,
	create_at,
	update_at
)
VALUES(
	'RESTAURANTE',
	'restaurant/orders/list',
	'2021-11-26',
	'2021-11-26'
);
INSERT INTO roles(
	name,
	route,
	create_at,
	update_at
)
VALUES(
	'REPARTIDOR',
	'delivery/orders/list',
	'2021-11-26',
	'2021-11-26'
);
/* aqui termina el codigo para insertar los roles */


/* Para agrupar nuestras consultas */
S SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM
        users AS U
    INNER JOIN 
        user_has_roles AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN 
        roles AS R
    ON 
        R.id = UHR.id_rol
    WHERE
        U.email = $1
    GROUP BY
        U.id
/* Aqui temina Para agrupar nuestras consultas */

DROP TABLE IF EXISTS users CASCADE; /*   srive para eliminar las lista de usuarios si en caso exista en la base de datos y evitar errores*/
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(120) NOT NULL,
	lastname VARCHAR(120) NOT NULL,
	phone VARCHAR(120) NOT NULL UNIQUE,
	image VARCHAR(500) NULL,
	password VARCHAR(125) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	create_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL
	
);
DROP TABLE IF EXISTS user_has_roles CASCADE; 
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	create_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)

);