import { useState, useEffect } from "react";

import { getTransactions } from "../../api";

import Error from "../../components/Error";

export default function Income() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(transactions);

  const dataPoints = getDataPoints(transactions);
  console.log(dataPoints);

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

  function PeriodDisplay() {
    return (
      <p className="period-text">
        Last <span className="period-duration">30 days</span>
      </p>
    );
  }

  function mapDataPoints(data) {
    if (data) {
      let sortedData = data.sort(function (a, b) {
        const keyA = Temporal.PlainDate.from(a.date);
        const keyB = Temporal.PlainDate.from(b.date);

        // Compare the two dates
        if (keyA.since(keyB).days > 0) return -1;
        if (keyA.since(keyB).days < 0) return 1;
        return 0;
      });

      const recentEls = sortedData.map((dp) => {
        console.log(dp);
        return (
          <div className="host-income-recents-datapoint">
            <h3>${dp.amount}</h3>
            <p>{dp.date}</p>
          </div>
        );
      });

      return recentEls;
    } else {
      return <p>No Transactions.</p>;
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

  return (
    <div className="host-income-container">
      <h1>Income</h1>
      <PeriodDisplay />
      <h2 className="host-period-total">$2260</h2>
      <div className="host-income-graph-container"></div>
      <div className="host-income-recents-header">
        <h2>Your transactions (x)</h2>
        <PeriodDisplay />
      </div>
      <div className="host-income-recents-list">
        {mapDataPoints(dataPoints.transactionList)}
      </div>
    </div>
  );
}
