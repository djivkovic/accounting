import { useState } from "react";

const ViewAllPricingPlans = () => {
    const [data, setData] = useState("");
    const array = [
        {"name":"djole1", "price":"2001", "adv":"301", "id":"1"},
        {"name":"djole2", "price":"2002", "adv":"302", "id":"2"},
        {"name":"djole3", "price":"2003", "adv":"303", "id":"3"},
        {"name":"djole4", "price":"2004", "adv":"304", "id":"4"},
        {"name":"djole5", "price":"2005", "adv":"305", "id":"5"},
        {"name":"djole6", "price":"2006", "adv":"306", "id":"6"},



    ];
    
    return (
        <div className="products-containter">
            <h2>All Pricing Plans</h2>
            <div className="products">
                {array.map(product => (
                    <div className="product" key={product.id}>
                        <h3>{product.name}</h3>
                        <div className="details">
                            <span>Number:<br/><strong>{product.adv}</strong></span>
                            <p>Price:<br/><strong>{product.price}</strong></p>
                        </div>
                        <div className="buttons">
                            <button className="edit">Edit</button>
                            <button className="delete">Delete</button></div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllPricingPlans;
