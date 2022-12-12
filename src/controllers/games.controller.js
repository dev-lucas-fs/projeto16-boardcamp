const connection = require('./../database')

module.exports = {
    getAllGames: async (req, res) => {   

        const { name } = req.query

        const query = `
            SELECT G.id, G.name, G.image, G."stockTotal", C.id, G."pricePerDay", C.name as "categoryName"
            FROM GAMES as G JOIN CATEGORIES as C ON G."categoryId" = C.id
            ${name ? 'WHERE  LOWER(G.name) LIKE LOWER($1)' : '' }
        `

        const games = name ? await connection.query(query, [name + '%']) : await connection.query(query)

        if(games.rows.length === 0)
            return res.sendStatus(500)
        
        return res.send(games.rows)
    },
    create: async (req, res) => {
        const { name, image, stockTotal, categoryId, pricePerDay } = req.body

        try {
            const create = await connection.query(`
                INSERT INTO GAMES (name, "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)
            `,  [name, image, stockTotal, categoryId, pricePerDay])

            return res.sendStatus(201)
        } catch {
            return res.sendStatus(500)
        }

    }
}