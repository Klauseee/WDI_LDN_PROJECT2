const Concert = require('../models/concert');


function indexRoute(req, res) {
  Concert.find()
    .then(concerts => res.render('concerts/index', { concerts }));
}

function newRoute(req, res) {
  res.render('concerts/new');
}

function createRoute(req, res, next) {
  Concert.create(req.body)
    .then(() => res.redirect('/concerts'))
    .catch(next);
}

function showRoute(req, res, next) {
  Concert.findById(req.params.id)
    .then(concert => {
      if(!concert) return res.render('pages/404');
      res.render('concerts/show', { concert });
    })
    .catch(next);
}

function editRoute(req, res) {
  Concert.findById(req.params.id)
    .then(concert => res.render('concerts/edit', { concert }));
}

function updateRoute(req, res) {
  Concert.findById(req.params.id)
    .then(concert => Object.assign(concert, req.body))
    .then(concert => concert.save())
    .then(concert => res.redirect(`/concerts/${concert._id}`));
}

function deleteRoute(req, res) {
  Concert.findById(req.params.id)
    .then(concert => concert.remove())
    .then(() => res.redirect('/concerts'));
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
