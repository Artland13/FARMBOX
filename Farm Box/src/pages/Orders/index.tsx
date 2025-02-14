import s from './Orders.module.scss';
import OrderCard from '@components/OrderCard';
import BtnSecondary from '@components/ui/BtnSecondary/BtnSecondary';
import logo from '@img/logo.png';
import { useState } from 'react';
import VirtualList from '@components/VirtualList';

export default function Orders() {
  interface IOrderCard {
    title: string;
    image: string;
    description: string;
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

  const update = (value: number, id: number) => {
    const index = orderCards.findIndex((el) => el.id === id);
    orderCards[index].count = value;
    setOrderCards([...orderCards]);
  };

  const check = (id: number) => {
    const index = orderCards.findIndex((el) => el.id === id);
    orderCards[index].checked = !orderCards[index].checked;
    setOrderCards([...orderCards]);
  };

  const updateBlur = (value: number, id: number) => {
    if (value <= 1) {
      const index = orderCards.findIndex((el) => el.id === id);
      orderCards[index].count = 1;
      setOrderCards([...orderCards]);
    }
  };

  const incCount = (id: number) => {
    const index = orderCards.findIndex((el) => el.id === id);
    orderCards[index].count++;
    setOrderCards([...orderCards]);
  };

  const decCount = (id: number) => {
    const index = orderCards.findIndex((el) => el.id === id);
    orderCards[index].count--;
    setOrderCards([...orderCards]);
  };

  const deleteCard = (id: number) => {
    const index = orderCards.findIndex((el) => el.id === id);
    orderCards.splice(index, 1);
    setOrderCards([...orderCards]);
  };

  const [orderCards, setOrderCards] = useState<IOrderCard[]>([
    {
      title: 'Сырок',
      image: logo,
      description:
        'asdasdasdsadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdad',
      sales: 'Горячие скидки',
      price: 1000,
      priceLater: 200,
      id: 1,
      count: 1,
      maxCount: 4,
      update,
      deleteCard,
      incCount,
      decCount,
      updateBlur,
      checked: true,
      check,
    },
    {
      title: 'Сырок',
      image: logo,
      description: 'asd',
      sales: 'Горячие скидки',
      price: 1000,
      priceLater: 0,
      id: 2,
      count: 1,
      maxCount: 4,
      update,
      deleteCard,
      incCount,
      decCount,
      updateBlur,
      checked: true,
      check,
    },
    {
      title: 'Сырок',
      image: logo,
      description: '',
      sales: 'Горячие скидки',
      price: 1000,
      priceLater: 200,
      id: 3,
      count: 1,
      maxCount: 4,
      update,
      deleteCard,
      incCount,
      decCount,
      updateBlur,
      checked: true,
      check,
    },
    {
      title: 'Сырок',
      image: logo,
      description:
        'asdasdasdsadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdad',
      sales: 'Горячие скидки',
      price: 1000,
      priceLater: 200,
      id: 4,
      count: 1,
      maxCount: 4,
      update,
      deleteCard,
      incCount,
      decCount,
      updateBlur,
      checked: true,
      check,
    },
    {
      title: 'Сырок',
      image: logo,
      description:
        'asdasdasdsadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdad',
      sales: 'Горячие скидки',
      price: 1000,
      priceLater: 200,
      id: 5,
      count: 1,
      maxCount: 4,
      update,
      deleteCard,
      incCount,
      decCount,
      updateBlur,
      checked: true,
      check,
    },
    {
      title: 'Сырок',
      image: logo,
      description:
        'asdasdasdsadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdad',
      sales: 'Горячие скидки',
      price: 1000,
      priceLater: 200,
      id: 6,
      count: 1,
      maxCount: 4,
      update,
      deleteCard,
      incCount,
      decCount,
      updateBlur,
      checked: true,
      check,
    },
    {
      title: 'Сырок',
      image: logo,
      description:
        'asdasdasdsadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdad',
      sales: 'Горячие скидки',
      price: 1000,
      priceLater: 200,
      id: 7,
      count: 1,
      maxCount: 4,
      update,
      deleteCard,
      incCount,
      decCount,
      updateBlur,
      checked: true,
      check,
    },
  ]);

  const totalPrice: number = orderCards.reduce((acc, item) => {
    if (item?.checked) {
      return acc + item.price * item.count;
    } else {
      return acc;
    }
  }, 0);

  const totalPriceLater: number = orderCards.reduce((acc, item) => {
    if (item?.checked) {
      return acc + item.priceLater * item.count;
    } else {
      return acc;
    }
  }, 0);

  const discount: number = totalPrice - totalPriceLater;

  const totalCount: number = orderCards.reduce((acc, item) => {
    if (item?.checked) {
      return acc + item.count;
    } else {
      return acc;
    }
  }, 0);

  return (
    <>
      <div className={s.root}>
        <section className={s.mainContainer}>
          <h1 className={s.title}>Корзина</h1>
          {orderCards.length ? (
            orderCards.map((item) => (
              <div className={s.card} key={item.id}>
                <OrderCard
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  sales={item.sales}
                  price={item.price}
                  priceLater={item.priceLater}
                  update={update}
                  deleteCard={deleteCard}
                  count={item.count}
                  maxCount={item.maxCount}
                  incCount={incCount}
                  decCount={decCount}
                  updateBlur={updateBlur}
                  checked={item.checked}
                  check={check}
                />
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', fontSize: '24px' }}>
              Тут пока пусто
            </p>
          )}
        </section>
        <aside className={s.payContainer}>
          <h2 className={s.title}>Ваша корзина</h2>
          <div className={s.priceContainer}>
            <p className={s.priceText}>Товары{`(${totalCount})`}</p>
            <p className={s.priceNumber}>{totalPrice}</p>
          </div>
          <div className={s.priceContainer}>
            <p className={s.priceText}>Скидка</p>
            <p className={s.priceNumber}>{`-${discount}`}</p>
          </div>
          <div className={s.priceContainer}>
            <p className={s.priceText}>Итоговая цена</p>
            <p className={s.priceNumber}>{totalPriceLater}</p>
          </div>
          <div className={s.payButton}>
            <BtnSecondary title={'Оплатить'} />
          </div>
        </aside>
      </div>
      <div className={s.recContainer}>
        <h1 className={s.title}>Рекомендуем</h1>
        <div className={s.recomendet}>
          <VirtualList />
        </div>
      </div>
    </>
  );
}
