const express = require('express');
const bodyParser = require('body-parser')
const db = require('../dataBase/mongoDB')

const ObjectID = require('mongodb').ObjectID;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello server')
})

app.get('/v1/users', (req, res) => {
    db.get().collection('users').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.get('/v1/users/:id', (req, res) => {
    db.get().collection('users').findOne({ _id: ObjectID(req.params.id) }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
})

app.post('v1/users', (req, res) => {
    const user = {
        name: req.body.name
    };
    db.get().collection('users').insert(user, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(user);
    })
})

app.put('v1/users/:id', (req, res) => {
    db.get().collection('users').updateOne(
        { _id: ObjectID(req.params.id) },
        { name: req.body.name },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
})

app.delete('v1/users/:id', (req, res) => {
    db.get().collection('users').deleteOne(
        { _id: ObjectID(req.params.id) },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
    })

//connect MongoDB
db.connect('url to connect DB', (err) => {
    if (err) {
        return console.log(err);
    }
    //start server after connect to DB
    app.listen(8090, () => {
        console.log('server is working http://localhost:8090')
    })
})

//need start DB 'mongod' and server 'node server.js' in two terminals


// app.put('v1/users/:id', (req, res) => {
//     const user = users.find((user) => {
//         return user.id === Number(req.params.id)
//     })
//     user.name = req.body.name
//     res.send(user);
// })

// app.delete('v1/users/:id', (req, res) => {
//     users = users.filter((user) => {
//         return user.id !== Number(req.params.id);
//     })
//     res.send(user);
// })