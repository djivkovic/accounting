import { SyntheticEvent, useState } from 'react';
import '../css/pricing-plan.css'
const PricingPlan = () => {

    const [name, setName] = useState('');
    const [adv, setAdv] = useState('');
    const [price, setPrice] = useState('');
    const [creator, setCreator] = useState('');


    const submit = async (e:SyntheticEvent) =>{
        e.preventDefault();
    
        console.log("Form submitted");
        console.log(name, adv, price);

        const response = await fetch("http://localhost:8001/pricing-plan/create-pricing-plan",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name, adv, price, creator:'DJOLE'})
        });

        const content = await response.json();

        console.log("content: ", content);
    }

    return ( <>
    <div className='body_pricing_plan'>
    <div className="wrapper">
        <h1 className="pricing-title">Create new pricing plan</h1>
        <div className="container">
            <div className="form">
                <form onSubmit={submit}>
                    <div className="form-input">
                        <label htmlFor="">Enter Plan Name: </label>
                        <input type="text" name='name' onChange={(e)=>{setName(e.target.value)}} />
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Number of Advertisement: </label>
                        <input type="number" name='adv'  onChange={(e)=>{setPrice(e.target.value)}}/>
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Plan Price: </label>
                        <input type="number" name='price' onChange={(e)=>{setAdv(e.target.value)}} />
                    </div>
                    <button type='submit' className='create-plan-btn'>Create Plan</button>
                </form>
            </div>
        </div>
    </div>
    </div></> );
}
 
export default PricingPlan;