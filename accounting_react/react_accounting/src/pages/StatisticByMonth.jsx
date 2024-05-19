import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const StatisticByMonth = () => {
  const [yearMonth, setYearMonth] = useState('');
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const handleChange = (event) => {
    setYearMonth(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`http://localhost:8001/pricing-plan/transactions/${yearMonth}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const transactions = await response.json();
      setData(transactions);

      // Prepare data for the chart
      const labels = transactions.map(tx => tx.userId); // Use userId as label
      const amounts = transactions.map(tx => tx.amount); // Use amount as data point

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Amount',
            data: amounts,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(220,220,220,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

const handleDownloadPDF = () => {
  const chart = document.getElementById("chart");

  html2canvas(chart, {scale:0.5}).then(canvas => { // Povećavamo faktor skaliranja kako bismo smanjili veličinu slike na stranici
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
      transactionsTable.push([`Transaction: ${transaction.id}`, `Amount: ${transaction.amount}`, `User ID: ${transaction.userId}`, `Date: ${transaction.created_at}`]);
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


  return (
    <>
      <input type="text" value={yearMonth} onChange={handleChange} placeholder="Enter year and month (YYYY-MM)"/>
      <button onClick={handleButtonClick} className='btn-see-statistic'>Fetch Transactions</button>
      <button onClick={handleDownloadPDF} className='btn-see-statistic'>Download as PDF</button>
      <div id='chart' className="lin-graph">
        {chartData && <Line data={chartData} options={{
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const itemIndex = tooltipItems[0].dataIndex;
                  return `Date: ${new Date(data[itemIndex].created_at).toLocaleString()}`;
                },
              },
            },
          },
        }} />}
      </div>
    </>
  );
};

export default StatisticByMonth;