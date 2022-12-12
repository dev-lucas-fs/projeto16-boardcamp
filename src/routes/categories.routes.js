const { Router, json } = require('express')
const { getAllCategories, create } = require('../controllers/category.controller')
const categoryNotExistMiddleware = require('../middlewares/categoryNotExist.middleware')
const categorySchemaValidation = require('../middlewares/categorySchemaValidation')

const router = Router()

router.use(json())

router.get('/categories', getAllCategories)
router.post('/categories', categorySchemaValidation, categoryNotExistMiddleware, create)

module.exports = router