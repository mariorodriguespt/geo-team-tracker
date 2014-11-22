Accounts.onCreateUser(function(options, user) {

    Members.insert({
        _id : user._id,
        'name' : user.emails[0].address
    });

    return user;
});