import { useState, useEffect } from "react";
import { axiosInstance, AxiosError } from "../services/apiService";
import { CatFact } from "../types/apiTypes";

interface UseFetchDataProps {
  url: string;
  queryParams?: {
    animal_type?: string;
    amount?: number;
  };
}

const useFetchData = ({
  url,
  queryParams = {},
}: UseFetchDataProps): {
  data: CatFact | null;
  isLoading: boolean;
  error: AxiosError | null;
} => {
  const [data, setData] = useState<CatFact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(url, { params: queryParams });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;
