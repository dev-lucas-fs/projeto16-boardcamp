const connection = require('./../database')

module.exports = {
    getAll: async (req, res) => {
        const { cpf } = req.query
        const query = `
            SELECT * FROM CUSTOMERS
            ${cpf ? 'WHERE CPF LIKE $1' : ''}
        `
        try {
            const customers = cpf ? await connection.query(query, [cpf + '%']) : await connection.query(query)
            return res.send(customers.rows)
        }
        catch (error) {
            return res.sendStatus(500)
        }
    },
    getById: async (req, res) => {
        const { id } = req.params
        console.log(id)
        try {
            const customer = await connection.query(`
                SELECT * FROM CUSTOMERS
                WHERE ID = $1
            `, [id])

            if (customer.rows.length === 0)
                return res.sendStatus(404)

            return res.send(customer.rows[0])
        } catch (error) {
            return res.sendStatus(500)
        }
    },
    create: async (req, res) => {
        const { name, phone, cpf, birthday } = req.body

       try {
            await connection.query( `
                INSERT INTO CUSTOMERS (NAME, PHONE, CPF, BIRTHDAY) VALUES ($1, $2, $3, $4)
            `, [name, phone, cpf, birthday])
            return res.sendStatus(201)
       } catch (error) {
            return res.sendStatus(500)
       }
    },
    update: async (req, res) => {
        const { name, phone, cpf, birthday } = req.body
        const { id } = req.params
        
        try {
            await connection.query(`
                UPDATE CUSTOMERS SET NAME = $1, PHONE = $2, CPF = $3, BIRTHDAY = $4 WHERE ID = $5
            `, [name, phone, cpf, birthday, id])
            return res.sendStatus(200)
        } catch (errors) {
            return res.sendStatus(500)
        }
        
    }
}

