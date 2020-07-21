const router = require('express').Router();
let Log = require('../models/log.model');

router.route('/').get((req, res) => {
    Log.find()
        .then(covidLogs => res.json(covidLogs))
        .catch(err => res.json(err));
});

router.route('/:id').get((req, res) => {
    let id = req.params.id;
    Log.findById(id)
        .then(log => res.json(log))
        .catch(err => res.json(err));
})

router.route('/:id').delete((req, res) => {
    Log.findByIdAndDelete(req.params.id)
        .then(() => res.json('Covid log deleted'))
        .catch((err) => res.json(err))
})

router.route('/add').post((req, res) => {
    // console.log('IN POST');
    // console.log('req', req.body);
    const logDate = Date.parse(req.body.logDate);
    // if ( Number.isNaN( logDate )) {
    //     logDate = new Date();
    // }
    const location = req.body.location;
    const duration = Number(req.body.duration);
    const interactions = Number(req.body.interactions);
// console.log(logDate, typeof logDate);
    const newCovidLog = new Log({
        logDate,
        location,
        duration,
        interactions
    })
// console.log('LOG CREATED');
    newCovidLog.save()
    .then(() => res.json({status: 'Covid log added'}))
    .catch((err) => res.json(err));
});


module.exports = router;

