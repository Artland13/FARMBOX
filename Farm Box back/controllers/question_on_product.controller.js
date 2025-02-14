const db = require("../db");
const transformDate = require("../service/transformDate");

class Question_on_productController {
  async createQuestion(req, res) {
    try {
      const { username, comments, on_product_id } = req.body;
      const likeCount = 0;
      const date_question = new Date().toISOString().slice(0, 10);
      const newQuestion = await db.query(
        "INSERT INTO question_on_product (username,date_question,comments,likeCount,on_product_id) values ($1, $2, $3, $4, $5) RETURNING *",
        [username, date_question, comments, likeCount, on_product_id]
      );
      res.json(newQuestion.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка создания вопроса", error: err });
    }
  }

  async getQuestion(req, res) {
    try {
      const id = req.query.id;
      const getQuestion = await db.query(
        "SELECT * FROM question_on_product where on_product_id=$1",
        [id]
      );
      getQuestion.rows.map((item) => {
        item.date_question = transformDate(item.date_question);
      });
      res.json(getQuestion.rows);
    } catch (err) {
      res.status(500).json({ message: "Ошибка получения вопроса", error: err });
    }
  }

  async deleteQuestion(req, res) {
    try {
      const id = req.params.id;
      const deleteQuestion = await db.query(
        "DELETE FROM question_on_product WHERE question_id=$1",
        [id]
      );
      res.json(deleteQuestion.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка удаления вопроса", error: err });
    }
  }

  async updateQuestion(req, res) {
    try {
      const { id, likecount } = req.body;
      const updateQuestion = await db.query(
        "UPDATE question_on_product set likecount=$2 WHERE question_id=$1 RETURNING *",
        [id, likecount]
      );
      res.json(updateQuestion.rows[0]);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ошибка обновления вопроса", error: err });
    }
  }
}

module.exports = new Question_on_productController();
