const { Router, json } = require('express')
const { getAllGames, create} = require('../controllers/games.controller')
const categoryExistMiddleware = require('../middlewares/categoryExist.middleware')
const gameNotExistMiddleware = require('../middlewares/gameNotExist.middleware')
const gameSchemaValidation = require('../middlewares/gameSchemaValidation')

const router = Router()

router.use(json())

router.get('/games', getAllGames)
router.post('/games', gameSchemaValidation,categoryExistMiddleware, gameNotExistMiddleware, create)

module.exports = router