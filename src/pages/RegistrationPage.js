import React, {useState} from "react"
import {useHttp} from "../hooks/http.hook";

export const RegistrationPage = () => {

    const {loading, request} = useHttp()

    const [data, setData] = useState({
        email: "", password: "", username: ""
    })

    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const register = async () => {
        try {
            const reg_data = await request("/api/auth/registration", "POST", {...data})
            console.log("Registration", reg_data)
        } catch (err) {

        }
    }

    return (
         <div>
             <h3>ChilledMan</h3>
             <div className="row">
                 <div className="col s4 offset-s4">
                     <div className="card blue-grey darken-1">
                         <div className="card-content white-text">
                             <span className="card-title" style={{paddingBottom: 10}}>Registration</span>

                             <div className="input-field">
                                 <input
                                     placeholder="Come up with user name"
                                     name="username"
                                     type="text"
                                     onChange={changeHandler}/>
                                 <label htmlFor="username">Username</label>
                             </div>

                             <div className="input-field">
                                 <input
                                     placeholder="Enter email"
                                     name="email"
                                     type="text"
                                     onChange={changeHandler}/>
                                 <label htmlFor="email">Email</label>
                             </div>

                             <div className="input-field">
                                 <input
                                     placeholder="Enter password"
                                     name="password"
                                     type="password"
                                     onChange={changeHandler}/>
                                 <label htmlFor="password">Password</label>
                             </div>

                         </div>
                         <div className="card-action">
                             <button
                                 className="btn"
                                 style={{marginRight: 10}}
                                 onClick={register}
                                 disabled={loading}
                             >
                                 Register
                             </button>
                             <a href="/login">I have an account</a>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
    )
}