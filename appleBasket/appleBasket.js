var basicAppleLeftApple = require('./basicApple/leftApple.js')

var exports = module.exports = {}

exports.basicAppleLeftApple = function(game){
	return basicAppleLeftApple.generateApple(game)
}