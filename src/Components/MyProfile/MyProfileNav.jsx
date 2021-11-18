import { useSelector } from "react-redux";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { navLinks } from "../../utils/navlinks";
import { MdAccountBox } from "react-icons/md";


export function MyProfileNav() {
    const { username, email } = useSelector((state) => state.user);
    const [ profile, setProfile ] = useState(false);

   const handleProfile = e => {
       
    setProfile(true);
               
        
   }
   if(profile===true){
    return(
        <div style={{background: "none"}}>
            <div>
                <Link to='/'>My Account</Link>
            </div>
            <div>
                <Link to='/'>Logout</Link>
            </div>
            
        </div>
    );
    }
  

   
    return (
    <>
        <div style={{display:"flex-end"}}>
            <button style={{ marginLeft: "auto"}} onClick={handleProfile}><MdAccountBox size="2em"/></button>
        </div>


    </>
    );
}
