const detail = require('../models/bookdetail');
const Status = require("http-status-codes");

module.exports = {
  Home: (req, res) => {
    detail.find().lean().then((books) => {
      res.render('home', { books });
    }).catch(() => {
      res.status(Status.UNAUTHORIZED).send("Error!");
    })
  },
  BPage: (req, res) => {
    detail.findOne({ bookNumber: req.params.bookNumber }).lean().then((book) => {
      res.render('books', { book: book });
    }).catch(() => {
      res.status(Status.UNAUTHORIZED).send("Error!");
    })
  },
  Bookadding: (req, res) => {
    res.render("Bookadd");
  },
  Bookaddingmore: (req, res) => {
    detail.find({}).lean().then((allBooks) => {
      const bookNumber = allBooks.length + 1;
      detail.create({
        bookNumber,
        bookName: req.body.bookName,
        author: req.body.authorName,
        link: req.body.amazonLink
      }).then(() => {
        res.redirect('/home');
      }).catch(() => {
        res.status(Status.UNAUTHORIZED).send("Error!");
      })
    });
  },
  delete: (req, res) => {
    detail.find().lean().then((books) => {
      res.render('delete', { books });
    }).catch(() => {
      res.status(Status.UNAUTHORIZED).send("Error!");
    })
  },
  Bookdelete: (req, res) => {
    detail.deleteOne({ bookNumber: req.params.bookNumber }).then(() => {
      res.redirect('/DeleteABook');
    }).catch(() => {
      res.status(Status.UNPROCESSABLE_ENTITY).send("Error!");
    })
  },
};
