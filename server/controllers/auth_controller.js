const users = require('../models/users')
const id= 1

module.exports = {
    login: (req, res, next)=>{
        const{username, password} = req.body;
        const {session} = req

        const user = users.find(user => {
            user.username === username && 
            user.password === password
        })
        if(user){
            session.user.username = user.username;
            res.send(session.user)
        }else{
            res.send('Unauthorized')
        }
    },
    register:(req, res, next)=>{
        const{username, password} = req.body;
        const {session} = req;
        const user = {
            id: id,
            username: username,
            password: password
        }
        users.push(user);
        id++;
        session.user.username = username
        res.send(session.user)

    },
    signout:(req, res, next)=>{
        req.session.destroy()
        res.send(req.session)
    },
    getUser:(req, res, next)=>{
        res.send(req.session.user)
    }   

}