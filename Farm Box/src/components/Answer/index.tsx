import { IAnswer } from 'models/IAnswer';
import s from './Answer.module.scss';
import { useState } from 'react';
import url from '../../url';
import axios from 'axios';

interface IProps extends IAnswer {
  setState: React.Dispatch<React.SetStateAction<IAnswer[]>>;
  items: IAnswer[];
}

export default function Answer({
  username,
  to_username,
  comments,
  likecount,
  dislikecount,
  answer_id,
  date_answer,
  setState,
  items,
}: IProps) {
  //поменять с появлением user
  const avatar = '/src/assets/img/logo.png';
  const masterUser = true;
  //

  const [isWarningText, setIsWarningText] = useState<boolean>(false);
  const [isWarningText2, setIsWarningText2] = useState<boolean>(false);

  function deleteItem() {
    axios
      .delete(`${url}/answer/${answer_id}`)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        const updatedItems = items.filter(
          (item: IAnswer) => item.answer_id !== answer_id
        );

        setState([...updatedItems]);
      });
  }

  const updateLikeCounter = (action: number) => {
    const data = {
      id: answer_id,
      likecount: action + likecount,
      dislikecount: dislikecount,
    };

    axios
      .put(`${url}/answer?id=${answer_id}`, data)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        const answerIndex = items.findIndex(
          (item) => item.answer_id === answer_id
        );
        items[answerIndex].likecount = action + likecount;
        setState([...items]);
      });
  };

  const updateDislikeCounter = (action: number) => {
    const data = {
      id: answer_id,
      likecount: likecount,
      dislikecount: action + dislikecount,
    };

    axios
      .put(`${url}/answer?id=${answer_id}`, data)
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        const answerIndex = items.findIndex(
          (item) => item.answer_id === answer_id
        );
        items[answerIndex].dislikecount = action + dislikecount;
        setState([...items]);
      });
  };

  return (
    <div className={s.root}>
      <div className={s.avatar__container}>
        <img className={s.avatar} src={avatar} alt="Аватар пользователя"></img>
        <div className={s.separator}></div>
      </div>
      <div className={s.info__container}>
        <div className={s.head}>
          <div className={s.users}>
            <p className={s.username}>{username}</p>
            <p className={s.secondText}>В ответ {to_username}</p>
          </div>
          <p className={s.secondText}>{date_answer}</p>
        </div>
        <p className={s.text}>{comments}</p>
        <div className={s.like__dislike__option}>
          <div className={s.rateButtons}>
            <button
              className={s.rateButton}
              onClick={() => {
                if (!masterUser) {
                  updateLikeCounter(1);
                } else {
                  setIsWarningText2(true);
                  setTimeout(() => {
                    setIsWarningText2(false);
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
                  setIsWarningText2(true);
                  setTimeout(() => {
                    setIsWarningText2(false);
                  }, 5000);
                }
              }}
            >
              <p className={s.rateButton__text}>Нет {dislikecount}</p>
            </button>
          </div>
          <button
            className={s.optionButton__delete}
            onClick={() => {
              if (masterUser) {
                deleteItem();
              } else {
                setIsWarningText(true);
                setTimeout(() => {
                  setIsWarningText(false);
                }, 5000);
              }
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
        </div>
        {isWarningText && (
          <p className={s.error}>Вы не можете удалять чужие комментарии</p>
        )}
        {isWarningText2 && (
          <p className={s.error}>Вы не можете оценивать свои комментарии</p>
        )}
      </div>
    </div>
  );
}
