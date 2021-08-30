import axios from "axios";
import { useState, useEffect } from "react";

export const useAxiosGet = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setFetchedData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, dependencies);

  if (error) {
    console.log(`Error: ${error.message}`);
    return `Error: ${error.message}`;
  }

  return [isLoading, fetchedData];
};
