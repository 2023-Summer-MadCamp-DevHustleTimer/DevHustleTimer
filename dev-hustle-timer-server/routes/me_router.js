var express = require('express');
var router = express.Router();

const { User } = require('../models');

router.get('/',async function(req,res,next){
    const deviceId = req.headers['user-agent'];
    if (!deviceId) {
        // User-Agent 정보가 없는 경우
        res.status(400).json({ message: 'User-Agent header is missing' });
    } else {
        try {
            const user = await User.findOne({ where: { deviceId: deviceId } });
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        } catch (error) {
            console.error('Sequelize query error:', error);
            res.sendStatus(500);
        }
    }
});

module.exports = router;