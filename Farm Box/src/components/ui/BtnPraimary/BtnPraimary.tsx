import React from 'react';
import s from './BtnPraimary.module.scss';

interface Iprops extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const BtnPraimary = React.memo(({ title, ...props }: Iprops) => {
  return (
    <button className={s.root} {...props}>
      {title}
    </button>
  );
});

export default BtnPraimary;
