const express = require('express')
const categoryController = require('../controllers/categoriesController')
const categoryMiddleware = require('../middleware/categoryMiddleware')

const router = express.Router()

router.get('/', categoryController.all)
router.get('/paginate', categoryController.pagination)
router.get('/:pid', categoryMiddleware.validateById, categoryController.byId)
router.post('/', categoryController.create)
router.patch('/:pid', categoryMiddleware.validateById, categoryController.update)
router.delete('/:pid', categoryMiddleware.validateById, categoryController.destroy)

module.exports = router