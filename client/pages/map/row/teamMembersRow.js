Template.teamMembersRow.events({
    'click li' : function(){
        Session.set("selectedTeamMemberId", this._id);
    }
})