import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PricingPlanShop = (props:{name:string, user_type:string, user_id:string}) => {
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


    const BuyPricingPlan = async (balance:number)=>{
        try{
            const response = await fetch("http://localhost:8001/pricing-plan/pricing-plan-shop",{
                method:"PUT",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({balance, user_id:props.user_id})
            });

            if(!response.ok){
                throw new Error('Network response was not ok');
            }else{
                alert('Successfully bought pricing plan');
                window.location.reload();
            }
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        getAllPricingPlan();
    }, []);

    
    console.log('data: ', data);
    
    let menu;

    if(props.user_type === 'Guide'){
    // if(true){
        menu = (
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
                                    <button className="edit" onClick={()=>{
                                        BuyPricingPlan(+product.price)
                                    }}>Buy</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        menu = <div>Access denied</div>;
    }

    return menu;
};

export default PricingPlanShop;
