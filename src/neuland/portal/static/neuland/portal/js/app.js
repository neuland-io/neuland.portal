Neuland = Ember.Application.create();

//Neuland.Store = DS.Store.extend({
//    //revision: 12,
//    adapter: 'DS.FixtureAdapter',
//    namespace: ''
//});

DS.RESTAdapter.reopen({
    namespace: 'api/1'
});

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
