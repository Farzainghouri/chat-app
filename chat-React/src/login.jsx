import React from "react";
import tick from "./assets/tick.gif";
import { useState } from "react";
import { auth } from "./firebaseConfig/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function login() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);

  const loginToDatabase = () => {
    if (Email != "" && password != "") {
    
      signInWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
            setIsloading(true)
            console.log(userCredential)
            alert("Signin sucessfully")
            window.location.href = "./home"
        })
        .catch((error) => {
         alert(error.message);
         setIsloading(false)
        });
    }
  };

  return (
    <div>
      <div className="w-full h-[100vh] bg-yellow-700 flex items-center justify-center">
        <div className="flex flex-col gap-6 items-center ">
          <img src={tick} className="h-[190px] w-[350px] object-contain" />
          <input
            type="text"
            className="w-[300px] h-[45px] sm:h-[45px] sm:w-[400px] rounded-lg p-1"
            placeholder="Enter Email address"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-[300px] h-[45px] sm:h-[45px] sm:w-[400px] rounded-lg p-1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="./signup">
          <p className="text-white">Don't have an account</p>
          </Link>
          {isloading ? (
            <Loader />
          ) : (
            <button
              className="border-2 p-3 bg-white rounded-lg w-[200px] hover:bg-teal-400 font-bold "
              onClick={loginToDatabase}
            >
              Login
            </button>
          )}
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
}

export default login;
