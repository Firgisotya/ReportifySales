import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/Auth";
import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        const data = { nik, password };
        login(data).then((response) => {
            console.log(response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("role", response.data.role_id);

            navigate("/dashboard");
        
            Swal.fire({
                icon: "success",
                title: "Login Success",
                text: "You are logged in!",
              });
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Username or password is incorrect!",
              });
        });
    }

  return (
    <>
      <div className="font-mono h-screen bg-gray-200">
        {/* Container */}
        <div className="container mx-auto">
          <div className="flex justify-center px-6">
            {/* Row */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex my-12">
              {/* Col */}
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/A3DPhhAL6Zg/600x800")',
                }}
              />
              {/* Col */}
              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="nik"
                    >
                      NIK
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="nik"
                      type="text"
                      placeholder="NIK"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      id="checkbox_id"
                    />
                    <label className="text-sm" htmlFor="checkbox_id">
                      Remember Me
                    </label>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                        onClick={handleSignIn}
                    >
                      Sign In
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Create an Account!
                    </a>
                  </div>
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
