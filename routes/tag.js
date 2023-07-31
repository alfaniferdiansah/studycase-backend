const express = require('express');
const tagController = require('../controllers/tagController')
const tagMiddleware = require('../middleware/tagMiddleware');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/paginate', tagController.pagination);
router.get('/:pid',tagMiddleware.validateById, tagController.byId)
router.get('/', tagController.all);
router.post('/', tagController.create);
router.patch('/:pid', tagMiddleware.validateById, tagController.update);
router.delete('/:pid', tagMiddleware.validateById, tagController.destroy);


module.exports = router;