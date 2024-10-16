import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDateTime = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data-time"],
    queryFn: async () => {
      try {
        const response = await axios("https://timeapi.io/api/time/current/ip?ipAddress=101.2.167.255");
        console.log(response);
        return response.data;
      } catch (err) {
        // If an error occurs during the request, throw it to be caught by React Query
        throw new Error(err.response?.data?.message || "Failed to fetch date and time.");
      }
    },
  });

  if (isLoading) {
    console.log("Loading...");
  }

  if (error) {
    console.error("Error fetching data:", error.message);
  }

  return { data, isLoading, error };
};

export default useDateTime;
