import { response } from "express";
import { useEffect } from "react";

const Nav = (props:{name:string; setName:(name:string)=>void, setUserType:(userType:string)=>void, user_id:string, setUserId:(userId:string)=>void, user_type:string}) => {

  useEffect(() => {
    (async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user", {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const content = await response.json();
            console.log('content', content);
            props.setUserType(content.user_type);
            props.setName(content.name);
            props.setUserId(content.id);
        } catch (error) {
            console.error("Failed to fetch:");
        }
    })();
}, [props.name, props]);

    let menu;

    if (props.user_type == "Guide"){
        menu = <></>
    }
    else if(props.user_type == 'Accountant'){
        menu = (
            <nav className="navbar">
        <div className="navbar-brand">
        <ul className="nav-items">
            <li><a href="/">Home</a></li>
            <li><a href="#">Accounting</a></li>
            <li><a href="view-all-transactions">View Transactions</a></li>
            <li><a href="pricing-plan">Pricing plan</a></li>
            <li><a href="view-all-pricing-plans">View All</a></li>
            <li><a href="pricing-plan-shop">Shop</a></li>

        </ul>
        </div>
    </nav>
        )
    }
    else{
       menu = (<>Login to continue</>)
    }

    return ( 
    <nav className="navbar">
        <ul className="nav-items">
            {menu}
        </ul>
    </nav>
    );
}
export default Nav;