import React from 'react'
import {Link} from "react-router-dom";


export const Post = ({data}) => {

    return (
        <div key={data._id}>
            <p>{data.text}</p>
            <Link to={`/detail/${data._id}`}>Read more</Link>
        </div>
    )
}