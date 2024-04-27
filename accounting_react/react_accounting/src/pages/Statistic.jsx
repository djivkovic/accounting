import React, { useEffect, useState } from "react";
import '../css/statistic-guide.css'
import Chart from "chart.js/auto";

const Statistic = () => {
  const [data, setData] = useState([]);

  const getAllTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8001/pricing-plan/get-all-transactions", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        const content = await response.json();
        const formattedData = content.map(transaction => ({
          ...transaction,
          created_at: new Date(transaction.created_at)
        }));
        setData(formattedData);
        console.log(formattedData);

        displayChart(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomType = () => {
    const types = ["doughnut"];
    return types[Math.floor(Math.random() * types.length)];
  };

  const displayChart = (data) => {
    const type = getRandomType();
    const ctx = document.getElementById('myChart');

    if (ctx) {
      var myChart = new Chart(ctx, {
        type: type,
        data: {
          labels: data.map(transaction => transaction.created_at.toLocaleDateString()), 
          datasets: [{
            label: `Amount (Last 6 months) (${type} View)`,
            data: data.map(transaction => transaction.amount),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          }],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Statistics",
              font: {
                size: 25,
              },
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                color: "#000",
              },
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const transaction = data[context.dataIndex];
                  return `ID: ${transaction.id}\tAmount: ${transaction.amount}\nUser ID: ${transaction.userId}\n`;
                }
              }
            }
          },
        },
      });
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className="transaction-container">
        <div className="transaction-statistic">
            <canvas id="myChart" width="300" height="100"></canvas>
        </div>
    </div>
  );
};

export default Statistic;
