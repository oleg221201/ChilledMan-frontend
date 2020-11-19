import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Post} from "../components/UserPage/Post";
import {Link, useParams} from 'react-router-dom'


export const UserPage = () => {
    const [currentUserData, setCurrentUserData] = useState(null)
    const [userData, setUserData] = useState(null)
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const id = useParams().id
    let isFollowed = "Follow"

    const getUserData = useCallback( async () => {
        const data = await request(`/api/profile/${id}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        const data1 = await request(`/api/profile/`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setUserData(data.user)
        setCurrentUserData(data1.user)
    }, [request, token, id])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    if (loading) return (<div>loading...</div>)
    if (!userData && !currentUserData) return (<></>)

    if (currentUserData && currentUserData.friends.includes(id)){
        isFollowed = "Unfollow"
    }

    const onBtnClick = async () => {
        if (isFollowed === "Unfollow"){
            await request(`/api/profile/unfollow/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            isFollowed = "Follow"
        } else {
            await request(`/api/profile/follow/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            isFollowed = "Unfollow"
        }
        window.location.reload(false)
    }

    return(
        <div className='row'>
            <div className="col s1 offset-s1">
                <h3>{userData.username}</h3>
                <button
                    disabled={loading}
                    onClick={onBtnClick}
                >
                    {isFollowed}
                </button>
                <h5><Link to={`/friends/${id}`}>Friends:</Link> {userData.friends.length}</h5>
                <h5>User posts:</h5>
                <div>
                    {userData.posts.map((postId) => {
                        return (<Post data={postId}/>)
                    })}
                </div>
            </div>
        </div>

    )
}