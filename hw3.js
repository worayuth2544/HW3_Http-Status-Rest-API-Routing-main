const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let users = require('./user.json');


app.get('/user', function (req, res, next) {
    return res.status(200).json({
        code: 1,
        message: 'OK',
        data: users
    })
});
app.post('/user', function (req, res, next) {

    let user = {}
    user.id = users.length + 1;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.position = req.body.position;
    user.phone = req.body.phone;
    user.email = req.body.email;

    console.log('users.length : ', users.length)
    for (let i = 0; i < users.length; i++) {
        console.log('i : ', i)

        if (users[i].phone == user.phone || users[i].email == user.email) {
            return res.status(400).send('data incorrect');
        }
    }



    users.push(user);

    // console.log('Users :', user.name, 'Created!')
    return res.status(201).json({
        code: 1,
        message: 'OK',
        data: users
    });
});

app.put('/user/:id', function (req, res, next) {
    const replaceId = req.params.id;
    const position = users.findIndex(function (val) {
        return val.id == replaceId;
    });
    console.log(users[position]);
    if (req.body.firstname || req.body.lastname) {
        return res.status(400).send('data incorrect');
    }

    try {

        // users[position].firstname = req.body.firstname;
        // users[position].lastname = req.body.lastname;
        users[position].position = req.body.position;
        users[position].phone = req.body.phone;
        users[position].email = req.body.email;

            res.status(200).json({
            code: 1,
            message: 'OK',
            data: users
        });        
    } catch (error) {
        res.status(400).send('data incorrect');
        

    }
})

app.delete('/user/:id', function (req, res, next) {
    const removeId = req.params.id;
    try {
        const position = users.findIndex((val) => {
            return val.id == removeId;
        });
        users.splice(position, 1);
        return res.status(200).json({
            code: 1,
            message: 'OK',
            data: users
        })
    } catch (error) {
        res.status(400).send('data incorrect');
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});