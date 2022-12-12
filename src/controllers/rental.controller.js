const dayjs = require("dayjs")
const connection = require("./../database")

module.exports = {
    getAll: async (req, res) => {

        const { customerId, gameId } = req.query

        const queryString =`
            SELECT 
            R.ID, R."customerId", R."gameId", R."rentDate", R."daysRented", R."returnDate", R."originalPrice", R."delayFee",
            C.ID as "customer.id" , C.NAME as "customer.name",
            G.ID as "game.id", 
            G.NAME as "game.name", 
            G."categoryId" as "game.categoryId", 
            CA.name as "game.categoryName"
            FROM RENTALS as R
            JOIN CUSTOMERS AS C ON C.ID = R."customerId"
            JOIN GAMES AS G ON G.ID = R."gameId"
            JOIN CATEGORIES AS CA ON CA.ID = G."categoryId"
        `
        console.log(req.query)
        let rentals;
        if (customerId) {
            rentals = await connection.query(queryString + `
                WHERE C.ID = $1
            `, [ customerId  ]) 
        } else if (gameId) {
            rentals = await connection.query(queryString + `
                WHERE G.ID = $1
            `, [ gameId  ]) 
        } else {
            rentals = await connection.query(queryString) 
        }

        if(!rentals)
            return res.sendStatus(500)

        let rentalsFormated = []
        for (let i = 0; i < rentals.rows.length; i++) {
            let curr = { }
            const rental = rentals.rows[i]
            const keys = Object.keys(rental)
            for (let j = 0; j <  keys.length; j++ ) {
                const key = keys[j]
                if (key.includes('.')) {
                    const newKey = key.split('.')
                    if (!curr[newKey[0]])
                        curr[newKey[0]] = {}
                    curr[newKey[0]][newKey[1]] = rental[key]
                } else {
                    curr[key] = rental[key]
                }
            }
            rentalsFormated.push(curr)
        }

        return res.send(rentalsFormated)
    },
    create: async (req, res) => {
        const { customerId, gameId, daysRented } = req.body

        const queryString = `
            INSERT INTO RENTALS ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        try {
            const { pricePerDay  } = res.locals.game

            await connection.query(queryString, [
                customerId, 
                gameId, 
                daysRented, 
                dayjs().format('YYYY-MM-DD'),
                pricePerDay * daysRented,
                null,
                null
            ])

            return res.sendStatus(201)
        } catch (error) {
            return res.sendStatus(500)
        }
    }, 
    finish: async (req, res) => {
        const { id } = req.params

        try {
            const  { originalPrice, daysRented, rentDate } = res.locals.rental

            const queryString = `
                UPDATE RENTALS SET "returnDate" = $1, "delayFee" = $2 
                WHERE ID = $3
            `
            const pricePerDay = Math.ceil((originalPrice / daysRented)) 

            let delayFee = pricePerDay * dayjs().diff(dayjs(rentDate).add(daysRented, "day"), "day")
            delayFee = delayFee <= 0 ? 0 : delayFee 
            
            await connection.query(queryString, [
                dayjs(),
                delayFee,
                id
            ])

            return res.sendStatus(200)
        } catch (error) {
            return res.sendStatus(500)
        }
    },
    deleteRental: async (req, res) => {
        const { id } = req.params

        const { returnDate } = res.locals.rental

        console.log(id)

        if (returnDate === null)
            return res.sendStatus(400)

        const deleteQueryString = `
            DELETE FROM RENTALS WHERE ID = $1
        `
        await connection.query(deleteQueryString, [id])

        return res.sendStatus(200)
    }
}