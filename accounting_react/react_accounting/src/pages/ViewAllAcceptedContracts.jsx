import { useEffect, useState, } from "react";
import "../css/accepted-contracts.css";

const ViewAllAcceptedContracts = (props) => {
    const [contracts, setContracts] = useState([]);

    const getAllContracts = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/get-accepted-contracts", {
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
    <h2>All Accepted Contracts</h2>
    <div className="accepted-contracts">
        {contracts.map(contract => (
            <div className={`accepted-contract`} key={contract.contract_id}>
                <h3>Contract ID: {contract.contract_id}</h3>

                <div className="accepted-contract-details">
                    <p><strong>Hotelijer ID:</strong> {contract.id}</p>
                    <p><strong>Hotelijer Name:</strong> {contract.name}</p>
                    <p><strong>Hotelijer Email:</strong> {contract.email}</p>
                    <p><strong>Balance: </strong> {contract.balance} $</p>
                </div>

                {(contract.status !== "rejected" && contract.status !== "accepted") && (
                    <div className="contract-buttons">
                        <button className="btn-reject" onClick={(e)=>{rejectContract(e, contract.contract_id)}}>Reject Contract</button>
                    </div>
                )}
            </div>
        ))}
    </div>
</div>)
    }else{
        menu = <h1 className="access-denied">Access Denied</h1>
    }


    return ( <>
    {menu}</> );
}
 
export default ViewAllAcceptedContracts;