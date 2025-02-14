const db = require("../db");

class Feedback_on_productController {
  async createFeedback(req, res) {
    try {
      const {
        avatar_image,
        username,
        date_feedback,
        rate,
        dignities,
        disadvantages,
        comments,
        likeCount,
        dislikeCount,
        on_product_id,
      } = req.body;
      const newFeedback = await db.query(
        "INSERT INTO feedback_on_product (avatar_image,username,date_feedback,rate,dignities,disadvantages,comments,likeCount,dislikeCount,on_product_id) values ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10) RETURNING *",
        [
          avatar_image,
          username,
          date_feedback,
          rate,
          dignities,
          disadvantages,
          comments,
          likeCount,
          dislikeCount,
          on_product_id,
        ]
      );

      res.json(newFeedback.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка создания отзыва", error: err });
    }
  }

  async getFeedback(req, res) {
    try {
      const id = req.query.id;
      const getFeedback = await db.query(
        "SELECT * FROM feedback_on_product where on_product_id=$1",
        [id]
      );
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      getFeedback.rows.map((item) => {
        let array = JSON.stringify(item.date_feedback).split("T");
        item.date_feedback = array[0].substring(1);
        array = item.date_feedback.split("-");
        array[1] = months[Number(array[1]) - 1];
        item.date_feedback = array.reverse().join(" ");
      });
      res.json(getFeedback.rows);
    } catch (err) {
      res.status(500).json({ message: "Ошибка получения отзывов", error: err });
    }
  }

  async deleteFeedback(req, res) {
    try {
      const id = req.params.id;
      const deleteFeedback = await db.query(
        "DELETE FROM feedback_on_product WHERE feedback_id=$1",
        [id]
      );
      res.json(deleteFeedback.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка удаления отзыва", error: err });
    }
  }

  async updateFeedback(req, res) {
    try {
      const {
        id,
        likecount,
        dislikecount,
      } = req.body;
      const updateFeedback = await db.query(
        "UPDATE feedback_on_product set likecount=$2, dislikecount=$3 WHERE feedback_id=$1 RETURNING *",
        [
          id,
          likecount,
          dislikecount,
        ]
      );
      res.json(updateFeedback.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка обновления отзыва", error: err });
    }
  }
}

module.exports = new Feedback_on_productController();
