import '../css/home.css';

const Home = (props:{name:string, user_type:string}) => {
    return(<div>
    {props.name && props.user_type === 'accounting' ? 'Home page' : 'Access denied!'}
  </div>)
}
 
export default Home;