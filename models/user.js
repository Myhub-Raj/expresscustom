var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
    first_name: {type: String, required: true, max: 100},
    }
  );

// Virtual for author "full" name.
UserSchema
.virtual('name')
.get(function () {
  return this.first_name;
});



// Export model.
module.exports = mongoose.model('User', UserSchema);
