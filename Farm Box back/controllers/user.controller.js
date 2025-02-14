const db = require("../db");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

class UserController {
  async registrationUser(req, res) {
    try {
      const { email, password, name, phoneNumber, surname } = req.body;
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (user.rows[0]) {
        res.status(400).send("Пользователь с такой почтой уже существует");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const username = name + " " + surname;
        let newUser = await db.query(
          "INSERT INTO users (email, hashed_password,username, phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
          [email, hashedPassword, username, phoneNumber]
        );
        const { accessToken, refreshToken } = tokenService.cteateTokens(
          email,
          username
        );
        newUser.rows[0].token = accessToken;
        res.cookie("AccessToken", accessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json(newUser.rows[0]);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Ошибка при регистрации пользователя");
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (user.rows.length > 0) {
        const validPassword = await bcrypt.compare(
          password,
          user.rows[0].hashed_password
        );
        if (validPassword) {
          const { accessToken, refreshToken } = await tokenService.cteateTokens(
            email,
            user.rows[0].username
          );
          res.cookie("AccessToken", accessToken, {
            maxAge: 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });
          res.json({
            name: user.rows[0].username,
            user_id: user.rows[0].user_id,
            position: user.rows[0].position,
          });
        } else {
          res.status(400).send("Неверный пароль");
        }
      } else {
        res.status(404).send("Пользователь не найден");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Ошибка при входе в систему");
    }
  }

  async checkAndRefreshToken(req, res) {
    const token = req.cookies.AccessToken;

    if (!token) {
      return res.status(401).json({ username: "" });
    }

    const users = await db.query("SELECT * FROM users", []);
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = users.rows.find((u) => u.user_id === decoded.user_id);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      res.json({
        name: user.username,
        position: user.position,
        id: user.user_id,
      });
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const decoded = jwt.decode(token);
        const user = users.find((u) => u.user_id === decoded.user_id);
        const refreshToken = await db.query(
          "SELECT * FROM token where user_id=$1",
          [user.user_id]
        );

        if (!user) {
          return res.status(404).json({ message: "Пользователь не найден" });
        }

        if (!refreshToken.rows[0].token) {
          return res.status(403).json({ message: "Refresh токен отсутствует" });
        }

        const { accessToken, refreshTokens } = await tokenService.cteateTokens(
          email,
          user.rows[0].username
        );

        res.cookie("AccessToken", accessToken, {
          maxAge: 60 * 60 * 1000,
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
        res.json({ surname: user.surname });
      } else {
        res.status(401).json({ message: "Неверный токен" });
      }
    }
  }

  async updatePosition(req, res) {
    try {
      const { id, position } = req.body;
      const updatePosition = await db.query(
        "UPDATE users set position=$2 WHERE user_id=$1 RETURNING *",
        [id, position]
      );
    } catch (err) {
      res.status(500).json({ message: "Ошибка обновления ответа", error: err });
    }
  }

  async logoutUser(req, res) {
    try {
      res.clearCookie("AccessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      res.status(200).json({ message: "Logged out" });
    } catch (err) {
      res.status(500).json({ message: "Ошибка выхода", error: err });
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
}

module.exports = new UserController();
