import {React, useContext} from 'react'
import { Logincontext } from '../context/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Option = ({ deletedata, get }) => {

  const { account, setAccount } = useContext(Logincontext);

  const removedata = async (res, req) => {
    try {
      const res = await fetch(`/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
       
      if(res.status === 400 || !data){
        console.log("error");
        toast.warn("invalid details", {
          position: "top-center",
        })
      }else{
        console.log("user delete");
        setAccount(data);
        toast.success("Item Removed from cart", {
          position: "top-center",
        })
        get();
      }

    } catch (error) {
        console.log("error"); 
    }
  }
  return (
    <div className="add_remove_select">
      <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>Delete</p><span>|</span>
      <p className="forremovemedia">Save Or Later</p><span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer />
    </div>
  )
}

export default Option