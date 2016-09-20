/*

    Curl commands

    GET: curl http://localhost:8080/whatever -i
    POST: curl http://localhost:8080/pokemon -i -X POST -d '{"username" :  "Elm"}' -H "Content-Type: application/json"
*/


var Express = require('Express');
var bodyParserLibrary = require('body-parser');
var app = new Express();
var bodyParser = bodyParserLibrary.json();

app.use(bodyParser);

// app.use(function middle1(req, res, next) {
//   console.log("First Middleware");
//   setTimeout(function() {
//     console.log("timeout")
//     next();
//   }, 400);
// })

// app.use(function middle2(req, res, next) {
//   console.log("Second Middleware");
//   next();
// })

// app.use(function middle2(req, res, next) {
//   console.log("Third Middleware");
//   next();
// })

app.use('/pokemon', function(req, res, next) {
  req.isPokemon = 'true';

  next();
})

// app.use(function teamRocket(req,res,next) {
//   var chance = Math.random();

//   if(chance >  0.5) {
//     var error = new Error("Team Rocket's Strikes Again!");
//     next(error);
//   } else {
//     console.log("Safe this time...")
//     next();
//   }
// })


app.use('/pokemon/:name', function seeTrainer(req,res,next) {
  if(req.query.owner) {
    console.log("This pokemon has a trainer: ", req.query.owner);
  }

  next();
})


app.use(function errHandler(err,req,res,next) {
  console.log("err", err)
  res.sendStatus(500);
})

var pokemon = [],
    id = 0;


app.get('/', function(req, res, next) {
  console.log(Object.keys(req));
  res.set('Content-Type', 'text/html');
  res.send('<html><body><h1>Pokedex Home</h1></body></html>');
});

app.get('/pokemon', function(req, res, next) {
  pokemon.push({
    name : 'Meowth',
    id : id++
  });
  res.json(pokemon[pokemon.length - 1]);
});

app.get('/pokemon/pikachu', function(req, res, next) {
  res.json({'name' : 'Pikachu','type' : 'electric' })
})

app.post('/pokemon', function(req,res,next) {
  if(req.body.username === 'Oak') {
    res.send('I ship Gary and Ash')
  } else {
    res.send("Catch em all!");
  }
})


app.listen(8080);