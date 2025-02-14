import React, { useRef, useState } from 'react';
import s from './Position.module.scss';
import useClickOutside from '@hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useUpdatePositionMutation } from '@store/reducers/userApiSlice';
import { setActivePosition } from '@store/reducers/positionSlice';

const Position: React.FC<{ version: string }> = React.memo(({ version }) => {
  const [viewPosition, setViewPosition] = useState<boolean>(false);
  const refPosition = useRef(null);
  const position = useAppSelector((state) => state.position);
  const userId = useAppSelector((state) => state.user?.user?.id) || -1;
  const dispatch = useAppDispatch();
  const [positionTitle, setPositionTitle] = useState<string>(
    position ? position : 'Добавить адрес'
  );

  interface IPositionTool {
    title: string;
    id: number;
  }

  const positionTool: IPositionTool[] = [
    ...(position && position !== 'Санкт-Петербург' && position !== 'Москва'
      ? [{ title: position, id: 1 }]
      : []),
    { title: 'Санкт-Петербург', id: 2 },
    { title: 'Москва', id: 3 },
  ];

  const [updatePositionUser] = useUpdatePositionMutation();

  async function updatePosition(id: number, position: string) {
    await updatePositionUser({ id, position });
  }

  useClickOutside(refPosition, setViewPosition);

  return (
    <div className={`${s.root} ${s[version]}`} ref={refPosition}>
      <button
        className={s.positionButton}
        onClick={() => {
          setViewPosition((prev) => !prev);
        }}
        style={viewPosition ? { borderColor: 'var(--var-text)' } : {}}
      >
        {version === 'Header' ? (
          <>
            <svg
              className={s.positionIcon}
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="50.000000pt"
              height="50.000000pt"
              viewBox="0 0 50.000000 50.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  fill="var(--var-text)"
                  d="M185 456 c-78 -34 -118 -114 -97 -193 13 -48 78 -154 131 -213 l31
-35 31 35 c50 56 116 161 129 207 17 55 6 106 -33 150 -52 60 -125 78 -192 49z
m135 -26 c51 -26 84 -87 77 -142 -6 -41 -67 -150 -117 -208 l-30 -35 -30 35
c-48 56 -110 164 -117 204 -8 53 21 111 71 141 50 30 94 32 146 5z"
                />
                <path
                  fill="var(--var-text)"
                  d="M140 345 c-6 -14 -10 -35 -10 -45 0 -29 19 -72 29 -66 5 4 5 18 -2
36 -8 22 -8 38 0 60 7 18 7 32 2 36 -5 3 -14 -7 -19 -21z"
                />
                <path
                  fill="var(--var-text)"
                  d="M338 365 c-3 -4 -1 -19 5 -36 8 -21 8 -37 0 -59 -7 -18 -7 -32 -2
-36 14 -9 31 48 25 85 -5 35 -18 56 -28 46z"
                />
                <path
                  fill="var(--var-text)"
                  d="M220 325 c-15 -18 -10 -45 13 -59 34 -22 73 27 47 59 -16 19 -44 19
-60 0z m46 -16 c10 -17 -13 -36 -27 -22 -12 12 -4 33 11 33 5 0 12 -5 16 -11z"
                />
              </g>
            </svg>
            <p className={s.positionText}>{positionTitle}</p>
          </>
        ) : (
          <div className={s.positionIconText}>
            <svg
              className={s.positionIcon}
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="50.000000pt"
              height="50.000000pt"
              viewBox="0 0 50.000000 50.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  fill="var(--var-text)"
                  d="M185 456 c-78 -34 -118 -114 -97 -193 13 -48 78 -154 131 -213 l31
-35 31 35 c50 56 116 161 129 207 17 55 6 106 -33 150 -52 60 -125 78 -192 49z
m135 -26 c51 -26 84 -87 77 -142 -6 -41 -67 -150 -117 -208 l-30 -35 -30 35
c-48 56 -110 164 -117 204 -8 53 21 111 71 141 50 30 94 32 146 5z"
                />
                <path
                  fill="var(--var-text)"
                  d="M140 345 c-6 -14 -10 -35 -10 -45 0 -29 19 -72 29 -66 5 4 5 18 -2
36 -8 22 -8 38 0 60 7 18 7 32 2 36 -5 3 -14 -7 -19 -21z"
                />
                <path
                  fill="var(--var-text)"
                  d="M338 365 c-3 -4 -1 -19 5 -36 8 -21 8 -37 0 -59 -7 -18 -7 -32 -2
-36 14 -9 31 48 25 85 -5 35 -18 56 -28 46z"
                />
                <path
                  fill="var(--var-text)"
                  d="M220 325 c-15 -18 -10 -45 13 -59 34 -22 73 27 47 59 -16 19 -44 19
-60 0z m46 -16 c10 -17 -13 -36 -27 -22 -12 12 -4 33 11 33 5 0 12 -5 16 -11z"
                />
              </g>
            </svg>
            <p className={s.positionText}>{positionTitle}</p>
          </div>
        )}

        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="50.000000pt"
          height="50.000000pt"
          viewBox="0 0 50.000000 50.000000"
          preserveAspectRatio="xMidYMid meet"
          className={s.positionDropDownIcon}
          style={viewPosition ? { rotate: '270deg' } : { rotate: '90deg' }}
        >
          <g
            transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
            fill="var(--var-text)"
            stroke="none"
          >
            <path
              d="M134 459 c-4 -6 36 -53 92 -110 l99 -99 -100 -100 c-79 -79 -97 -102
-87 -112 10 -10 35 11 125 100 l112 112 -110 110 c-60 60 -113 110 -117 110
-4 0 -10 -5 -14 -11z"
            />
          </g>
        </svg>
      </button>
      {viewPosition && (
        <div className={s.positionDropDown}>
          <div className={s.addPositionContainer}>
            <p className={s.addPositionText}>Добавить адрес</p>
            <p className={s.addPositionIcon}>+</p>
          </div>
          {positionTool.map((item) => (
            <div
              key={item.id}
              className={s.adressContainer}
              onClick={() => {
                setPositionTitle(item.title);
                updatePosition(userId, item.title);
                dispatch(setActivePosition(item.title));
              }}
            >
              <p className={s.adressText}>{item.title}</p>
              {item.title === positionTitle ? (
                <svg
                  fill="var(--var-text)"
                  className={s.adressCheck}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="50px"
                >
                  <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z" />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});


export default Position