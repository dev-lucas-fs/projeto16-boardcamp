const connection = require('./../database')

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await connection.query(`
                SELECT * FROM CATEGORIES
            `)
            return res.send(categories.rows)
        } catch (error){
            return res.sendStatus(500)
        }
    },
    create: async (req, res) => {
       try {
            await connection.query(`
                INSERT INTO CATEGORIES (name) VALUES ($1)
            `,  [req.body.name])
            return res.sendStatus(201)
       } catch {
            return res.sendStatus(500)
       }
    }
}