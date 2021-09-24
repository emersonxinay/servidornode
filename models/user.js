
const db = require('../config/config.js');
const crypto =require('crypto');

const User = {};

User.getAll = () => {
    const sql = `
    SELECT 
        * 
    FROM 
        users
    `;
    return db.manyOrNone(sql);
}

User.findById = (id, callback) => {
    const sql = ` 
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    FROM
        users
    WHERE
        id = $1
    `;
    return db.oneOrNone(sql, id).then(user => { callback(null, user);})
}

User.create = (user) => {
    const myPasswordHashed =crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = ` 
    INSERT INTO
        users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            create_at,
            update_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `;  
    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);
}
module.exports = User;