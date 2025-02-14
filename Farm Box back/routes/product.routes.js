const Router = require("express")
const router=new Router()
const productController=require("../controllers/product.controller")

router.post("/product",productController.createProduct)
router.get("/product",productController.getProducts)
router.get("/product/:id",productController.getOneProduct)
router.put("/product",productController.updateProduct)
router.delete("/product/:id",productController.deleteProduct)

module.exports=router