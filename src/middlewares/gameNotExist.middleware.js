const connection = require('./../database')

module.exports = async (req, res, next) => {
    const game = await connection.query(`
        SELECT * FROM GAMES WHERE NAME = $1
    `, [req.body.name])

    if(game.rows.length > 0)
        return res.sendStatus(409)
    
    next()
}