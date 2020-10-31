var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('It worked.');
});

router.post('/', (req, res) => {
    res.send('Post worked...');
});

router.route('/:contact_id')
    .all(function (req, res, next) {
        contact_id = req.params.contact_id;
        next();
    })
    .get((req, res) => {
        res.send('Get for contact' + contact_id);
    })
    .post((req, res) => {
        res.send('Post for contact' + contact_id);
    })
    .put((req, res) => {
        res.send('Put for contact' + contact_id);
    })
    .delete((req, res) => {
        res.send('Delete for contact' + contact_id);
    });


module.exports = router;