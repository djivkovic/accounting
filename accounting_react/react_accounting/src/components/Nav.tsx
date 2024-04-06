import { useEffect } from "react";

const Nav = (props:{name:string; setName:(name:string)=>void, setUserType:(userType:string)=>void, user_id:string, setUserId:(userId:string)=>void}) => {

    useEffect(() => 
      {
            (
                async () => {
                    const response = await fetch("http://localhost:8000/api/user", {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });

                    const content = await response.json();
                    console.log('content', content);
                    props.setUserType(content.user_type);
                    props.setName(content.name);
                    props.setUserId(content.id);
                }
            )();
        
    }, [props.name, props]);


    let menu;

    if(!props.name){
        menu = (<>Login to continue</>)
    }
    else{
        menu = (
            <nav className="navbar">
        <div className="navbar-brand">
        <ul className="nav-items">
            <li><a href="/">Home</a></li>
            <li><a href="#">Accounting</a></li>
            <li><a href="#">Accounting</a></li>
            <li><a href="pricing-plan">Pricing plan</a></li>
            <li><a href="#">View All</a></li>
        </ul>
        </div>
    </nav>
        )
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