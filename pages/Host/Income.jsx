import { useState, useEffect } from "react";

import { getTransactions } from "../../api";

import Error from "../../components/Error";

export default function Income() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(transactions);

  const dataPoints = getDataPoints(transactions);
  console.log(dataPoints);

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

  function getDataPoints(data) {
    if (data) {
      console.log("Transaction data processed");

      function groupTransactionsByMonth() {
        let arr = [];

        for (let i in data) {
          const monthCode = Temporal.PlainDate.from(data[i].date).monthCode;

          if (
            arr.some((month) => {
              return month.code === monthCode;
            })
          ) {
            // Add value to month total
            const updatedArr = arr.map((month) => {
              if (month.code === monthCode) {
                month.value = month.value + data[i].amount;
              }
              return month;
            });
            arr = updatedArr;
          } else {
            // If month doesn't exist, add month along with transaction value
            arr.push({ code: monthCode, value: data[i].amount });
          }
        }
        return arr;
      }

      function findTransactionsFromTimePeriod() {
        // Creates an array of transactions from a specified period, back from today's date

        const today = Temporal.PlainDate.from("2022-12-09");
        // Use static date to ensure data stays in view
        const viewPeriodDays = 30;

        const cutOff = today.subtract({ days: viewPeriodDays });

        let arr = [];

        for (let i in data) {
          const dpDate = Temporal.PlainDate.from(data[i].date);

          if (dpDate.since(cutOff).days > 0) {
            arr.push({ date: data[i].date, amount: data[i].amount });
          }
        }

        return arr;
      }

      return {
        graphData: groupTransactionsByMonth(),
        transactionList: findTransactionsFromTimePeriod(),
      };
    } else {
      return { graphData: null, transactionList: null };
    }
  }

  if (loading) {
    return (
      <div className="van-list-container">
        <h1 aria-live="polite">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  return <h1>Host Income here.</h1>;
}
