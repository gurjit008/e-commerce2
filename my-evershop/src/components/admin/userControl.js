import React, { useEffect, useState } from "react";
import axios from "axios";
function UserControl() {
  const [userIds, setUserIds] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers,setSelectedUsers] =useState(null);
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState(null);
  const [users,setUsers]=useState([]);
  const [userEmail,setUserEmail]=useState('');

  const [checkes,setCheckes]=useState(null);




  // const api = axios.create({
  //   baseURL: "https://e-commerce-backend-wpmd.onrender.com/users",
  //   // withCredentials:true
  // });
  
  const api = axios.create({
    baseURL: 'https://e-commerce2-backend.onrender.com/users'
    // You can also configure other options here
  });

  const getUsers = async () => {
    try {
      console.log("feching users data");
      const response = await api.get("/allUser");
      console.log("users data",response.data);
      console.log("feched users data");
      setUsers(response.data);
    
      if (response.status == 200) {
  
      }
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
  };
  // useEffect(() => getUsers, []);
  useEffect( getUsers, []);



  const filteringUsers =()=>{
console.log('users----',users);

const lowercaseName= userName.toLowerCase();
    let userFilterByName =[];
    if(userName){
        userFilterByName = users.filter(user=> user.name.toLowerCase().startsWith(lowercaseName));

    }else{
        userFilterByName=users;
    }
    console.log("userFilterByName",userFilterByName);

const lowerCaseEmail =userEmail.toLowerCase();
    let userFilterByEmail =[];
    if(userEmail){
        userFilterByEmail = userFilterByName.filter(user=> user.email.toLowerCase().startsWith(lowerCaseEmail));

    }else{
        userFilterByEmail=userFilterByName;
    }
    console.log("userFilterByEmail",userFilterByEmail);

    let userFilterByStatus =[];
    if(userStatus){
        userFilterByStatus = userFilterByEmail.filter(user=> String(user.enable) == userStatus);
console.log("productFilterByStatus",userFilterByStatus);
    }else{
        userFilterByStatus=userFilterByEmail;
    }
    
    setFilteredUsers(userFilterByStatus);
    setCheckes(null);
    

  }


  console.log("filtere users",filteredUsers);
  useEffect(filteringUsers,[userName,userEmail,userStatus,users]);


  const handleEnable=async()=>{

    try {
        const response = await api.patch('/enableUser',userIds);
        console.log(response);
        setTimeout(
        getUsers,1000
        )
setCheckes(false);
setSelectedUsers(null)
        
        
    } catch (error) {
        console.log(error.response);  
    }
}

  const handleDisable=async()=>{

    try {

        const response = await api.patch('/disableUser',userIds);
        console.log(response);
        setTimeout(
            getUsers,1000
    
            )
setCheckes(false);
setSelectedUsers(null)




        
    } catch (error) {
        console.log(error.response);
        
    }

  }

  const handleCheckBox = (event,user)=>{
    
    const checked = event.target.checked;
    

    checked ?  setUserIds([...userIds,user._id]) :  setUserIds(()=>userIds.filter(Id=> Id !==user._id)); 
    checked ?  setSelectedUsers(selectedUsers + 1) :  setSelectedUsers(selectedUsers-1); 

  }

  // const handleChecks=(e)=>{
    
  //   e.target.checked=false

  // }

  return (
    <>
      <div className="gap-3 p-4 col-span-12   px-6 sm:ps-[30vw]  md:ps-[20vw]">
        <div className="flex justify-between pb-4 items-center font-semibold">
          <h1 className="text-xl">Customers</h1>
         
        </div>

        <div className="grid grid-cols-12 py-3  bg-white shadow-lg rounded-lg">
          <div className="col-span-12">
            <div className="grid grid-cols-12 lg:gap-20 gap-6 items-end p-2  px-3">
              
              <ul className="col-span-1">
                <li>
                  <input
                    type="checkbox"
                    className="border-2 border-gray-300 rounded focus:ring-transparent"
                  />
                </li>
              </ul>

              <ul className="col-span-3">
                <li>
                  <label className="font-semibold">Full Name</label>
                </li>
                <li>
                  <input
                    type="text"
                    value={userName}
                    onChange={e=>setUserName(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="User Name"
                  />
                </li>
              </ul>

              <ul className="col-span-3">
                <li>
                  <lable className="font-semibold">Email</lable>
                </li>
                <li>
                  <input
                    type="text"
                    value={userEmail}
                    onChange={(e)=>setUserEmail(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="Email"
                  />
                </li>
              </ul>

              <ul className="col-span-2 w-36">
                <li>
                  <lable className="font-semibold">Status</lable>
                </li>
                <li>
                  <select onChange={e=>setUserStatus(e.target.value)} className="text-sm border rounded w-full border-gray-300">
                    <option value={''} selected disabled>
                      {" "}
                      Please Select{" "}
                    </option>
                    <option value={''}> All</option>
                    <option value={'true'}> Enabled </option>
                    <option value={'false'}> Disabled </option>
                  </select>
                </li>
              </ul>

              <ul className="col-span-2">
                <label className="font-semibold">Created At</label>
                <input
                  type="text"
                  value={"Aug 3, 2023"}
                  // onChange={e=>setProductQty(e.target.value)}
                  className="rounded w-full text-sm border border-gray-300"
                  placeholder="Qty"
                />
              </ul>


            </div>

            {/* visible when any product selected */}
{selectedUsers ? 
  <div className="grid grid-cols-12">
  <ul className="flex text-sm col-span-12 py-5 font-semibold px-3 text-gray-800">
    <li className="border border-gray-300 rounded-s p-1.5 ">
      {selectedUsers} selected
    </li>
    <li className="border border-gray-300  p-2 cursor-pointer" onClick={handleDisable}>Disable</li>
    <li className="border border-gray-300  p-2 cursor-pointer" onClick={handleEnable}>Enable</li>
  </ul>
</div>:''
}
          

            {/*------------------- all products  */}
            {filteredUsers.map((user) => (
              <>
                <hr className="border-t my-4" />

                <div className="grid grid-cols-12 lg:gap-20 gap-6  items-center  px-3">
                  <ul className="col-span-1  flex items-center justify-between">
                    <input
                      type="checkbox"
                      checked={checkes}
                      onChange={(e)=>(handleCheckBox(e,user)) }
                      className="border-2 border-gray-300 rounded focus:ring-transparent"
                    />

                  </ul>

                  <ul className="col-span-3 text-sm">
                    <li className=" font-semibold ps-1">{user.name}</li>
                  </ul>

                  <ul className="col-span-3 ps-1 text-sm">
                    <li>{user.email}</li>
                  </ul>

                  <ul className="col-span-2 flex justify-center w-36">
                    <li className={ `${user.enable ? 'bg-green-400':'bg-green-200' }  rounded-full p-1.5`}></li>
                  </ul>
                  

                  <ul className="col-span-2 text-sm ps-1">
                    <li>Aug 3, 2023</li>
                  </ul>

                 
                </div>
              </>
            ))}
          </div>
        </div>

      </div>

    </>
  );
}

export default UserControl;
