var express = require('express')
var app = express()
var hogan = require('hogan-express')
app.engine('html', hogan)
app.set('views', __dirname + '/')
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res){
  res.render('index.html')
})
console.log('Listening at localhost:3000')
app.listen(3000)