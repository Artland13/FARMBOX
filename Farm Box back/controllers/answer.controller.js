const db = require("../db");
const transformDate = require("../service/transformDate");

class AnswerController {
  async createAnswer(req, res) {
    try {
      const { on_feedback_id, on_question_id, username, to_username, comments } = req.body;
      const likeCount = 0;
      const dislikeCount = 0;
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0];
      const newAnswer = await db.query(
        "INSERT INTO answer (on_feedback_id,on_question_id,username,to_username,comments,likeCount,dislikeCount,date_answer) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          on_feedback_id,
          on_question_id,
          username,
          to_username,
          comments,
          likeCount,
          dislikeCount,
          date,
        ]
      );

      res.json(newAnswer.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка создания ответа", error: err });
    }
  }

  async getAnswers(req, res) {
    try {
      const [on_feedback_id, on_question_id] = req.query.id;
      let getAnswer;
      if (on_feedback_id !== "-1") {
        getAnswer = await db.query(
          "SELECT * FROM answer where on_feedback_id=$1",
          [on_feedback_id]
        );
      } else {
        getAnswer = await db.query(
          "SELECT * FROM answer where on_question_id=$1",
          [on_question_id]
        );
      }
      console.log(getAnswer.rows)
      getAnswer.rows.map((item) => {
        item.date_answer = transformDate(item.date_answer);
      });
      console.log(getAnswer.rows)
      res.json(getAnswer.rows);
    } catch (err) {
      res.status(500).json({ message: "Ошибка получения ответов", error: err });
    }
  }

  async deleteAnswer(req, res) {
    try {
      const id = req.params.id;
      const deleteAnswer = await db.query(
        "DELETE FROM answer WHERE answer_id=$1",
        [id]
      );
      res.json(deleteAnswer.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка удаления ответа", error: err });
    }
  }

  async updateAnswer(req, res) {
    try {
      const { id, likecount, dislikecount } = req.body;
      const updateAnswer = await db.query(
        "UPDATE answer set likecount=$2,dislikecount=$3 WHERE answer_id=$1 RETURNING *",
        [id, likecount, dislikecount]
      );
      res.json(updateAnswer.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Ошибка обновления ответа", error: err });
    }
  }
}

module.exports = new AnswerController();
