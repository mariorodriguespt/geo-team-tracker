LoginController = RouteController.extend({
    template: 'loginPage',

    waitOn: function(){
        return [

        ];
    }
});

MapController = RouteController.extend({
    template: 'realTimeMap',

    waitOn: function(){
        return [];
    }
});

Router.configure({
    layoutTemplate: 'masterLayout'
});

Router.map(function () {
    this.route('login', {
        path: '/',
        controller: 'LoginController'
    });

    this.route('map', {
        path: '/map',
        controller: 'MapController'
    });
});

Router.onBeforeAction(function () {
    if(!Meteor.userId()){
        Router.go('login');
    }
    else{
        Router.go('map');
    }

    this.next();
});