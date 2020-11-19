import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Post} from "../components/Profile/Post";
import {Link} from "react-router-dom";

export const ProfilePage = () => {

    const [userData, setUserData] = useState(null)
    const {token, userId} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const getUserData = useCallback( async () => {
        const data = await request('/api/profile', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setUserData(data.user)
    }, [request, token])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    if (loading) return (<div>loading...</div>)
    if (!userData) return (<></>)

    return(
        <div className='row'>
            <div className="col s1 offset-s1">
                <h3>{userData.username}</h3>
                <h5><Link to={`/friends/${userId}`}>Friends:</Link> {userData.friends.length}</h5>
                <h5>My posts:</h5>
                <div>
                    {userData.posts.reverse().map((postId) => {
                        return (<Post data={postId}/>)
                    })}
                </div>
            </div>
        </div>

    )
}