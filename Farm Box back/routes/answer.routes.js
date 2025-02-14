const Router = require("express")
const router=new Router()
const answerController=require("../controllers/answer.controller")

router.post("/answer",answerController.createAnswer)
router.get("/answer",answerController.getAnswers)
router.put("/answer",answerController.updateAnswer)
router.delete("/answer/:id",answerController.deleteAnswer)

module.exports=router