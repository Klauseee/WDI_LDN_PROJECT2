const router = require('express').Router();



router.get('/', (req, res) => res.render('pages/home'));
router.get('/news', (req, res) => res.render('pages/news'));
router.get('/concerts', (req, res) => res.render('pages/concerts'));
router.get('/about', (req, res) => res.render('pages/about'));
router.get('/contact', (req, res) => res.render('pages/contact'));

module.exports = router;
