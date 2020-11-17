import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";


export const Post = ({data}) => {

    const [post, setPost] = useState(null)
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const getPostData = useCallback(async () => {
        const postData = await request(`/api/post/${data}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setPost(postData.post)
    }, [request, token, data])

    useEffect(() => {
        getPostData()
    },[getPostData])

    if (loading) return (<div>loading...</div>)
    if (!post) return (<></>)

    const postDelete = async () => {
        await request(`/api/post/${data}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
        })
        window.location.reload(false)
    }

    return (
        <div>
            <p>{post.text}</p>
            <div style={{display: "inline-block", marginRight: 10}}>
                <Link to={`/detail/${data}`}>More...</Link>
            </div>
            <div style={{display: "inline-block"}}>
                <button
                    style={{backgroundColor: "red", border: 0, color: "white"}}
                    disabled={loading}
                    onClick={postDelete}
                >Delete</button>
            </div>
        </div>
    )
}