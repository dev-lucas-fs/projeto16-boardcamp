const connection = require('./../database')

module.exports = async (req, res, next) => {
    const id = req.body.gameId ?? req.body.id
    
    try {
        const game = await connection.query(`
            SELECT * FROM GAMES WHERE ID = $1
        `, [id])

        if(game.rows.length === 0)
            return res.sendStatus(400)
        
        res.locals.game = game.rows[0]
    } catch (error) {
        return res.sendStatus(500)
    }
    
    next()
}