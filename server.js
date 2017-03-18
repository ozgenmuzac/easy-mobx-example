var express = require('express')
var app = express()
var hogan = require('hogan-express');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('evethayir', 'webapp', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
app.engine('html', hogan)
app.set('views', __dirname + '/')
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'))
var Level = sequelize.define('levels', {
  question: Sequelize.STRING,
  image: Sequelize.STRING,
  evetTitle: Sequelize.STRING,
  evetPopupTitle: Sequelize.STRING,
  evetPopupBody: Sequelize.STRING,
  hayirTitle: Sequelize.STRING,
  hayirPopupTitle: Sequelize.STRING,
  hayirPopupBody: Sequelize.STRING,
  level: Sequelize.INTEGER
});

Level.sync().then(() => {
	console.log("Successfully synced");
})

app.get('/', function(req, res){
  res.render('index.html')
})
app.get('/get-next-frame', function(req, res){
	const level = parseInt(req.query.currentLevel)
	Level.findAll({
		where: {
			level: level
		}
	}).then(data =>{
		const randValue = Math.floor(Math.random() * (data.length - 0)) ;
		const levelData = data[randValue].dataValues;
		res.json({
			question: levelData.question,
			evet: {
				popup: {
					title: levelData.evetPopupTitle,
	      			body: levelData.evetPopupBody
				},
				image: levelData.image
			},
			hayir: {
				popup: {
					title: levelData.hayirPopupTitle,
	      			body: levelData.hayirPopupBody
				}
			}
		});
	})
})
console.log('Listening at localhost:' + app.get('port'))
app.listen(app.get('port'))