CREATE TABLE product (
    product_id BIGSERIAL PRIMARY KEY,
    rate NUMERIC(3,2),
    title VARCHAR(255) not null,
    image_name VARCHAR(255) ARRAY,
    charact VARCHAR(255) ARRAY,
    sales VARCHAR(255),
    price DECIMAL(10,2) not null,
    price_with_sales DECIMAL(10,2),
    product_description text
);

create TABLE feedback_on_product (
    feedback_id BIGSERIAL PRIMARY KEY,
    avatar_image VARCHAR(255),
    username VARCHAR(255) not null,
    date_feedback date not null,
    rate smallint,
    dignities text,
    disadvantages text,
    comments text,
    likeCount smallint not null,
    dislikeCount smallint not null,
    on_product_id bigint not null,
    FOREIGN KEY (on_product_id) REFERENCES product (product_id)
);

create TABLE answer (
    answer_id BIGSERIAL PRIMARY KEY,
    on_feedback_id bigint,
    on_question_id bigint,
    username VARCHAR(255) not null,
    to_username VARCHAR(255) not null,
    comments text not null,
    likeCount smallint not null,
    dislikeCount smallint not null,
    date_answer date not null
);

create TABLE question_on_product (
    question_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) not null,
    date_question date not null,
    comments text,
    likeCount smallint not null,
    on_product_id bigint not null,
    FOREIGN KEY (on_product_id) REFERENCES product (product_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE token (
  token TEXT NOT NULL,
  user_id INT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  PRIMARY KEY (token),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);


-- {
-- "id":6,
-- "rate":3.45,
-- "title":"ЧедерЧедерЧедерЧе дерЧедерЧедерЧедерЧедерЧедерЧедерЧедерЧедерЧедерЧедерЧедерЧедерЧедер",
-- "image_name":["/src/assets/img/logo.png","/src/assets/img/logo.png","/src/assets/img/logo.png"],
-- "charact":[
-- "Упаковка:Флоу пак, Подложка",
-- "Страна-изготовитель:Россия",
-- "Тип:Овощи",
-- "Вид овощей:Огурец",
-- "Вес товара, г:1000"
-- ],
-- "sales":"Горячие скидки",
-- "price":1000,
-- "price_with_sales":200,
-- "product_description":"Огурцы выращиваются в современных теплицах без использования вредных для здоровья человека веществ, благодаря чему они 100% натуральны. Обладают ярким вкусом, высоким содержанием витаминов и микроэлементов, способствующим укреплению иммунитета, повышению жизненного тонуса и сохранению молодости."
-- }

-- {
--     "id": "2",
--     "avatar_image":"/src/assets/img/logo.png",
--       "username":"иван иванович",
--       "date_feedback":"2001-09-28",
--       "rate":4,
--       "dignities":"так то лучше",
--      "disadvantages":"ну вы что",
--       "comments":"а что",
--       "likeCount":4,
--       "dislikeCount":3,
--       "on_product_id":6
-- }

-- {
--       "username":"иван иванович",
--       "date_question":"2001-9-20",
--       "comments":"ну вот так-то так",
--       "likeCount":3,
--       "on_product_id":6
-- }