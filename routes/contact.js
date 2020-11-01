var express = require('express');
var router = express.Router();
var _ = require('underscore');

var contacts = [
    {
        id: 1,
        name: 'Raul M.',
        job: 'Plumber',
        nickename: 'Ramalaso',
        email: 'ramalaso@yahoo.es'
    },
    {
        id: 2,
        name: 'Carla Ricci',
        job: 'Principal Division Producer',
        nickename: 'Carla',
        email: 'cricci@gmail.com'
    },
    {
        id: 3,
        name: 'Dragan Burns',
        job: 'Senior Factors Producer',
        nickename: 'Drago',
        email: 'itburns@outlook.com'
    },
];


function lookupContact(contact_id) {
    return _.find(contacts, function (c) {
        return c.id == parseInt(contact_id);
    });
}

function findMaxId() {
    return _.max(contacts, function (contact) {
        return contact.id;
    });
}

router.get('/', (req, res) => {
    // return await res.render('list', { contacts: contacts });
    res.render('list', { contacts });
});

router.post('/add', (req, res) => {
    console.log(req);
    var new_contact_id = findMaxId() + 1;
    var new_contact = {
        id: new_contact_id,
        name: req.body.fullname,
        job: req.body.job,
        nickename: req.body.nickname,
        email: req.body.email
    };
    contacts.push(new_contact);
    console.log(contacts);
    res.redirect('/contacts');
});

router.get('/add', (req, res) => {
    res.render('add', { contact: {} });
});

router.route('/:contact_id')
    .all(function (req, res, next) {
        contact_id = req.params.contact_id;
        contact = lookupContact(contact_id);
        next();
    })
    .get((req, res) => {
        res.render('edit', { contact });
    })
    .post((req, res) => {
        if (!contact.notes) {
            contact.notes = [];
        }
        contact.notes.push({
            created: Date(),
            note: req.body.notes
        });

        res.send('Created new note for contact id: ' + contact_id);
    })
    .put((req, res) => {
        contact.name = req.body.fullname;
        contact.job = req.body.job;
        contact.nickename = req.body.nickname;
        contact.email = req.body.email;
        res.send('Update suceeded for contact id: ' + contact_id);
    })
    .delete((req, res) => {
        res.send('Delete for contact' + contact_id);
    });


module.exports = router;