// var express = require('express');
// var router = express.Router();

import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

async function hello(){
  return "hello express"
}

// module.exports = router;

export default router;

