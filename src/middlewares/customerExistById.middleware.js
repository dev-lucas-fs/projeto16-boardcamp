const connection = require('./../database')

module.exports = async (req, res, next) => {
    const { customerId : id } = req.body

    try {
        const customers = await connection.query(`
            SELECT * FROM CUSTOMERS
            WHERE ID = $1
        `, [id])

        if (customers.rows.length === 0)
            return res.sendStatus(400)

        res.locals.customer = customers.rows[0]

    } catch (error) {
        return res.sendStatus(500)
    }
    
    return next()
}