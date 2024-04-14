import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllTransactions = () => {
     interface Transaction {
        id: string;
        amount: number;
        userId: string;
        created_at: Date;
    }

    const [data, setData] = useState<Transaction[]>([]);
    const exportToCsv = async ()=>{

        const response = await fetch("http://localhost:8001/pricing-plan/get-all-transactions-csv",{
            method:"GET",
            headers:{'Content-Type':'application/json'},
        });

        if (response.ok) {
            const blob = await response.blob(); 
            const url = window.URL.createObjectURL(new Blob([blob])); 

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Transactions.csv'); 
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);

            alert("Download started...");
        }
    }

const getAllTransactions = async()=>{
    try{
        const response = await fetch("http://localhost:8001/pricing-plan/get-all-transactions",
        {
            method:"GET",
            headers:{"Content-Type":"application/json"}
        }
    );

    if(response.ok){
            const content = await response.json();
            setData(content);
        }

    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
    getAllTransactions();
},[])
    return ( <>
        <button onClick={()=>{
            exportToCsv()
        }}>CSV</button>
        <div className="products-container">
                <h2>All Transactions</h2>
                <div className="products">
                    {data.map(product => (
                        <div className="product" key={product.id}>
                            <h3>{product.id}</h3>
                            <div className="details">
                                <span>Number:<br/><strong>{product.amount}</strong></span>
                                <p>Price:<br/><strong>{product.userId}</strong></p>
                                <p>Price:<br/><strong>{product.created_at.toLocaleString()}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </> );
}
 
export default ViewAllTransactions;