import { Link } from 'react-router-dom';
import s from './OrderCard.module.scss';
import ContentLoader from 'react-content-loader';

interface ICard {
  image: string;
  title: string;
  sales: string;
  price: number;
  priceLater: number;
  id: number;
  count: number;
  maxCount: number;
  update(value: number, id: number): void;
  deleteCard(id: number): void;
  incCount(id: number): void;
  decCount(id: number): void;
  updateBlur(value: number, id: number): void;
  checked: boolean;
  check(id: number): void;
}

export default function OrderCard({
  id,
  image,
  title,
  sales,
  price,
  priceLater,
  count,
  maxCount,
  update,
  deleteCard,
  incCount,
  decCount,
  updateBlur,
  checked,
  check,
}: ICard) {
  return (
    <>
      {title ? (
        <div className={s.root}>
          <div className={s.checkbox_img}>
            <input
              type="checkbox"
              className={s.checkbox}
              checked={checked ? true : false}
              onChange={() => {
                check(id);
              }}
            />
            <Link to={`/product/${id}`}>
              <img src={image} alt="preview" className={s.preview} />
            </Link>
          </div>
          <div className={s.container}>
            <div className={s.info}>
              <p className={s.description} title={title}>
                {title}
              </p>
              {sales && (
                <div className={s.sales}>
                  <p className={s.sales__text}>{sales}</p>
                </div>
              )}
            </div>
            {priceLater ? (
              <p className={s.priceLater}>
                <span className={s.priceLater__text}>{priceLater}₽</span>{' '}
                <span className={s.priceLater__span}>{price}₽</span>
              </p>
            ) : (
              <p className={s.price}>{price}₽</p>
            )}
            <div className={s.container__options}>
              <svg
                className={s.trashIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  deleteCard(id);
                }}
              >
                <path
                  d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className={s.counter}>
                <button
                  className={`${s.counter__button} ${
                    count <= 1 ? s.disabled : ''
                  }`}
                  disabled={count <= 1}
                  onClick={() => decCount(id)}
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" />
                  </svg>
                </button>
                <input
                  className={s.counter__input}
                  type="number"
                  value={count}
                  onChange={(e) => {
                    update(Number(e.target.value), id);
                  }}
                  onBlur={(e) => {
                    updateBlur(Number(e.target.value), id);
                  }}
                />
                <button
                  className={`${s.counter__button} ${
                    count >= maxCount ? s.disabled : ''
                  }`}
                  style={{ rotate: '180deg' }}
                  onClick={() => incCount(id)}
                  disabled={count >= maxCount}
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ContentLoader
          speed={2}
          width={'100%'}
          height={'100%'}
          backgroundColor="var(--var-bg-second)"
          foregroundColor="var(--var-text-second)"
        >
          <rect x="0" y="10" rx="2%" ry="2%" width="100%" height="190" />
          <rect x="5" y="208" rx="3" ry="3" width="50" height="18" />
          <rect x="65" y="208" rx="3" ry="3" width="50" height="18" />
          <rect x="5" y="232" rx="3" ry="3" width="150" height="18" />
        </ContentLoader>
      )}
    </>
  );
}
