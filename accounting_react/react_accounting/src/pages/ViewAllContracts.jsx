import { useEffect, useState, } from "react";
import "../css/contracts.css";

const ViewAllContracts = (props) => {
    const [contracts, setContracts] = useState([]);

    const getAllContracts = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/get-all-contracts", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setContracts(data);
                console.log(data);
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const acceptContract = async (e, id) =>{
        e.preventDefault();

        const response = await fetch (`http://localhost:8000/api/accept-contract/${id}`,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok){
            alert("Successfully accepted contract");
            window.location.reload();
        }else{
            alert("Error");
        }
    }

     const rejectContract = async (e, id) =>{
        e.preventDefault();

        const response = await fetch (`http://localhost:8000/api/reject-contract/${id}`,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok){
            alert("Successfully rejected contract");
            window.location.reload();
        }else{
            alert("Error");
        }
    }


    useEffect(() => {
        getAllContracts();
    }, []);

    let menu;

    if (props.user_type === 'Accountant'){
        menu = (<div className="contract-container">
    <h2>All Contracts</h2>
    <div className="contracts">
        {contracts.map(contract => (
            <div className={`contract contract-${contract.status}`} key={contract.contractId}>
                <h3>Contract ID: {contract.contractId}</h3>

                <div className="contract-details">
                    <p><strong>Hotelijer ID:</strong> {contract.hotelijerId}</p>
                    <p><strong>Hotelijer Name:</strong> {contract.hotelijerName}</p>
                    <p><strong>Hotelijer Message:</strong> {contract.hotelijerMessage}</p>
                    <p><strong>Withdraw Condition:</strong> {contract.withdrawCondition}</p>
                    <p><strong>Percentage:</strong> {contract.percentage}</p>
                    <p><strong>Date:</strong>{new Date(contract.date).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {contract.status}</p>
                </div>

                {(contract.status !== "rejected" && contract.status !== "accepted") && (
                    <div className="contract-buttons">
                        <button className="btn-yes" onClick={(e)=>{acceptContract(e, contract.contractId)}}>Accept</button> 
                        <button className="btn-no" onClick={(e)=>{rejectContract(e, contract.contractId)}}>Reject</button>
                    </div>
                )}
            </div>
        ))}
    </div>
</div>)
    }else{
        menu = <h1 className="access-denied">Access Denied</h1>
    }

    return (
        <>
        {menu}

        </>
    );
}

export default ViewAllContracts;
