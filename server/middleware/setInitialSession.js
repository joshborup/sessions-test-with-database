module.exports = {
    setInitialSession: (req, res, next) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        //connect to database and insert username and password
        db.create_user(username, password).then((response) => {
            if(!req.session.user){
                req.session.user = [{
                    userId: response[0].userid,
                    views: 1,
                    username: username,
                }]   
            }else{
                req.session.user.views++
            }
            res.send(req.session.user);
        })
        
        
    }
    
}