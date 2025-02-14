import { IProduct } from 'models/IProduct';
import { Link } from 'react-router-dom';
import s from './Search.module.scss';
import React, { useRef, useState } from 'react';
import useClickOutside from '@hooks/useClickOutside';
import useDebounce from '@hooks/useDebounce';
import { useFetchProducts } from '@hooks/useFetchProducts';

const Search: React.FC<{ version: string }> = React.memo(({ version }) => {
  const refSearch = useRef(null);
  const [viewSearch, setViewSearch] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchTitle, 500);
  const { data } = useFetchProducts(5, 1, debouncedSearchQuery);

  useClickOutside(refSearch, setViewSearch);

  return (
    <div
      ref={refSearch}
      className={`${s.root} ${s[version]}`}
      style={{
        ...(viewSearch && { borderColor: 'var(--var-text)' }),
      }}
    >
      <svg
        fill="var(--var-text)"
        className={s.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
      >
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
      </svg>
      <input
        className={s.searchInput}
        type="text"
        placeholder="Найти в магазине"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTitle(e.target.value)
        }
        value={searchTitle}
        onFocus={() => setViewSearch((prev) => !prev)}
        //onBlur={() => setViewSearch((prev) => !prev)} изменить
      />
      {viewSearch && (
        <div className={s.searchDropDown}>
          {data?.map((item: IProduct) => (
            <Link
              to={`/product/${item.product_id}`}
              key={item.product_id}
              className={s.dropDownTool}
              title={item.title}
            >
              <svg
                fill="var(--var-text)"
                className={s.dropDownIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
              </svg>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
});

export default Search;
