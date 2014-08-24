/**
 *
 * @type {Neuland.User}
 */
Neuland.User = DS.Model.extend(Ember.Ohmyval, {
    username: DS.attr('string'),
    emailAddress: DS.attr('string'),
    password: DS.attr('string'),
    validations:{
        username: {
            presence: true
        },
        emailAddress: {
            email: true,
            presence: true
        },
        password: {
            presence: true
        }
    }

});
