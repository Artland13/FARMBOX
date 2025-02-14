import { Link } from 'react-router-dom';
import s from './ModalNavBar.module.scss';

interface IProps {
  catalog: ICatalog[];
}

interface ICatalog {
  title: string;
  id: number;
  link: string;
  image: string;
}

export default function ModalNavBar({ catalog }: IProps) {
  return (
    <div className={s.root}>
      {catalog.map((item) => (
        <Link
          to={item.link}
          className={s.item}
          key={item.id}
          title={item.title}
        >
          <img src={item.image} alt="preview" className={s.image} />
          <p className={s.text}>{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
