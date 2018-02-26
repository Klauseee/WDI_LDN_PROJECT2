const router = require('express').Router();
const concerts = require('../controllers/concerts');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');


router.get('/', (req, res) => res.render('pages/home'));

router.get('/concerts', concerts.index);
router.get('/concerts/new', concerts.new);
router.post('/concerts', concerts.create);
router.get('/concerts/:id', concerts.show);
router.get('/concerts/:id/edit', concerts.edit);
router.put('/concerts/:id', concerts.update);
router.delete('/concerts/:id', concerts.delete);

router.get('/register', registrations.new);
router.post('/register', registrations.create);

router.get('/login', sessions.new);
router.post('/login', sessions.create);
router.get('/logout', sessions.delete);

module.exports = router;
