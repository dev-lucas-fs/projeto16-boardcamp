const connection = require('./../database')

module.exports = async (req, res, next) => {
    const id = req.params.id

    const rental = await connection.query(`
        SELECT * FROM RENTALS WHERE ID = $1
    `, [id])

    if(rental.rows.length === 0)
        return res.sendStatus(404)
    
    res.locals.rental = rental.rows[0]

    return next()
}