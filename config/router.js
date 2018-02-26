const router = require('express').Router();
const concerts = require('../controllers/concerts');



router.get('/', (req, res) => res.render('pages/home'));

router.get('/concerts', concerts.index);
router.get('/concerts/new', concerts.new);
router.post('/concerts', concerts.create);
router.get('/concerts/:id', concerts.show);
router.get('/concerts/:id/edit', concerts.edit);
router.put('/concerts/:id', concerts.update);
router.delete('/concerts/:id', concerts.delete);


module.exports = router;
