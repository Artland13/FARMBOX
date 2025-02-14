import StarRating from '@components/StarRating';
import s from './Feedback.module.scss';
import axios from 'axios';
import url from '../../url';
import { IFeedback } from 'models/IFeedback';
import { IProduct } from 'models/IProduct';
import { useEffect, useState } from 'react';
import AnswerInput from '@components/AnswerInput';
import { IAnswer } from 'models/IAnswer';
import Answer from '@components/Answer';

interface IProps {
  product: IProduct;
  setProduct: React.Dispatch<React.SetStateAction<IProduct>>;
  feedback: IFeedback;
  feedbacks: IFeedback[];
  setFeedbacks: React.Dispatch<React.SetStateAction<IFeedback[]>>;
}

export default function Feedback({
  feedback,
  setProduct,
  product,
  feedbacks,
  setFeedbacks,
}: IProps) {
  const {
    avatar_image,
    username,
    date_feedback,
    rate,
    dignities,
    disadvantages,
    comments,
    likecount,
    dislikecount,
    feedback_id,
  } = feedback;

  const [isViewInput, setIsViewInput] = useState<boolean>(false);
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  function deleteFeedback() {
    axios
      .delete(`${url}/feedback_on_product/${feedback_id}`)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        if (feedbacks) {
          const updatedFeedbacks = feedbacks.filter(
            (feedback: IFeedback) => feedback.feedback_id !== feedback_id
          );

          setProduct((prevProduct: IProduct) => ({
            ...prevProduct,
            countFeedback: product.countFeedback - 1,
          }));

          setFeedbacks([...updatedFeedbacks]);
        }
      });
  }

  useEffect(() => {
    axios
      .get(`${url}/answer?id=${feedback_id}&id=-1`)
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => console.error(err));
  }, [feedback_id]);

  // изменить как появиться user_id
  const masterUser = true;
  const masterProduct = true;
  const user = {
    avatar: '/src/assets/img/logo.png',
    username: 'ну кто-то',
  };
  //

  const [isWarningText, setisWarningText] = useState<boolean>(false);

  const updateLikeCounter = (action: number) => {
    const data = {
      id: feedback_id,
      likecount: action + likecount,
      dislikecount: dislikecount,
    };

    axios
      .put(`${url}/feedback_on_product?id=${feedback_id}`, data)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        if (feedbacks) {
          const feedbackIndex = feedbacks.findIndex(
            (feedback) => feedback.feedback_id === feedback_id
          );
          feedbacks[feedbackIndex].likecount = action + likecount;
          setFeedbacks([...feedbacks]);
        }
      });
  };

  const updateDislikeCounter = (action: number) => {
    const data = {
      id: feedback_id,
      likecount: likecount,
      dislikecount: action + dislikecount,
    };

    axios
      .put(`${url}/feedback_on_product?id=${feedback_id}`, data)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        if (feedbacks) {
          const feedbackIndex = feedbacks.findIndex(
            (feedback) => feedback.feedback_id === feedback_id
          );
          feedbacks[feedbackIndex].dislikecount = action + dislikecount;
          setFeedbacks([...feedbacks]);
        }
      });
  };

  return (
    <div className={s.root}>
      <img src={avatar_image} className={s.image} alt="logo"></img>
      <div className={s.infoContainer}>
        <div className={s.name__date__rate}>
          <div className={s.icon__name}>
            <p className={s.username}>{username}</p>
          </div>
          <div className={s.date__rate}>
            <p className={s.date}>{date_feedback}</p>
            <StarRating rate={rate} width={'30px'} marginTop={'-3px'} />
          </div>
        </div>
        <div className={s.dignities__disadvantages__comments}>
          {dignities && (
            <div className={s.feedback__container}>
              <h2 className={s.title}>Достоинства</h2>
              <p className={s.feedback}>{dignities}</p>
            </div>
          )}
          {disadvantages && (
            <div className={s.feedback__container}>
              <h2 className={s.title}>Недостатки</h2>
              <p className={s.feedback}>{disadvantages}</p>
            </div>
          )}
          {comments && (
            <div className={s.feedback__container}>
              <h2 className={s.title}>Комментарий</h2>
              <p className={s.feedback}>{comments}</p>
            </div>
          )}
        </div>
        <p className={s.ques}>Вам помог этот отзыв?</p>
        <div className={s.like__dislike__option}>
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
            <button
              className={s.rateButton}
              onClick={() => {
                if (!masterUser) {
                  updateDislikeCounter(1);
                } else {
                  setisWarningText(true);
                  setTimeout(() => {
                    setisWarningText(false);
                  }, 5000);
                }
              }}
            >
              <p className={s.rateButton__text}>Нет {dislikecount}</p>
            </button>
            {masterProduct && (
              <button
                className={s.rateButton}
                onClick={() => {
                  setIsViewInput((prev: boolean) => !prev);
                }}
              >
                <p className={s.rateButton__text}>
                  {!isViewInput ? 'Ответить' : 'Скрыть'}
                </p>
              </button>
            )}
          </div>
          {masterUser && (
            <button
              className={s.optionButton__delete}
              onClick={() => {
                deleteFeedback();
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
        {isWarningText && (
          <p className={s.warningText}>
            Вы не можете оценивать свои комментарии
          </p>
        )}
        {isViewInput && (
          <AnswerInput
            avatar={user.avatar}
            to_username={feedback.username}
            on_feedback_id={feedback.feedback_id}
            setViewInput={setIsViewInput}
            username={user.username}
            feedback_id={feedback_id}
            setAnswers={setAnswers}
            on_question_id={-1}
            question_id={-1}
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
