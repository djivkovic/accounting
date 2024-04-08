import { SyntheticEvent, useEffect, useState } from 'react';
import '../css/pricing-plan.css'
import { useParams } from 'react-router-dom';
const EditPricingPlan = () => {

    const [name, setName] = useState('');
    const [adv, setAdv] = useState('');
    const [price, setPrice] = useState('');
    const { id } = useParams();

const getCurrentProduct = async ()=>{

    const response = await fetch(`http://localhost:8001/pricing-plan/get-current-pricing-plan/${id}`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
    });


    const data = await response.json();
    setName(data.name);
    setAdv(data.adv);
    setPrice(data.price);
    console.log(data);
}

useEffect(()=>{
    getCurrentProduct();
},[]);

const submit = async (e:SyntheticEvent) =>{
        e.preventDefault();

          if (isNaN(Number(adv)) || isNaN(Number(price))) {
        alert("Adv and price must be numeric values");
        return;
    }

        console.log("Form submitted");
        console.log(name, adv, price);

        // const response = await fetch(`http://localhost:8001/pricing-plan/edit-pricing-plan`,{
        //     method:"POST",
        //     headers:{'Content-Type':'application/json'},
        //     body:JSON.stringify({name, adv, price})
        // });

        // const content = await response.json();
        // if(response.ok){
        //     alert("Successfully edited pricing plan");
        //     window.location.reload();
        // }

        // console.log("content: ", content);
    }

    let menu;
    if(true){
        menu = (<div className='body_pricing_plan'>
    <div className="wrapper">
        <h1 className="pricing-title">Edit pricing plan</h1>
        <div className="container">
            <div className="form">
                <form onSubmit={submit}>
                    <div className="form-input">
                        <label htmlFor="">Enter Plan Name: </label>
                        <input type="text" name='name' defaultValue={name} onChange={(e)=>{setName(e.target.value)}} />
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Number of Advertisement: </label>
                        <input type="text" name='adv' defaultValue={adv}  onChange={(e)=>{setAdv(e.target.value)}}/>
                    </div>

                     <div className="form-input">
                        <label htmlFor="">Enter Plan Price: </label>
                        <input type="text" name='price' defaultValue={price}  onChange={(e)=>{setPrice(e.target.value)}} />
                    </div>
                    <button type='submit' className='create-plan-btn'>Edit Plan</button>
                </form>
            </div>
        </div>
    </div>
    </div>)
    }else{
       menu = <div>Access denied!</div>
    }

    return ( <>
    {menu}
    </> );
}
 
export default EditPricingPlan;