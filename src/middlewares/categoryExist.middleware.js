const connection = require('./../database')

module.exports = async (req, res, next) => {
    const id = req.body.categoryId ?? req.body.id

    const category = await connection.query(`
        SELECT * FROM CATEGORIES WHERE ID = $1
    `, [id])

    if(!(category.rows.length > 0))
        return res.sendStatus(400)
    
    next()
}