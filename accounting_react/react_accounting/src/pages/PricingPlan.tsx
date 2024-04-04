import { SyntheticEvent, useState } from 'react';
import '../css/pricing-plan.css'
const PricingPlan = () => {

    const [planName, setPlanName] = useState('');
    const [planAdv, setPlanAdv] = useState('');
    const [planPrice, setPlanPrice] = useState('');
    const [planCreator, setPlanCreator] = useState('');


    const submit = (e:SyntheticEvent) =>{
        e.preventDefault();
    
        console.log("Form submitted");
        console.log(planName, planAdv, planPrice);
       
        window.location.reload();
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
                        <input type="text" name='plan_name' onChange={(e)=>{setPlanName(e.target.value)}} />
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Number of Advertisement: </label>
                        <input type="number" name='plan_number_adv'  onChange={(e)=>{setPlanPrice(e.target.value)}}/>
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Plan Price: </label>
                        <input type="number" name='plan_price' onChange={(e)=>{setPlanAdv(e.target.value)}} />
                    </div>
                    <button type='submit' className='create-plan-btn'>Create Plan</button>
                </form>
            </div>
        </div>
    </div>
    </div></> );
}
 
export default PricingPlan;