const connection = require('./../database')

module.exports = async (req, res, next) => {
    const { cpf } = req.body

    try {
        const customers = await connection.query(`
            SELECT * FROM CUSTOMERS
            WHERE CPF = $1 and ID != $2
        `, [cpf, req.params.id])

        if (customers.rows.length > 0)
            return res.sendStatus(409)

    } catch (error) {
        return res.sendStatus(500)
    }
    
    return next()
}