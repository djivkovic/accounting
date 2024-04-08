import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllPricingPlans = () => {
     interface Product {
    id: string;
    name: string;
    price: string;
    adv: string;
    }

    const [data, setData] = useState<Product[]>([]);


    const getAllPricingPlan = async () => {
        try {
            const response = await fetch("http://localhost:8001/pricing-plan/view-all-pricing-plans", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const content = await response.json();
            setData(content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllPricingPlan();
    }, []);

    console.log('data: ', data);
    
    return (
        <div className="products-container">
            <h2>All Pricing Plans</h2>
            <div className="products">
                {data.map(product => (
                    <div className="product" key={product.id}>
                        <h3>{product.name}</h3>
                        <div className="details">
                            <span>Number:<br/><strong>{product.adv}</strong></span>
                            <p>Price:<br/><strong>{product.price}</strong></p>
                        </div>
                        <div className="buttons">
                            <Link to={`/edit-pricing-plan/${product.id}`}>
                                <button className="edit">Edit</button>
                            </Link>
                            <button className="delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllPricingPlans;
