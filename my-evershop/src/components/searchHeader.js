import { Link ,useLocation} from "react-router-dom"
import { useParams } from "react-router-dom";
function SearchHeader(){
    const [query,setQuery]=useState();
    const state=useLocation().state;
    const navigate = useNavigate();
    useEffect(()=>{
        if(state){
            setQuery(state.query);
        }else{
            navigate('/');
        }
    },[state])
return(
    <>
    <header className="xl:container xl:mx-auto mx-6 mt-5 xl:px-16">
    <div className="list-none">
<li className="text-sm"><Link to={'/home'} className="text-blue-600" > Home </Link> / Search Result </li>
    </div>

    <div className="bg-earthy mt-5  sm:p-12 p-6 pt-16 text-white">
        <h1 className="text-4xl font-bold pb-2" >Search Result</h1>
        <h5>Showing Result for: <span className="italic">{query}</span></h5>
    </div>
    
    </header>
    </>
)
}
export default SearchHeader;