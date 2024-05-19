import { useEffect, useState } from "react";
import '../css/statistic-guide.css'
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useNavigate } from "react-router-dom";

const Statistic = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("pie");
  const [month, setMonth] = useState("");
  const navigate = useNavigate();

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

        displayChart(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const displayChart = (data) => {
    const ctx = document.getElementById('myChart');

    if (ctx) {
        let chartStatus = Chart.getChart("myChart");
        if (chartStatus != undefined) {
        chartStatus.destroy();
        }
      var myChart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: data.map(transaction => 'Transaction: '+ transaction.id), 
          datasets: [{
            label: `Amount (Last 6 months) (${chartType} View)`,
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
                  const date = transaction.created_at.toLocaleDateString();
                  return `ID: ${transaction.id}\tAmount: ${transaction.amount}\nUser ID: ${transaction.userId}\n Date: ${date}`;
                }
              }
            }
          },
        },
      });
    }
  };

 const handleDownloadPDF = () => {
  const chart = document.getElementById("myChart");

  html2canvas(chart).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imageWidth = canvas.width * 0.4; 
    const imageHeight = canvas.height * 0.4; 
    const offsetX = (pdfWidth - imageWidth) / 2;
    const offsetY = (pdfHeight - imageHeight) / 2;
    
    pdf.setFontSize(20);
    pdf.text("Statistic for guides", pdfWidth / 2, 20, { align: 'center' });

    pdf.addImage(imgData, 'PNG', offsetX, offsetY, imageWidth, imageHeight);
    
    pdf.addPage();

    const transactionsTable = [];
    data.forEach(transaction => {
      transactionsTable.push([`Transaction: ${transaction.id}`, `Amount: ${transaction.amount}`, `User ID: ${transaction.userId}`, `Date: ${transaction.created_at.toLocaleDateString()}`]);
    });

    pdf.autoTable({
      head: [['ID', 'Amount', 'User ID', 'Date']],
      body: transactionsTable,
      startY: 40,
      theme: 'grid'
    });
    
    pdf.save("chart.pdf");
  });
};

const navigateToPage = () => {
  navigate("/view-transactions-by-month");
}

useEffect(() => {
  getAllTransactions();
}, [chartType]);

return (
  <div className="statistics">  
      <div className="chart-options">
          <label htmlFor="mySelect">Choose an option:</label>
          <select id="mySelect" onChange={(e) => {
              setChartType(e.target.value);
              displayChart(data);
          }}>
              <option value="pie">Pie</option>
              <option value="doughnut">Doughnut</option>
          </select>
      </div>

      <button onClick={navigateToPage} className="btn-see-statistic">See statistic for certain month</button>

      <div className="transaction-container">
          <div className="statistic-card">
              <div className="transaction-statistic">
                  <canvas id="myChart" width="300" height="100"></canvas>
              </div>
              <button className="download-pdf" onClick={handleDownloadPDF}>Download as PDF</button>
          </div>
      </div>
  </div>
);
};

export default Statistic;
