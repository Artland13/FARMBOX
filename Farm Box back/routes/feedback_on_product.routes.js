const Router = require("express")
const router=new Router()
const feedback_on_productController=require("../controllers/feedback_on_product.controller")

router.post("/feedback_on_product",feedback_on_productController.createFeedback)
router.get("/feedback_on_product",feedback_on_productController.getFeedback)
router.put("/feedback_on_product",feedback_on_productController.updateFeedback)
router.delete("/feedback_on_product/:id",feedback_on_productController.deleteFeedback)

module.exports=router