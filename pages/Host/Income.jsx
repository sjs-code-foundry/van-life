import { useState, useEffect } from "react";

import { getTransactions } from "../../api";

export default function Income() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(transactions);

  // console.log(Temporal.PlainDate.from("2025-07-11").toString());

  useEffect(() => {
    const controller = new AbortController();

    async function loadTransactions() {
      setLoading(true);
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();

    return () => controller.abort();
  }, []);

  return <h1>Host Income here.</h1>;
}
