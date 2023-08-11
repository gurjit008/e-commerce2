import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
function CategoryHeader(){
const { category} = useParams();

return(
    <>
    <header className="xl:container xl:mx-auto mx-6 mt-5 xl:px-16">
    <div className="list-none">
<li className="text-sm"><Link to={'/home'} className="text-blue-600" > Home </Link> / {category} </li>
    </div>

    <div className="bg-earthy mt-5  sm:p-12 p-6 pt-16 text-white">
        <h1 className="text-4xl font-bold pb-2" >{category.toUpperCase()}</h1>
        <h5>{category}</h5>
    </div>
    
    </header>
    </>
)
}
export default CategoryHeader;