import { Link } from 'react-router-dom';
import s from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import React, { forwardRef } from 'react';

interface ICard {
  title: string;
  image: string;
  sales: string;
  price: number;
  price_with_sales: number;
  isLoading: boolean;
  id: number;
}

const Card = forwardRef<HTMLAnchorElement, ICard>(
  ({ title, id, image, sales, price, price_with_sales, isLoading }, ref) => {
    return (
      <React.Fragment>
        {isLoading ? (
          <Link to={`/product/${id}`} className={s.root} ref={ref}>
            <div className={s.container__img} >
              <img src={image} alt={title} className={s.image} />
              {sales && (
                <div className={s.sales}>
                  <p className={s.sales__text} title={sales}>
                    {sales}
                  </p>
                </div>
              )}
            </div>
            {price_with_sales ? (
              <p className={s.price_with_sales}>
                <span className={s.price_with_sales__text}>
                  {price_with_sales} ₽
                </span>{' '}
                <span className={s.price_with_sales__span}>{price} ₽</span>
              </p>
            ) : (
              <p className={s.price}>{price} ₽</p>
            )}
            <p className={s.title} title={title}>
              {title}
            </p>
          </Link>
        ) : (
          <ContentLoader
            speed={2}
            width={'100%'}
            height={'250'}
            backgroundColor="var(--var-bg-second)"
            foregroundColor="var(--var-text-second)"
          >
            <rect x="0" y="10" rx="2%" ry="2%" width="100%" height="190" />
            <rect x="5" y="208" rx="3" ry="3" width="50" height="18" />
            <rect x="65" y="208" rx="3" ry="3" width="50" height="18" />
            <rect x="5" y="232" rx="3" ry="3" width="150" height="18" />
          </ContentLoader>
        )}
      </React.Fragment>
    );
  }
);

export default Card;
