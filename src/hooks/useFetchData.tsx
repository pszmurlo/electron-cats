import { useEffect, useState } from "react";
import { AxiosError, axiosInstance } from "../services/apiService";
import { CatFact } from "../types/apiTypes";

interface UseFetchDataProps {
  url: string;
  queryParams?: {
    animal_type?: string;
    amount?: number;
  };
}

type UseFetchDataReturnedType = {
  data: CatFact | null;
  isLoading: boolean;
  error: AxiosError | null;
  fetchNewFact: () => Promise<void>;
};

const useFetchData = ({
  url,
  queryParams = {},
}: UseFetchDataProps): UseFetchDataReturnedType => {
  const [data, setData] = useState<CatFact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setData(null);

    try {
      const response = await axiosInstance.get(url, { params: queryParams });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, fetchNewFact: fetchData };
};

export default useFetchData;
