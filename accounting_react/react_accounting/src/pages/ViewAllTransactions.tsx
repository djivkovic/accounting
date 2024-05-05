import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/guide-transaction.css'

const ViewAllTransactions = (props:{name:string, user_type:string, user_id:string}) => {
     interface Transaction {
        id: string;
        amount: number;
        userId: string;
        created_at: Date;
    }

     interface Balance {
        id: string;
        balance: number;
    }

    const [data, setData] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<Balance | null>(null);


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


const exportToCsv12 = async ()=>{

        const response = await fetch("http://localhost:8001/pricing-plan/get-12month-transactions-csv",{
            method:"GET",
            headers:{'Content-Type':'application/json'},
        });

        if (response.ok) {
            const blob = await response.blob(); 
            const url = window.URL.createObjectURL(new Blob([blob])); 

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Transactions-12months.csv'); 
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);

            alert("Download started...");
        }
    }

const exportToCsv6 = async ()=>{

        const response = await fetch("http://localhost:8001/pricing-plan/get-6month-transactions-csv",{
            method:"GET",
            headers:{'Content-Type':'application/json'},
        });

        if (response.ok) {
            const blob = await response.blob(); 
            const url = window.URL.createObjectURL(new Blob([blob])); 

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Transactions-6months.csv'); 
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
            console.log(content);

        }

    }catch(error){
        console.log(error);
    }
}

const getBalance = async()=>{
    try{
        const response = await fetch("http://localhost:8001/pricing-plan/get-balance",
        {
            method:"GET",
            headers:{"Content-Type":"application/json"}
        }
    );

    if(response.ok){
            const content = await response.json();
            setBalance(content);
            console.log(content);
        }

    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
    getAllTransactions();
},[]);

useEffect(()=>{
    getBalance();
},[]);

let menu;

if(props.user_type === 'Accountant'){
    menu = (<> <div className="transaction-cards">
         <div className="transaction-card">
            <p>Download all transactions (CSV)</p>
            <button className="btn-all-transactions" onClick={()=>{
            exportToCsv()
        }}>CSV</button>
        </div>
     <div className="transaction-card">
        <p>Download transactions for 12 months (CSV)</p>
         <button className="btn-12mh-transactions" onClick={()=>{
            exportToCsv12()
        }}>CSV 12</button>
        </div>
        <div className="transaction-card">
        <p>Download transactions for 6 months (CSV)</p>
         <button className="btn-6mh-transactions" onClick={()=>{
            exportToCsv6()
        }}>CSV 6</button></div>
        <p className="balance">Balance:<br />$  {balance && balance.balance}</p>
    </div>
       
                <h2 className="all-transaction-title">All Transactions</h2>
        <div className="transaction-container">
                <div className="transactions">
                    {data.map(transaction => (
                        <div className="transaction" key={transaction.id}>
                            <h3>Transaction ID: {transaction.id}</h3>
                            <div className="transaction-details">
                                <span>Amount:<strong>  {transaction.amount}</strong></span>
                                <p>User:<strong>  {transaction.userId}</strong></p>
                                <p>Date:<strong>  {transaction.created_at.toLocaleString()}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div></>)
}else{
    menu = <><p className="access-denied">Access Denied !!!</p></>
}

    return ( <>
    {menu}
    </> );
}
 
export default ViewAllTransactions;