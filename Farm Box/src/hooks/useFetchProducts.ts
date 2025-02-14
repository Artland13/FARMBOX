import { useGetProductsQuery } from "@store/reducers/productApiSlice";

export const useFetchProducts = (limit:number,page:number,title:string) => {
    const { data, error, isLoading } = useGetProductsQuery({
      limit,
      page,
      title,
    });
  
    return { data, error, isLoading };
  };