/**
 * the register controller
 * @type {Ember.Controller}
 */
Neuland.RegisterController = Ember.Controller.extend({

    /**
     * define the form values
     */
    emailAddress: null,
    username: null,
    password: null,

    /**
     * define other properties
     */
    isProcessing: false,
    registerFailed: false,
    registerSuccess: false,
    validationFailed: false,
    saveErrorMessage: '',

    // validation states
    emailMissing: false,
    emailNotValid: false,
    usernameMissing: false,
    passwordMissing: false,

    /**
     * register action
     * called if the form is submitted
     */
    register: function() {

        var controller = this;

        this.setProperties({
            isProcessing: true,  // triggers the submit button state to "deactivate"
            registerFailed: false,
            registerSuccess: false,
            validationFailed: false,

            // reset validation states
            emailMissing: false,
            emailNotValid: false,
            usernameMissing: false,
            passwordMissing: false
        });

        // create user record in memory
        var createdUserRecord = this.store.createRecord('user', {
            username: this.get('username'),
            emailAddress: this.get('emailAddress'),
            password: this.get('password')
        })

        // validates the form values
        var validationResult = createdUserRecord.validate();

        // validation failed
        if(!createdUserRecord.get('valid')) {
            this.handleValidationResult(validationResult);
            controller.setProperties({
                isProcessing: false,
                validationFailed: true
            })

        // validation ok!
        } else {

            // save the user record (rest api) and get the promise
            createdUserRecord.save().then(function () {
                controller.setProperties({
                    registerSuccess: true,
                    isProcessing: true  // deactivate submit if registration success
                })
            }, function (e) {
                controller.setProperties({
                    isProcessing: false,
                    registerFailed: true,
                    saveErrorMessage: e.statusText
                })
            })
        }
    },

    /**
     * edit the form style depending on the validation results
     * @param {Object[]} validationResult
     */
    handleValidationResult: function(validationResult) {

        var _scope = this;

        $.each(validationResult, function(i, obj) {
            switch (obj.field) {
                case 'emailAddress':
                    _scope.setProperties({
                        emailNotValid: true
                    })
                    break;
                case 'username':
                    _scope.setProperties({
                        usernameMissing: true
                    })
                    break;
                case 'password':
                    _scope.setProperties({
                        passwordMissing: true
                    })
                    break;
            }

        })
    }

})
