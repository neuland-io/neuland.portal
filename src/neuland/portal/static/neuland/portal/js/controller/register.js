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
    saveErrorMessage: '',

    /**
     * register action
     * called if the form is submitted
     */
    register: function() {

        var controller = this;

        this.setProperties({
            isProcessing: true,  // triggers the submit button state to "deactivate"
            registerFailed: false,
            registerSuccess: false
        });

        // create user record in memory
        var createdUserRecord = this.store.createRecord('user', {
            username: this.get('username'),
            emailAddress: this.get('emailAddress'),
            password: this.get('password')
        })

        // save the user record and get the promise
        createdUserRecord.save().then(function() {
            controller.setProperties({
                registerSuccess: true,
                isProcessing: false
            })
        }, function(e) {
            controller.setProperties({
                registerFailed: true,
                isProcessing: false,
                saveErrorMessage: e.statusText
            })
        })
    }

})
