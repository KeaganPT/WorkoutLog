const express = require('express');
const validateSession = require('../../../WorkoutLog/server/middleware/validateSession');
const router = express.Router();
const {Log} = require('../models')

/*** CREATE LOG ***/
router.post('/', validateSession,(req,res) => {
    const log = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(log)
       .then(log => res.status(200).json(log))
       .catch(err => res.status(500).json({ error: err}))
})

/*** GET ALL LOGS OF SAME OWNER ID ***/
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner_id: userid }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/*** UPDATE LOG ***/
router.put("/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err}));
});

/*** DELETE LOG ***/
router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.destroy(query)
        .then(() => res.status(200).json({ message: "Log Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err}))
});


module.exports = router