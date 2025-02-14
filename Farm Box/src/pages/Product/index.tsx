import { useParams } from 'react-router-dom';
import s from './Product.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import BtnSecondary from '@components/ui/BtnSecondary/BtnSecondary';
import StarRating from '@components/StarRating';
import Feedback from '@components/Feedback';
import axios from 'axios';
import url from '../../url';
import { IProduct, ICharact } from 'models/IProduct';
import { IFeedback } from 'models/IFeedback';
import Question from '@components/Question';
import { IQuestion } from 'models/IQuestion';
import { useAppSelector } from '@hooks/redux';

export default function Product() {
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [slaiderOffset, setSlaiderOffset] = useState<number>(0);
  const refKaruselContainer = useRef<HTMLHeadingElement>(null);
  const refImages = useRef<HTMLDivElement>(null);
  const refComment = useRef<HTMLDivElement>(null);
  const refQuestion = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [slideHeight, setSlideHeight] = useState<number>(0);
  const [isSlideOnQuestion, setIsSlideOnQuestion] = useState<boolean>(false);
  const [sendQuestionText, setSendQuestionText] = useState<string>('');
  const [isViewSendQuestion, setIsViewSendQuestion] = useState<boolean>(false);
  const username = useAppSelector((state) => state.user?.user?.name);

  useEffect(() => {
    if (refComment.current && refComment.current.clientWidth) {
      setSlideWidth(refComment.current.clientWidth);
    }
    if (refComment.current && refComment.current.clientHeight) {
      setSlideHeight(refComment.current.clientHeight);
    }
  }, []);

  const sendQuestion = () => {
    const data = {
      username,
      comments: sendQuestionText,
      on_product_id: params.id,
    };
    axios
      .post(`${url}/question_on_product`, data)
      .then(() => {
        setSendQuestionText('');
        setIsViewSendQuestion(false);
        axios
          .get(`${url}/question_on_product?id=${params.id}`)
          .then((res) => {
            setQuestions(res.data);
          })
          .catch((err) => console.error(err));
      })
      .catch((e) => console.error(e));
  };

  //заглушка
  const fakeProduct: IProduct = {
    product_id: -1,
    rate: -1,
    title: '',
    image_name: ['../Farm Box back/image/sila_of_earth.png'],
    charact: [{ title: '', type: '' }],
    countFeedback: 0,
    countVideo: 0,
    countQuestion: 0,
    sales: '',
    price: 0,
    price_with_sales: 0,
    product_description: '',
  };
  //

  const [product, setProduct] = useState<IProduct>(fakeProduct);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const arrayRating = useMemo(() => {
    if (feedbacks) {
      const array = [
        { title: '1 звезда', count: 0 },
        { title: '2 звезды', count: 0 },
        { title: '3 звезды', count: 0 },
        { title: '4 звезды', count: 0 },
        { title: '5 звезд', count: 0 },
      ];
      feedbacks.forEach((feedback: IFeedback) => {
        array[feedback.rate - 1].count += 1;
      });
      return array.reverse();
    }
  }, [feedbacks]);

  useEffect(() => {
    axios
      .get(`${url}/product/${params.id}`)
      .then((res) => {
        res.data.countVideo = 3;
        setProduct(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(`${url}/feedback_on_product?id=${params.id}`)
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(`${url}/question_on_product?id=${params.id}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.error(err));
  }, [params.id]);

  const miniCharact: ICharact[] | undefined = product?.charact.slice(0, 7);
  const charact1: ICharact[] | undefined = product?.charact.slice(
    0,
    product.charact.length / 2 + 1
  );
  const charact2: ICharact[] | undefined = product?.charact.slice(
    product.charact.length / 2 + 1
  );

  const navBar: string[] = [
    `${product?.countFeedback} отзывов`,
    `${product?.countVideo} видео`,
    `${questions?.length} вопроса`,
  ];

  return (
    <div className={s.root}>
      <h1 className={s.title} title={product?.title}>
        {product?.title}
      </h1>
      <div className={s.infoContainer}>
        <div className={s.info}>
          <StarRating
            rate={product?.rate}
            width={'30px'}
            isNumber={true}
            isActive={false}
          />
          {navBar.map((item, index) => (
            <a key={index} className={s.navbarItem} href="#feedback">
              {item}
            </a>
          ))}
        </div>
        <p className={s.id}>{`Код: ${product?.product_id}`}</p>
      </div>
      <div className={s.separator}></div>
      <div className={s.mainContainer}>
        <div className={s.productContainer}>
          <section className={s.productSection}>
            <div className={s.slaider}>
              <img
                src={product?.image_name[activeIndex]}
                alt="photo"
                className={s.mainImage}
              />
              <div className={s.karusel}>
                <button
                  className={s.arrow}
                  onClick={() => {
                    if (
                      refKaruselContainer.current !== null &&
                      -slaiderOffset <
                        refKaruselContainer.current.clientWidth * 0.5
                    ) {
                      setSlaiderOffset(0);
                    } else {
                      setSlaiderOffset((prev: number) => {
                        if (refKaruselContainer.current !== null) {
                          return (
                            prev + refKaruselContainer.current.clientWidth * 0.5
                          );
                        }
                        return prev;
                      });
                    }
                  }}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" />
                  </svg>
                </button>
                <div className={s.karuselContainer} ref={refKaruselContainer}>
                  <div
                    className={s.images}
                    style={{ transform: `translateX(${slaiderOffset}px)` }}
                    ref={refImages}
                  >
                    {product?.image_name.map((item, index) => (
                      <img
                        className={s.image}
                        key={index}
                        src={item}
                        alt="photo"
                        onClick={() => {
                          setActiveIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <button
                  className={s.arrow}
                  style={{ rotate: '180deg' }}
                  onClick={() => {
                    if (
                      refKaruselContainer.current !== null &&
                      refImages.current !== null &&
                      slaiderOffset <=
                        -(
                          refImages.current.clientWidth -
                          refKaruselContainer.current.clientWidth * 1.5
                        )
                    ) {
                      setSlaiderOffset(
                        -(
                          refImages.current.clientWidth -
                          refKaruselContainer.current.clientWidth
                        )
                      );
                    } else {
                      setSlaiderOffset((prev: number) => {
                        if (refKaruselContainer.current !== null) {
                          return (
                            prev - refKaruselContainer.current.clientWidth * 0.5
                          );
                        }
                        return prev;
                      });
                    }
                  }}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={s.productContainer__info}>
              <div className={s.productContainer__infoSticky}>
                {miniCharact?.map((item, index) => (
                  <div key={index} className={s.miniCharactContainer}>
                    <p className={s.titleCharact} title={item.title}>
                      {item.title}
                    </p>
                    <p className={s.typeCharact} title={item.type}>
                      {item.type}
                    </p>
                  </div>
                ))}
                <a className={s.anchorCharact} href="#description">
                  Перейти к описанию
                </a>
              </div>
            </div>
          </section>
          <section className={s.descriptionSection} id="description">
            <h2 className={s.title}>Описание</h2>
            <p className={s.descritionText}>{product?.product_description}</p>
          </section>
          <section className={s.charactSection}>
            <h2 className={s.title}>Характеристики</h2>
            <div className={s.charactSection__div}>
              <div>
                {charact1?.map((item, index) => (
                  <div key={index} className={s.miniCharactContainer}>
                    <p className={s.titleCharact} title={item.title}>
                      {item.title}
                    </p>
                    <p className={s.typeCharact} title={item.type}>
                      {item.type}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                {charact2?.map((item, index) => (
                  <div key={index} className={s.miniCharactContainer}>
                    <p className={s.titleCharact} title={item.title}>
                      {item.title}
                    </p>
                    <p className={s.typeCharact} title={item.type}>
                      {item.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className={s.productContainer__add}>
          <p className={s.productContainer__addTitle} title={product?.title}>
            {product?.title}
          </p>
          {product?.sales && (
            <div className={s.sales}>
              <p className={s.sales__text} title={product.sales}>
                {product.sales}
              </p>
            </div>
          )}
          {product?.price_with_sales ? (
            <p className={s.priceLater}>
              <span className={s.priceLater__text}>
                {product.price_with_sales}₽
              </span>{' '}
              <span className={s.priceLater__span}>{product.price}₽</span>
            </p>
          ) : (
            <p className={s.price}>{product?.price}₽</p>
          )}
          <BtnSecondary title={'Добавить в корзину'} />
        </div>
      </div>
      <div className={s.feedBackContainer} id="feedback">
        <div className={s.headline}>
          <div className={s.headlineTitle}>
            <div className={s.feedBackLineContainer}>
              <div className={s.feedBackLineVertical}>
                <div
                  className={s.slider}
                  style={{
                    height: `${slideHeight}px`,
                    marginTop: isSlideOnQuestion ? `${slideHeight}px` : '0px',
                    transition: 'margin-top 0.5s linear',
                  }}
                ></div>
              </div>
              <div className={s.headlineTitle__commentContainer}>
                <div
                  className={s.headlineTitle__comment}
                  ref={refComment}
                  onClick={() => {
                    setIsSlideOnQuestion(false);
                    setSlideWidth((prev) => {
                      if (refComment.current !== null)
                        return refComment.current.clientWidth;
                      else return prev;
                    });
                    setSlideHeight((prev) => {
                      if (refComment.current !== null)
                        return refComment.current.clientHeight;
                      else return prev;
                    });
                  }}
                >
                  <h2>Отзывы о товаре</h2>
                  <p className={s.count}>{product?.countFeedback}</p>
                </div>
                <div
                  className={s.headlineTitle__comment}
                  ref={refQuestion}
                  onClick={() => {
                    setIsSlideOnQuestion(true);
                    setSlideWidth((prev) => {
                      if (refQuestion.current !== null)
                        return refQuestion.current.clientWidth;
                      else return prev;
                    });
                    setSlideHeight((prev) => {
                      if (refQuestion.current !== null)
                        return refQuestion.current.clientHeight;
                      else return prev;
                    });
                  }}
                >
                  <h2>Вопросы о товаре</h2>
                  <p className={s.count}>{questions?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={s.feedBackLine}>
            <div
              className={s.slider}
              style={{
                width: `${slideWidth}px`,
                marginLeft: isSlideOnQuestion
                  ? `calc(100% - ${slideWidth}px)`
                  : '0px',
                transition: 'margin-left 0.5s linear',
              }}
            ></div>
          </div>
        </div>
      </div>
      {!isSlideOnQuestion ? (
        <div className={s.feedBacksContainer}>
          {feedbacks?.length ? (
            <div className={s.feedBackCont}>
              <div className={s.feedBacksContainer__feeds}>
                {feedbacks.map((item) => (
                  <Feedback
                    key={item.feedback_id}
                    feedback={item}
                    feedbacks={feedbacks}
                    product={product}
                    setProduct={setProduct}
                    setFeedbacks={setFeedbacks}
                  />
                ))}
              </div>
              <div className={s.feedbacksRating}>
                <div className={s.feedbacksRating__head}>
                  <StarRating rate={product.rate} width={'30px'}></StarRating>
                  <p className={s.feedbacksRating__head__p}>{product.rate}/5</p>
                </div>
                {arrayRating?.map((item, index) => (
                  <div key={index} className={s.feedbacksRating__rate}>
                    <p className={s.feedbacksRating__rate__text1}>
                      {item.title}
                    </p>
                    <div className={s.feedbacksRating__rate__line}>
                      <div
                        className={s.feedbacksRating__rate__inLine}
                        style={{
                          width: `${
                            (item.count / product.countFeedback) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className={s.feedbacksRating__rate__text2}>
                      {item.count}
                    </p>
                  </div>
                ))}
                <p className={s.feedbacksRating__text}>
                  Отзывы могут оставлять только те, кто купил товар. Так мы
                  формируем честный рейтинг.
                </p>
              </div>
            </div>
          ) : (
            <p className={s.noComments}>Здесь пока нет комментарий</p>
          )}
        </div>
      ) : (
        <div className={s.feedBacksContainer}>
          <div className={s.sendQuestionContainer}>
            <div className={s.sendQuestionHead}>
              <h2 className={s.sendQuestion_h2}>Задайте вопрос о товаре</h2>
              {isViewSendQuestion && (
                <svg
                  className={`${s.sendQuestion__svg} ${s.animatedEl}`}
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setIsViewSendQuestion(false);
                  }}
                >
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="var(--var-text)"
                  />
                </svg>
              )}
            </div>
            <p className={s.sendQuestion__p}>
              Вам ответит продавец, представитель бренда. Пришлем уведомление,
              когда поступит ответ
            </p>
            <input
              type="text"
              placeholder="Напишите свой вопрос"
              className={s.sendQuestion__input}
              value={sendQuestionText}
              onChange={(e) => {
                setSendQuestionText(e.target.value);
              }}
              onClick={() => {
                setIsViewSendQuestion(true);
              }}
            />
            {isViewSendQuestion && (
              <>
                <p className={`${s.sendQuestion__p} ${s.animatedEl}`}>
                  Перед отправкой вопроса, пожалуйста, ознакомьтесь с правилами
                  публикации
                </p>
                <div className={`${s.sendQuestionFoot} ${s.animatedEl}`}>
                  <p className={s.sendQuestionFoot__p}>
                    Вы оставляете отзыв как: <span>{username}</span>
                  </p>
                  <div
                    className={s.sendButton}
                    onClick={() => {
                      sendQuestion();
                    }}
                  >
                    <BtnSecondary title={'Отправить'} />
                  </div>
                </div>
              </>
            )}
          </div>
          {questions?.length ? (
            <div className={s.feedBackCont}>
              <div className={s.feedBacksContainer__feeds}>
                {questions.map((item) => (
                  <Question
                    key={item.question_id}
                    question={item}
                    product={product}
                    setProduct={setProduct}
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                ))}
              </div>
              <div className={s.feedbacksRating}>
                <p className={s.feedbacksRating__text}>
                  Как спросить о сервисе Farm Box? О сервисе Farm Box, доставке
                  и состоянии заказа вы можете узнать в Личном кабинете.
                </p>
              </div>
            </div>
          ) : (
            <p className={s.noComments}>Здесь пока нет вопросов</p>
          )}
        </div>
      )}
    </div>
  );
}
