var mongoose = require('mongoose'),
    //moongose require the schema
    movementSchema = require('./movement.model'),    
    Movement = mongoose.model('Movement'),
    userSchema = require('../user/user.model'),
    User = mongoose.model('User'),
    discountController = require('../discounts/discount.controller');

/*
 |--------------------------------------------------------------------------
 | Retrieve all movements of the logged user
 |--------------------------------------------------------------------------
 */
exports.movements = function (req, res) {
    
    //Si viene de un Stream tengo que usar elasticsearch porque son muuuchos datos que son imposibles con mongo

    var dni = req.user.dni;
    
    User.findOne({dni: dni}, function(err, user) {
  
        if(err) res.status(500).send({ message: err.message });
        
        res.send(user.movimientos[0]);

  });
}

/*
 |--------------------------------------------------------------------------
 | Create a new movement
 |--------------------------------------------------------------------------
 */
exports.create = function (req, res) {
    var user = req.user;
    var movimiento = req.body.movement;

    //check if the movemnt generates a new discount.
    discountController.determinateDiscount(movimiento, user, function(err){
        if(err) res.status(500).send({ message: err.message });
        else res.status(200);
    });
}