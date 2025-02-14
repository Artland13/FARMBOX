import { IProduct } from 'models/IProduct';
import { IQuestion } from 'models/IQuestion';
import s from './Qusetion.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../url';
import AnswerInput from '@components/AnswerInput';
import Answer from '@components/Answer';
import { IAnswer } from 'models/IAnswer';
import { useAppSelector } from '@hooks/redux';

interface IProps {
  product: IProduct;
  setProduct: React.Dispatch<React.SetStateAction<IProduct>>;
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  question: IQuestion;
}

export default function Question({
  question,
  setProduct,
  product,
  questions,
  setQuestions,
}: IProps) {
  const { username, date_question, comments, likecount, question_id } =
    question;

  const [answers, setAnswers] = useState<IAnswer[]>([]);

  function deleteQuestion() {
    axios
      .delete(`${url}/question_on_product/${question_id}`)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        if (questions) {
          const updatedQuestions = questions.filter(
            (question: IQuestion) => question.question_id !== question_id
          );

          setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            countQuestion: product.countQuestion - 1,
          }));

          setQuestions([...updatedQuestions]);
        }
      });
  }

  const updateLikeCounter = (action: number) => {
    const data = {
      id: question_id,
      likecount: action + likecount,
    };

    axios
      .put(`${url}/question_on_product?id=${question_id}`, data)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        if (questions) {
          const questionIndex = questions.findIndex(
            (question) => question.question_id === question_id
          );
          questions[questionIndex].likecount = action + likecount;
          setQuestions([...questions]);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/answer?id=-1&id=${question_id}`)
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => console.error(err));
  }, [question_id]);

  // изменить как появиться user_id
  const masterUser = false;
  const masterProduct = true;
  const user = {
    avatar: '/src/assets/img/logo.png',
    username: useAppSelector((state) => state.user?.user?.name),
  };

  //

  const [isWarningText, setisWarningText] = useState<boolean>(false);
  const [isViewInput, setIsViewInput] = useState<boolean>(false);

  return (
    <div className={s.root}>
      <img src={product.image_name[0]} className={s.img} alt="фото продукта" />
      <div className={s.infoContainer}>
        <div className={s.head}>
          <p className={s.title} title={product.title}>
            {product.title}
          </p>
          <p className={s.date}>{date_question}</p>
        </div>
        <p className={s.question}>{comments}</p>
        <p className={s.username}>{username}</p>
        <div className={s.like__option}>
          <div className={s.rateButtons}>
            <button
              className={s.rateButton}
              onClick={() => {
                if (!masterUser) {
                  updateLikeCounter(1);
                } else {
                  setisWarningText(true);
                  setTimeout(() => {
                    setisWarningText(false);
                  }, 5000);
                }
              }}
            >
              <p className={s.rateButton__text}>Да {likecount}</p>
            </button>
          </div>
          <div className={s.optionButtons}>
            {masterProduct && (
              <button
                onClick={() => {
                  setIsViewInput((prev: boolean) => !prev);
                }}
                className={s.optionButton__answer}
              >
                {!isViewInput ? 'Ответить' : 'Скрыть'}
              </button>
            )}
            {masterUser && (
              <button
                className={s.optionButton__delete}
                onClick={() => {
                  deleteQuestion();
                }}
                title="Удалить"
              >
                <svg
                  className={s.svg__delete}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
                    stroke="var(--var-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {isWarningText && (
          <p className={s.warningText}>Вы не можете лайкать свои вопросы</p>
        )}
        {isViewInput && (
          <AnswerInput
            avatar={user.avatar}
            to_username={question.username}
            on_question_id={question.question_id}
            setViewInput={setIsViewInput}
            username={user.username}
            question_id={question_id}
            setAnswers={setAnswers}
            on_feedback_id={-1}
            feedback_id={-1}
          />
        )}
        {answers?.map((item) => (
          <Answer
            key={item.answer_id}
            username={item.username}
            to_username={item.to_username}
            comments={item.comments}
            likecount={item.likecount}
            dislikecount={item.dislikecount}
            answer_id={item.answer_id}
            date_answer={item.date_answer}
            setState={setAnswers}
            items={answers}
          />
        ))}
      </div>
    </div>
  );
}
