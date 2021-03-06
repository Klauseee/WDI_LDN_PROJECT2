const router = require('express').Router();
const concerts = require('../controllers/concerts');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');


router.get('/', (req, res) => res.render('pages/home', { isHomepage: true }));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/contact', (req, res) => res.render('pages/contact'));
router.get('/news', (req, res) => res.render('pages/news'));

router.get('/concerts', concerts.index);
router.get('/concerts/new', secureRoute, concerts.new);
router.post('/concerts', secureRoute, concerts.create);
router.get('/concerts/:id', concerts.show);
router.get('/concerts/:id/edit', secureRoute, concerts.edit);
router.put('/concerts/:id', secureRoute, concerts.update);
router.delete('/concerts/:id', secureRoute, concerts.delete);

router.get('/register', registrations.new);
router.post('/register', registrations.create);

router.get('/login', sessions.new);
router.post('/login', sessions.create);
router.get('/logout', sessions.delete);

router.post('/concerts/:id/comments', secureRoute, concerts.commentsCreate);
router.delete('/concerts/:id/comments/:commentId', secureRoute, concerts.commentsDelete);
router.patch('/concerts/:id/comments/:commentId/moderate', secureRoute, concerts.commentsModerate);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
