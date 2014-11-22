Template.realTimeMap.events({
    'click #shareLocation': function(){
        Session.set("trackUser", true);
    }
});

Template.realTimeMap.helpers({
    'teamMembers' : function(){
        return Members.find();
    },

    'selectedTeamMember': function(){
        var id = Session.get("selectedTeamMemberId");
        return Members.findOne(id);
    },

    "staticMapURL": function(){
        var id = Session.get("selectedTeamMemberId"),
            user = Members.findOne(id),
            url = "https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C"
                  + user.latitude + "," + user.longitude;

        //"&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284"
        return  url;
    }
});

updatePosition = function(position){
    console.log(position);

    Members.update({
        _id: Meteor.userId()
    },{
       $set:{
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       }

    }, function(error){
        if(error){
            alert("Something went wrong while share location");
            console.lgo(error);
        }
    });
};

Template.realTimeMap.rendered = function(){

    this.autorun(function(computation){

        var data = Template.currentData();

        if (Session.get("trackUser")){
            navigator.geolocation.watchPosition(updatePosition);
        }

    });
}
