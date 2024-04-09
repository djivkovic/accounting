import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllPricingPlans = (props:{name:string, user_type:string, user_id:string}) => {
     interface Product {
    id: string;
    name: string;
    price: string;
    adv: string;
    }

    const [data, setData] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

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

    const deletePricingPlan =  async (id:any)=>{
          try {
            const response = await fetch(`http://localhost:8001/pricing-plan/delete-pricing-plan/${id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("Successfully deleted pricing plan")
            window.location.reload();
            const content = await response.json();
            setData(content);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllPricingPlan();
    }, []);


    const openModal = (id: string) => {
        setSelectedProductId(id);
        setShowModal(true);
    }

    const closeModal = () => {
        setSelectedProductId(null);
        setShowModal(false);
    }

    console.log('data: ', data);
    
    let menu;

    if(props.user_type ==='Administrator'){
        menu =  (<div className="products-container">
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
                            <button className="delete" onClick={()=>{openModal(product.id)}}>Delete</button>
                            {showModal ? <div className="delete-modal"><p>Are you sure?</p> <button className="btn-yes" onClick={()=>{deletePricingPlan(selectedProductId)}}>Yes</button> <button className="btn-no" onClick={closeModal}>No</button></div>:<></>}
                        </div>
                    </div>
                ))}
            </div>
        </div>)
    }else{
        menu = <div>Access denied</div>
    }
    return (
       menu
    );
};

export default ViewAllPricingPlans;
