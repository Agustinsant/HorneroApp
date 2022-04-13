import { useState, useEffect } from "react";
import axios from "axios";

function useFetchPost(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: url,
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

export default useFetchPost;