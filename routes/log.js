const router = require('express').Router();
let Log = require('../models/log.model');

router.route('/').get((req, res) => {
    Log.find()
        .then(covidLogs => res.json(covidLogs))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
    let id = req.params.id;
    Log.findById(id)
        .then(log => res.json(log))
        .catch(err => res.status(400).json(err));
})

router.route('/add').post((req, res) => {
    const logDate = Date.parse(req.body.date);
    const location = req.body.location;
    const duration = Number(req.body.duration);
    const interactions = Number(req.body.interactions);

    const newCovidLog = new Log({
        logDate,
        location,
        duration,
        interactions
    })

    newCovidLog.save()
    .then(() => res.json('Covid log added'))
    .catch((err) => res.status(400).json(err));
});


module.exports = router;

