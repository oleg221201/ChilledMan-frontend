import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import {CreatePostPage} from "./pages/CreatePostPage";
import {DetailPostPage} from "./pages/DetailPostPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/create" exact>
                    <CreatePostPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPostPage />
                </Route>
                <Redirect to="/profile" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}