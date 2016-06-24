var mongoose = require('mongoose');
mongoose.connect('mongodb://AlpriElse:qwerty123@ds023052.mlab.com:23052/sundial');
module.exports = mongoose.connection;
