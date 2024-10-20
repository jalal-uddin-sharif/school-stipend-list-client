import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useTotalStudentPaymentData = () => {
    const axiosSecure = useAxiosSecure()
    const {data, refetch,isLoading } = useQuery({
        queryKey: ["students-payment"],
        queryFn: async () => {
          try {
            const response = await axiosSecure("/all-payments-data");
            console.log(response.data); 
            return response.data;
          } catch (err) {
            throw new Error(
              err.response?.data?.message || "Failed to fetch date and time."
            );
          }
        },
      });
    return {data, refetch,isLoading}
};

export default useTotalStudentPaymentData;