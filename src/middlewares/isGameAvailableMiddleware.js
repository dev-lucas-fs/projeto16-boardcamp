const connection = require('../database')

module.exports = async (req, res, next) => {
    const { gameId } = req.body
    try {
        const game = await connection.query(`
            SELECT G."stockTotal" FROM GAMES as G
            WHERE ID = $1
        `, [gameId])

        const rentals = await connection.query(`
            SELECT * FROM RENTALS  AS R
            WHERE R."gameId" = $1
        `, [gameId])

        if (game.rows[0].stockTotal <= rentals.rows.length)
            return res.sendStatus(400)
    } catch (error) {
        return res.sendStatus(500)
    }

    return next()
}