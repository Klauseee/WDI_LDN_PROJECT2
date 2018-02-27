const Concert = require('../models/concert');
const Category = require('../models/category');
const Promise = require('bluebird');



function indexRoute(req, res) {
  Promise.props({
    allConcerts: Concert.find().exec(),
    concerts: Concert.find(req.query).exec()
  })
    .then(data => {
      const allPerformers = data.allConcerts.map(concert => concert.performer1);
      const uniquePerformers = Array.from(new Set(allPerformers)).sort();

      res.render('concerts/index', {
        concerts: data.concerts,
        performers: uniquePerformers,
        selectedPerformer: req.query.performer1
      });
    });
}


function newRoute(req, res) {
  Category.find()
    .then(categories => res.render('concerts/new', { categories }));
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Concert.create(req.body)
    .then(() => res.redirect('/concerts'))
    .catch(next);
}

function showRoute(req, res, next) {
  Concert.findById(req.params.id)
    .populate('comments.user')
    .populate('category')
    .then(concert => {
      if(!concert) return res.render('pages/404');
      res.render('concerts/show', { concert });
    })
    .catch(next);
}

function editRoute(req, res) {
  // get both cheese and categories in parallel
  Promise.props({
    concert: Concert.findById(req.params.id),
    categories: Category.find()
  })
    .then(data => res.render('concerts/edit', data)); // inject the data into the view
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

function commentsCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  Concert.findById(req.params.id)
    .then(concert => {
      concert.comments.push(req.body);
      return concert.save();
    })
    .then(concert => res.redirect(`/concerts/${concert._id}`))
    .catch(next);
}

function commentsDeleteRoute(req, res, next) {
  Concert.findById(req.params.id)
    .then(concert => {
      const comment = concert.comments.id(req.params.commentId);
      comment.remove();
      return concert.save();
    })
    .then(concert => res.redirect(`/concerts/${concert._id}`))
    .catch(next);
}

function moderate(req, res, next) {
  if(!req.currentUser.isAdmin){
    req.flash('danger', 'You do not have permisision to moderate');
    return res.redirect(`/concerts/${req.params.id}`);
  }

  Concert.findById(req.params.id)
    .then(concert => {
      const comment = concert.comments.id(req.params.commentId);
      comment.isModerated = true;
      return concert.save();
    })
    .then(concert => res.redirect(`/concerts/${concert._id}`))
    .catch(next);
}

// function filterRoute(req, res) {
//   const selected = req.body.category;
//   Concert.find()
//     .populate('category')
//     .then(concerts => res.render('concerts/index', {concerts, selected }));
// }


module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  commentsModerate: moderate,
  // filter: filterRoute
};
