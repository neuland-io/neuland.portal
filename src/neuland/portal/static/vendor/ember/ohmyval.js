(function (root, factory) {
  if(typeof define === "function") {
    define('klclee/Ohmyval',[], factory);
    
  } else {
    root.Ember.Ohmyval = factory().default;
  }
}(this, function() {
  'use strict';
  var mix =  Ember.Mixin.create({
    rules: {
      presence: function(property, arg, scope){
        if(arg['presence'] === true){
          var val = scope.get(property);
          var condition = Em.isBlank(val);

          return {failed: condition, message: 'This field cannot be blank', field: property};
        }else{
          return {failed: false, message: 'This field cannot be blank', field: property};
        }
      },
      email: function(property,arg, scope){
        if(arg['email'] === true){
          var presenceResult = scope.get('rules').presence(property,arg, scope);
          if(presenceResult.failed){
            return presenceResult;
          }else{ 
            var regex = new RegExp(/.+@.+\..{2,4}/);
            var condition = !regex.test(scope.get(property));
            return {failed: condition, message: 'This is not a valid email', field: property};
          }
        }else{
          return {failed: false, message: 'This is not a valid email', field: property};
        }

        
      },
      numericality: function(property, arg, scope){
        if(arg['numericality'] === true){
          if(scope.get(property) == null){
            return {failed: true, message: 'This only allow numbers', field: property};
          }else{
            var regex = new RegExp( /^[0-9]+$/);
            var condition = !regex.test(scope.get(property));
            return {failed: condition, message: 'This only allow numbers', field: property};
          }
        }else{
          return {failed: condition, message: 'This only allow numbers', field: property};
        }
        
        
      },
      inclusion: function(property, arg, scope){

        if(Em.isBlank(scope.get(property))){
          return {failed: true, message: 'This field cannot be blank', field: property};
        }else{ 
          var val = scope.get(property);
          var list = arg['inclusion']['list'];
          var findProperty = arg['inclusion']['property'];
          if(Em.isBlank(findProperty)){
            var condition = list.indexOf(val) === -1;
            return {failed: condition, message: 'is not included in the list', field: property};
          }else{
            var condition = Em.isBlank(list.findBy(findProperty, val));
            return {failed: condition, message: 'is not included in the list', field: property};
          }
          
        }
      }
    },
    valid: true,
    validate: function(){
      var validations = this.get('validations');
      Em.assert('No Validation specifed', validations);
      var validationFields = Em.keys(validations);

      var failedValidations = [];
      var _scope = this;
      var func = null;
      validationFields.forEach(function(key){
        var funcString = Em.keys(validations[key])[0];
        func = _scope.get('rules')[funcString];
        var result = func(key,  validations[key], _scope);
        if(result.failed){
          failedValidations.push(result);
        }
        
      });
      
      this.set('valid', failedValidations.length === 0);
      return failedValidations;
    }
  });
  return {default: mix}; 
}));