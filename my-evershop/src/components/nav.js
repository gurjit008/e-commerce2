import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  //toggle button
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [qty, setQty] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const quantity = items.map((item) => item.qty);
  useEffect(() => {
    if (quantity.length > 0) {
      setQty(quantity.reduce((total, num) => +total + +num));
    } else setQty(null);
  }, [items,quantity]);

  const menu = () => {
    const menu = document.getElementById("m-menu");
    if (menu.classList.contains("hidden")) {
      menu.classList.replace("hidden", "md:hidden");
    } else {
      menu.classList.add("hidden");
    }
  };
  const navigate = useNavigate();
  const handleSearchQuery = (e) => {
    if (e.key === "Enter") {
      searchQuery();
    }
  };

  useEffect(() => navigate("/search", { state: {searchResult,query} }), [searchResult]);

  const handleQueryChange = async (e) => {
    setQuery(e.target.value);
  };
  const searchQuery = async (e) => {
    try {
      const response = await axios.get(
        `https://e-commerce-backend-wpmd.onrender.com/products/search?q=${query}`
      );
      console.log(response.data);
      setSearchResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(()=>async function(){
  //   try {

  //     const response = await axios.get(`http://localhost:8001/search?q=${query}`)
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // },[query])

  return (
    <>
      <nav className="sm:static sticky z-30 bg-white top-0">
        <div className="grid grid-cols-12  border-b   items-center py-4 md:px-7 px-5 ">
          <div className="logo col-span-1   ">
            <Link to={"/"}>
              {" "}
              <img
                class="object-contain filter brightness-0 grayscale  h-8"
                src={"https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691444780/product_images/logo_s7wdrl.png"}
                alt=""
              />
            </Link>
          </div>

          <div className="logo col-span-10 justify-center decoration-solid  flex md:visibl invisibl list-none ">
            {/* <li className="hover:underline cursor-pointer">
              <Link to={"/Kids"}> Kids</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <NavLink to={"/Women"}> Women </NavLink>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to={"/Men"}> Men </Link>
            </li> */}
            <div className=" flex rounded bg-gray-100  focus-within:outline outline-1 items-center">
              <svg
                class="w-7 h-4 flex-shrink-0  text-gray-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>

              <input
                type="text"
                onKeyDown={handleSearchQuery}
                onChange={(e) => handleQueryChange(e)}
                value={query}
                className="focus:border-transparent w-[30vw] bg-transparent peer border-none focus:ring-0"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="3-icon flex gap-3 col-span-1 justify-self-end ">
            <span className="relative">
              <Link to="/shoppingCart">
                <svg
                  class="w-5 h-5  text-gray-800 dark:text-white  cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z"
                  />
                </svg>
              </Link>

              <span
                className="absolute bottom-2 left-3 bg-black  text-white font-bold text-sm px-1.5  rounded-full"
                style={{ fontSize: "10.5px" }}
              >
                {qty}
              </span>
            </span>
            {/* --------------Login-------------- */}
            <Link to="login">
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white  cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 18"
              >
                <path
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                />
              </svg>
            </Link>

            <svg
              class="w-5 h-5 text-gray-800 dark:text-white md:hidden   cursor-pointer"
              onClick={menu}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 17 14"
            >
              <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
            </svg>
          </div>
        </div>

        <div className="list-none px-2 pt-4 text-sm hidden" id="m-menu">
          <Link to="/Kids">
            {" "}
            <li className=" hover:underline cursor-pointer">Kids</li>{" "}
          </Link>
          <hr class="border-t border-gray-400 my-4" />
          <Link to="/Women">
            {" "}
            <li className="hover:underline cursor-pointer">Women</li>{" "}
          </Link>
          <hr class="border-t border-gray-400 my-4" />
          <Link to="/Men">
            {" "}
            <li className="hover:underline cursor-pointer">Men</li>{" "}
          </Link>
          <hr class="border-t border-gray-400 my-4" />
        </div>
      </nav>
    </>
  );
}

export default Nav;
