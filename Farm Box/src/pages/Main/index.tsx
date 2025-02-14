// import Card from '@components/Card';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import s from './Main.module.scss';
// import { useGetProductsQuery } from '@store/reducers/productApiSlice';
// import { IProduct } from 'models/IProduct';

// export default function Main() {
//   const [page, setPage] = useState<number>(1);
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const [cardHeight, setCardHeight] = useState<number>(0);
//   const [virtualizationStart, setVirtualizationStart] = useState<number>(0);
//   const [columnCount, rowCount] = [5, 4];

//   const { data, isLoading, isError } = useGetProductsQuery(
//     { limit: 15, page, title: '' },
//     {
//       skip: !isFetching,
//     }
//   );

//   const onScroll = useCallback(() => {
//     const scrollTop = window.scrollY;
//     if (scrollTop !== undefined && cardHeight > 0) {
//       setVirtualizationStart(Math.floor(scrollTop / cardHeight) * columnCount);
//     }
//   }, [cardHeight, columnCount]);

//   useEffect(() => {
//     window.addEventListener('scroll', onScroll);
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//     };
//   }, [onScroll]);

//   const refBottom = useRef<HTMLDivElement>(null);
//   const observerBottom = useRef<IntersectionObserver | null>(null);
//   const refCard = useRef<HTMLAnchorElement>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (refCard.current) {
//         setCardHeight(refCard.current.clientHeight + 20);
//       }
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (data && !isLoading) {
//       setProducts((prevProducts) => {
//         const newProducts = data.filter(
//           (newProduct) =>
//             !prevProducts.some(
//               (product) => product.product_id === newProduct.product_id
//             )
//         );
//         return [...prevProducts, ...newProducts];
//       });
//       setIsFetching(false);
//     }
//   }, [data, isLoading]);

//   useEffect(() => {
//     if (observerBottom.current) observerBottom.current.disconnect();

//     const callback: IntersectionObserverCallback = (entries) => {
//       if (entries[0].isIntersecting && !isFetching && !isLoading) {
//         setIsFetching(true);
//         setPage((prev) => prev + 1);
//       }
//     };

//     observerBottom.current = new IntersectionObserver(callback);
//     if (refBottom.current) observerBottom.current.observe(refBottom.current);

//     return () => {
//       if (observerBottom.current) observerBottom.current.disconnect();
//     };
//   }, [isFetching, isLoading]);

//   useEffect(() => {
//     if (page === 1) {
//       setIsFetching(true);
//     }
//   }, [page]);

//   if (isError) {
//     return (
//       <p
//         className={s.root}
//         style={{
//           fontSize: '50px',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           position: 'absolute',
//         }}
//       >
//         Произошла ошибка
//       </p>
//     );
//   }

//   return (
//     <div className={s.root}>
//       <div
//         className={s.products}
//         style={{
//           marginTop: `${(cardHeight * virtualizationStart) / columnCount}px`,
//           marginBottom: `${(cardHeight * (products.length - virtualizationStart - virtualizationStart * (rowCount - 1))) / columnCount}px`,
//         }}
//       >
//         {products
//           ?.slice(
//             virtualizationStart,
//             virtualizationStart
//               ? virtualizationStart + 4 * rowCount + 1
//               : 4 * rowCount + 1
//           )
//           .map((item, index) => (
//             <Card
//               title={item.title}
//               id={item.product_id}
//               image={item.image_name[0]}
//               sales={item.sales}
//               price={item.price}
//               price_with_sales={item.price_with_sales}
//               key={item.product_id}
//               isLoading={!isLoading}
//               ref={index === 0 ? refCard : undefined}
//             />
//           ))}
//       </div>
//       <div
//         className={s.endPage}
//         ref={refBottom}
//         style={{ height: '10px', width: '10px' }}
//       ></div>
//     </div>
//   );
// }

import s from './Main.module.scss';
import VirtualList from '@components/VirtualList';

export default function Main() {
  return (
    <div className={s.root}>
      <VirtualList />
    </div>
  );
}
