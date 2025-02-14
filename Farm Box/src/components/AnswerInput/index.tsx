import BtnPraimary from '@components/ui/BtnPraimary/BtnPraimary';
import s from './AnswerInput.module.scss';
import BtnSecondary from '@components/ui/BtnSecondary/BtnSecondary';
import { useState } from 'react';
import axios from 'axios';
import url from '../../url';
import { IAnswer } from 'models/IAnswer';

interface IProps {
  avatar: string;
  to_username: string;
  on_question_id: number;
  on_feedback_id: number;
  username: string | undefined;
  setViewInput: React.Dispatch<React.SetStateAction<boolean>>;
  question_id: number;
  feedback_id: number;
  setAnswers: React.Dispatch<React.SetStateAction<IAnswer[]>>;
}

export default function AnswerInput({
  avatar,
  to_username,
  on_question_id,
  on_feedback_id,
  username,
  setViewInput,
  setAnswers,
  question_id,
  feedback_id,
}: IProps) {
  const [inputText, setInputText] = useState<string>('');
  const [isViewWarning, setIsViewWarning] = useState<boolean>(false);

  const sendText = () => {
    if (!inputText) {
      setIsViewWarning(true);
      setTimeout(() => {
        setIsViewWarning(false);
      }, 5000);
    } else {
      const data = {
        on_feedback_id: on_feedback_id,
        on_question_id: on_question_id,
        username: username,
        to_username: to_username,
        comments: inputText,
      };
      axios
        .post(`${url}/answer`, data)
        .then(() => {
          axios
            .get(`${url}/answer?id=${feedback_id}&id=${question_id}`)
            .then((res) => {
              setAnswers(res.data);
            })
            .catch((err) => console.error(err));
          setViewInput((prev) => !prev);
          setInputText('');
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <div className={s.root}>
      <div className={s.avatar__container}>
        <img className={s.avatar} src={avatar} alt="Аватар пользователя"></img>
        <div className={s.separator}></div>
      </div>
      <div className={s.input__container}>
        <p className={s.secondText}>Ответ на комментарий</p>
        <p className={s.username}>{to_username}</p>
        <input
          className={s.input}
          placeholder="Текст"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></input>
        <p className={s.secondText}>
          Перед отправкой, пожалуйста, ознакомьтесь с правилами публикации
        </p>
        <div className={s.buttons}>
          <div
            className={s.cancelButton}
            onClick={() => {
              setViewInput((prev: boolean) => !prev);
            }}
          >
            <BtnPraimary title={'Отменить'} />
          </div>
          <div
            className={s.sendButton}
            onClick={() => {
              sendText();
            }}
          >
            <BtnSecondary title={'Отправить'} />
          </div>
        </div>
        {isViewWarning && (
          <p className={s.error}>Нельзя отправлять пустой ответ</p>
        )}
      </div>
    </div>
  );
}
