const route = require('express').Router();
const BandController = require('../controllers/bandController');
const errorHandler = require('../middleware/errorHandler')



//bands
route.post('/band',BandController.CreateBand)
route.get('/band',BandController.showAllBand)
route.post('/band/member',BandController.addMember)
route.get('/band/:band_id', BandController.findBandById)

route.use(errorHandler)
module.exports = route