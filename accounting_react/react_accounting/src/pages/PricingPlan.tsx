import { SyntheticEvent } from 'react';
import '../css/pricing-plan.css'
const PricingPlan = () => {

    const submit = (e:SyntheticEvent) =>{
        e.preventDefault();
    
        console.log("Form submitted");
    }

    return ( <>
    <body className='body_pricing_plan'>
    <div className="wrapper">
        <h1 className="pricing-title">Create new pricing plan</h1>
        <div className="container">
            <div className="form">
                <form onSubmit={submit}>
                    <div className="form-input">
                        <label htmlFor="">Enter Plan Name: </label>
                        <input type="text" name='plan_name' />
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Number of Advertisement: </label>
                        <input type="number" name='plan_number_adv' />
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Plan Price: </label>
                        <input type="number" name='plan_price' />
                    </div>
                    <button type='submit' className='create-plan-btn'>Create Plan</button>
                </form>
            </div>
        </div>
    </div>
    </body></> );
}
 
export default PricingPlan;