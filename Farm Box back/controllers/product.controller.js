const db = require("../db");
const transformDate = require("../service/transformDate");

class ProductController {
  async createProduct(req, res) {
    try {
      const {
        rate,
        title,
        image_name,
        charact,
        sales,
        price,
        price_with_sales,
        product_description,
      } = req.body;
      const newProduct = await db.query(
        "INSERT INTO product (rate, title, image_name, charact, sales, price, price_with_sales, product_description) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          rate,
          title,
          image_name,
          charact,
          sales,
          price,
          price_with_sales,
          product_description,
        ]
      );

      res.json(newProduct.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка создания продукта", error: err });
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const getProducts = await db.query(
        "SELECT * FROM product WHERE product_id=$1",
        [id]
      );
      let array;
      const charact1 = [];
      getProducts.rows[0].charact.map((item) => {
        array = item.split(":");
        charact1.push({ title: array[0], type: array[1] });
      });
      getProducts.rows[0].charact = charact1;
      getProducts.rows[0].price = getProducts.rows[0].price.substring(
        0,
        getProducts.rows[0].price.length - 2
      );
      getProducts.rows[0].price_with_sales =
        getProducts.rows[0].price_with_sales.substring(
          0,
          getProducts.rows[0].price_with_sales.length - 2
        );
      const getFeedbacks = await db.query(
        "SELECT * FROM feedback_on_product where on_product_id=$1",
        [id]
      );
      getProducts.rows[0].countFeedback = getFeedbacks.rows.length;
      getProducts.rows[0].rate = 0;
      if (getProducts.rows[0].countFeedback) {
        const maxRate = getFeedbacks.rows.reduce(
          (accumulator, currentValue) => accumulator + currentValue.rate,
          0
        );
        getProducts.rows[0].rate = (
          maxRate / getProducts.rows[0].countFeedback
        ).toFixed(2);
      }
      res.json(getProducts.rows[0]);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ошибка получения продукта", error: err });
    }
  }

  async getProducts(req, res) {
    try {
      const title = req.query.title;
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
      const page = req.query.page ? parseInt(req.query.page, 10) : null;
      let getProducts;

      if (title) {
        if (limit && page) {
          const offset = (page - 1) * limit;
          getProducts = await db.query(
            "SELECT * FROM product WHERE title ILIKE $1 LIMIT $2 OFFSET $3",
            [`%${title}%`, limit, offset]
          );
        } else {
          getProducts = await db.query(
            "SELECT * FROM product WHERE title ILIKE $1",
            [`%${title}%`]
          );
        }
      } else {
        if (limit && page) {
          const offset = (page - 1) * limit;
          getProducts = await db.query(
            "SELECT * FROM product LIMIT $1 OFFSET $2",
            [limit, offset]
          );
        } else {
          getProducts = await db.query("SELECT * FROM product");
        }
      }
      res.json(getProducts.rows);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ошибка получения продуктов", error: err });
    }
  }

  async updateProduct(req, res) {
    try {
      const {
        id,
        rate,
        title,
        image_name,
        charact,
        sales,
        price,
        price_with_sales,
        product_description,
      } = req.body;
      const updateProduct = await db.query(
        "UPDATE product set rate=$2, title=$3, image_name=$4, charact=$5, sales=$6, price=$7, price_with_sales=$8, product_description=$9 WHERE product_id=$1 RETURNING *",
        [
          id,
          rate,
          title,
          image_name,
          charact,
          sales,
          price,
          price_with_sales,
          product_description,
        ]
      );
      res.json(updateProduct.rows[0]);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ошибка обновления продукта", error: err });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const getProducts = await db.query(
        "DELETE FROM product WHERE product_id=$1",
        [id]
      );
      res.json(getProducts.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка удаления продукта", error: err });
    }
  }
}

module.exports = new ProductController();
