const Router = require("express")
const router=new Router()
const userController=require("../controllers/user.controller")

router.post("/userReg",userController.registrationUser)
router.post("/userLogin",userController.loginUser)
router.post("/userLogout",userController.logoutUser)
router.get("/user",userController.checkAndRefreshToken)
router.patch("/userPosition",userController.updatePosition)
//router.delete("/user/:id",userController.deleteUser)

module.exports=router