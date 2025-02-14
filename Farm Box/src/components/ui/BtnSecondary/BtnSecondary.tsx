import React from 'react';
import s from './BtnSecondary.module.scss';

interface Iprops {
  title: string;
}

const BtnSecondary = React.memo(({ title, ...props }: Iprops) => {
  return (
    <button className={s.root} {...props}>
      {title}
    </button>
  );
});

export default BtnSecondary;
