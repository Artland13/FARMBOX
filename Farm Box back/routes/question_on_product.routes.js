const Router = require("express")
const router=new Router()
const question_on_productController=require("../controllers/question_on_product.controller")

router.post("/question_on_product",question_on_productController.createQuestion)
router.get("/question_on_product",question_on_productController.getQuestion)
router.put("/question_on_product",question_on_productController.updateQuestion)
router.delete("/question_on_product/:id",question_on_productController.deleteQuestion)

module.exports=router