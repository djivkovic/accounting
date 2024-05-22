import { useEffect, useState } from "react";
import "../css/accepted-contracts.css";

const ViewAllAcceptedContracts = (props) => {
    const [contracts, setContracts] = useState([]);
    const [newPercentage, setNewPercentage] = useState({});
    const [bestHotelijer, setBestHotelijer] = useState({});

    const fetchBestHotelijer = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/highest-total-amount/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBestHotelijer(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

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
                const initialPercentages = {};
                data.forEach(contract => {
                    initialPercentages[contract.id] = contract.percentage;
                });
                setNewPercentage(initialPercentages);
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

     const takePercentageFromHotelijer = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/take-percentage-from-hotelijer/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            window.location.reload();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const updatePercentage = async (e, id) => {
        e.preventDefault();
        
        const response = await fetch(`http://localhost:8000/api/update-percentage/${id}/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ percentage: newPercentage[id] })
        });

        if (response.ok) {
            alert("Percentage updated successfully");
            window.location.reload();
        } else {
            alert("Error updating percentage");
        }
    }

    const handlePercentageChange = (e, id) => {
        setNewPercentage({ ...newPercentage, [id]: e.target.value });
    }

    useEffect(() => {
        getAllContracts();
    }, []);

    let menu;

    if (props.user_type === 'Accountant') {
        menu = (
            <div className="contract-container">
                <h2>All Accepted Contracts</h2>

                <div>
                    <div className="buttons">
                        <button className="best-hotelijer" onClick={fetchBestHotelijer}>Show Best Hotelijer</button>
                        <button className="take-percentage" onClick={takePercentageFromHotelijer}>Take Percentage</button>
                    </div>

                    {bestHotelijer.userId && (
                        <div>
                            <p>User ID: {bestHotelijer.userId}</p>
                            <p>Total Amount: {bestHotelijer.total_amount} $</p>
                        </div>
                    )}
                </div>

                <div className="accepted-contracts">
                    {contracts.map(contract => (
                        <div className="accepted-contract" key={contract.contract_id}>
                            <h3>Contract ID: {contract.contract_id}</h3>

                            <div className="accepted-contract-details">
                                <p><strong>Hotelijer ID:</strong> {contract.id}</p>
                                <p><strong>Hotelijer Name:</strong> {contract.name}</p>
                                <p><strong>Hotelijer Email:</strong> {contract.email}</p>
                                <p><strong>Balance: </strong> {contract.balance} $</p>
                                <p><strong>Percentage: </strong> {contract.percentage} %</p>
                                <input 
                                    type="number" 
                                    onChange={(e) => handlePercentageChange(e, contract.id)} 
                                    placeholder="Enter new percentage" 
                                    className="percentage-input"
                                />
                                <button 
                                    onClick={(e) => updatePercentage(e, contract.id)} 
                                    className="update-percentage"
                                >
                                    Update Percentage
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        menu = <h1 className="access-denied">Access Denied</h1>
    }

    return (
        <>
            {menu}
        </>
    );
}

export default ViewAllAcceptedContracts;
