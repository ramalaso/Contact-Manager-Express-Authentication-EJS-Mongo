var express = require('express');
var router = express.Router();
var _ = require('underscore');
var moment = require('moment');
var Contact = require('../models/contact');

router.get('/', (req, res) => {
    Contact.find((err, contacts, count) => {
        // return await res.render('list', { contacts: contacts });
        res.render('list', { contacts });
    });
});

router.route('/add')
    .get(function (req, res) {
        res.render('add', { contact: {} });
    })
    .post(function (req, res) {
        new Contact({
            name: req.body.fullname,
            job: req.body.job,
            nickname: req.body.nickname,
            email: req.body.email
        }).save((err, contact, count) => {
            if (err) {
                res.status(400).send('Error saving new contact: ' + err);
            } else {
                res.redirect('/contacts');
            }
        });
    });

router.route('/:contact_id')
    .all(function (req, res, next) {
        contact_id = req.params.contact_id;
        contact = {};
        Contact.findById(contact_id, function (err, c) {
            contact = c;
            next();
        });
    })
    .get((req, res) => {
        res.render('edit', { contact: contact, moment: moment });
    })
    .post((req, res) => {
        contact.notes.push({
            note: req.body.notes
        });
        contact.save(function (err, contact, count) {
            if (err) {
                res.status(400).send('Error adding note: ' + err);
            } else {
                res.redirect('');
            }
        });
    })
    .put((req, res) => {
        contact.name = req.body.fullname;
        contact.job = req.body.job;
        contact.nickename = req.body.nickname;
        contact.email = req.body.email;
        contact.save(function (err, contact, count) {
            if (err) {
                res.status(400).send('Error saving contact: ' + err);
            } else {
                res.redirect('/contacts/' + contact_id);
            }
        });
    })
    .delete((req, res) => {
        contact.remove(function (err, contact) {
            if (err) {
                res.status(400).send('Error removing contact: ' + err);
            } else {
                res.redirect('/contacts');
            }
        });
    });


module.exports = router;