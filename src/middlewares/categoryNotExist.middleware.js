const connection = require('./../database')
const categorySchema = require('../models/category.schema')

module.exports = async (req, res, next) => {
    const category = await connection.query(`
        SELECT * FROM CATEGORIES WHERE NAME = $1
    `, [req.body.name])

    if(category.rows.length > 0)
        return res.sendStatus(409)
    
    next()
}