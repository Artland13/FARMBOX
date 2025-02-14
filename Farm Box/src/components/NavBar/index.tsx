import { useEffect, useRef, useState } from 'react';
import s from './NavBar.module.scss';
import BtnPraimary from '@components/ui/BtnPraimary/BtnPraimary';
import { Link } from 'react-router-dom';
import logo from '@img/logo.png';
import ModalNavBar from '@components/ModalNavBar';
import useClickOutside from '@hooks/useClickOutside';

export default function NavBar() {
  const [viewCatalog, setViewCatalog] = useState<boolean>(false);
  const ref = useRef(null);

  interface ICatalog {
    title: string;
    id: number;
    link: string;
    image: string;
  }

  useClickOutside(ref, setViewCatalog);

  const caruselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (caruselRef.current) {
        caruselRef.current.scrollLeft += e.deltaY;
      }
    };

    const caruselEl = caruselRef.current;
    if (caruselEl) {
      caruselEl.addEventListener('wheel', handleWheel as EventListener);
    }

    return () => {
      if (caruselEl) {
        caruselEl.removeEventListener('wheel', handleWheel as EventListener);
      }
    };
  }, []);

  const catalog: ICatalog[] = [
    {
      title: 'Фермерское мясо',
      id: 1,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Мясо домашней птицы',
      id: 2,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Молочные продукты',
      id: 3,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Сыры',
      id: 4,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Деликатесы',
      id: 5,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Домашние яйца',
      id: 6,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Натуральные полуфабрикаты',
      id: 7,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Бакалея',
      id: 8,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Специи',
      id: 9,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Овощи',
      id: 10,
      link: '/sdf',
      image: logo,
    },
    {
      title: 'Фрукты',
      id: 11,
      link: '/sdf',
      image: logo,
    },
  ];

  return (
    <div className={s.root}>
      <div
        className={s.button}
        onClick={() => {
          setViewCatalog((prev) => !prev);
        }}
        ref={ref}
      >
        <BtnPraimary title={'Каталог'} />
        {viewCatalog && <ModalNavBar catalog={catalog} />}
      </div>
      <div className={s.carusel} ref={caruselRef}>
        {catalog.map((item) => (
          <div key={item.id} className={s.item} title={item.title}>
            <Link to={item.link}>
              <p className={s.text}>{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
