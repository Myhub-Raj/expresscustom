var User = require('../models/user');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        user_count: function(callback) {
            User.count(callback);
        },
        list_users: function(callback) {
            User.find(callback)
              .sort([['first_name', 'ascending']])
        },

    }, function(err, results) {
        res.render('index', { title: 'Users Data Home', error: err, userCount: results.user_count, userList: results.list_users });
    });

};


// Handle book create on POST.
exports.user_create = [
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.first_name)){
            if(typeof req.body.first_name==='undefined')
            req.body.name="I am an anonymous user";
            else
            req.body.name= req.body.first_name;
        }
        next();
    },
    // Process request after validation and sanitization.
    (req, res, next) => {



        // Extract the validation errors from a request.
      //  const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var user = new User(
          { first_name: req.body.first_name
           });


            // Data from form is valid. Save book.
            user.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new book record.
                    res.redirect('/users');
                });

    }
 ]
