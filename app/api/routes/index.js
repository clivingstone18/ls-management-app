var express = require('express');
const { max } = require('moment');
var router = express.Router();
require('dotenv').config()
const connectToDB = require('../controllers/connectToDB')
var moment = require("moment")


/* GET home page. */
router.get('/api/', function(req, res, next) {

});

router.get('/api/staff/getAll', (req, res, next) => {
  let queryString = "SELECT * from staff;"
  connectToDB(queryString).then(response=>res.send(response.rows)).catch(err=>res.send(err))
});

// post a new member of staff 
router.post('/api/staff/post', (req, res, next) => {
  let data = req.body;
  let queryString = `INSERT INTO staff(firstName, lastName, hasDiploma) VALUES('${data.firstName}','${data.lastName}', '${
    data.hasDiploma ? "1" : "0"}');`
    connectToDB(queryString).then(response=>res.send(response)).catch(err=>res.send(err))
});

router.post('/api/staff/delete', (req, res, next) => {
  let staffID = req.body.staffID;
  let queryString = `DELETE from staff WHERE staffID = ${staffID};`;
  connectToDB(queryString).then(response=>res.send(response)).catch(err=>res.send(err))

})

// get 
router.post('/api/classData/mostrecent/get', (req, res, next) => {
  let today = moment().format("YYYY-MM-D")
  
  let queryString = `SELECT * from classData WHERE dateOf = '${today}'
  ORDER  BY entryid DESC
  LIMIT  1;
  `
  console.log(queryString)
  connectToDB(queryString).then(response=>{
    console.log(response)
    res.send(response.rows)
  }).catch(err=>{
    console.log(err)
    res.send(err)
  })

});
router.get('/api/classData/:date/get', (req, res, next) => {
  let queryString = `SELECT * from classData WHERE dateof = '${req.params.date}';

  SELECT * from 

  (SELECT * from staffsupervises WHERE entryid 
  IN (SELECT entryid from classData WHERE dateof = '${req.params.date}')) as info
  INNER JOIN staff ON staff.staffid = info.staffid
  
  ; 
  `

  connectToDB(queryString).then(response=>{console.log(response); res.send(response)}).catch(err=>{
    console.log(err);
    res.send(err)
  })
});






router.post('/api/classData/post', (req, res, next) => {
  let data = req.body.data;
  console.log(data)

  let queryString = `INSERT INTO classData(numkook, numkoala, numemu, numkang, dateof, timeof) 
  VALUES ('${data.numKook}', '${data.numNursery}', '${data.numEmus}', '${data.numKangaroos}',
  '${data.date}', '${data.time}');

  ${
    data.staffOnDuty.map(staff => 
      `INSERT INTO staffsupervises(staffid, entryid)
      VALUES(${staff.staffid}, (SELECT currval('classdata_entryid_seq'))
      );
      `).join("")
  }
  `

  console.log(queryString)
  connectToDB(queryString).then(response=>{
    res.send(response)
  }
  
  
  
  ).catch(err=>{
    console.log(err)
    res.send(err)
  })
})

// aggregate queries 




module.exports = router;