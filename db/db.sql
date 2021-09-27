DROP TABLE IF EXISTS roles CASCADE; 
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,  /*  BIGSERIAL: sirve para incrementar utomaticamente el id*/
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(250) NULL,
	route VARCHAR(250) NULL,
	create_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL

);

DROP TABLE IF EXISTS users CASCADE; /*   srive para eliminar las lista de usuarios si en caso exista en la base de datos y evitar errores*/
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(120) NOT NULL,
	lastname VARCHAR(120) NOT NULL,
	phone VARCHAR(120) NOT NULL UNIQUE,
	image VARCHAR(125) NULL,
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