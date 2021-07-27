const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('route is working teacher');
});

module.exports = router;