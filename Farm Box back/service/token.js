const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class TokenService {
  async deleteExpiredToken(user_id, now) {
    try {
      await db.query(
        "DELETE FROM token WHERE expires_at < $1 AND user_id = $2",
        [now, user_id]
      );
    } catch (err) {
      console.error("Ошибка при удалении истекшого токена:", err);
    }
  }

  async cteateTokens(email, username) {
    try {
      const newUser = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      const accessToken = jwt.sign(
        { user_id: newUser.rows[0].user_id, username: username },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const token = await db.query("SELECT * FROM token WHERE user_id = $1", [
        newUser.rows[0].user_id,
      ]);

      const now = new Date().toISOString();
      if (token.rows[0]?.expires_at && token.rows[0].expires_at < now) {
        deleteExpiredToken(newUser.rows[0].user_id, now);
      }

      let refreshToken;
      if (!token.rows[0]?.token) {
        refreshToken = jwt.sign(
          { user_id: newUser.rows[0].user_id, username: username },
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: "30d",
          }
        );

        const expiresAt = new Date(Date.now() + 3600 * 1000);
        const newToken = await db.query(
          "INSERT INTO token (token, user_id,expires_at) VALUES ($1, $2, $3) RETURNING *",
          [refreshToken, newUser.rows[0].user_id, expiresAt]
        );
      }
      return { accessToken, refreshToken };
    } catch (err) {
      console.error("Ошибка при создании токенов:", err);
    }
  }
}

module.exports = new TokenService();
