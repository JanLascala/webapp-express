// basic exports
const express = require('express')
const app = express()
const notFound = require('./middleware/notFound.js')
const errorHandler = require('./middleware/errorHandler.js')
// routers export
const movieRouters = require('./routers/movie_routers.js')
//port set up
const port = 3000
//cors CHECK NUMBER LATER!!!
const cors = require("cors")
app.use(cors({ origin: 'http://localhost:5173' }))


//static images
app.use(express.static('public'))


// listening 
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`)
});

//set path for routes
app.use('/api/v1/movies', movieRouters);

//middle wares errors etc
app.use(express.json());
// add error handlers
app.use(errorHandler);
app.use(notFound);
