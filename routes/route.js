const { Router } = require('express')
const router = Router()
const authenticate = require("../middleware/middleware")
const {registerUser , loginUser , getImages , addToFavourite,removeFavourite,getFavourite,getUser} = require('../controllers/controller')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post("/add/favourite/:imageId" , authenticate ,addToFavourite)
router.get("/images/:pageNumber" , authenticate , getImages)
router.delete("/delete/favourite/:imageId" , authenticate ,removeFavourite)
router.get("/get/favourite/:pageNumber" , authenticate ,getFavourite)
router.get("/auth/user" , authenticate ,getUser)


module.exports = router
