import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import {CreatePostPage} from "./pages/CreatePostPage";
import {DetailPostPage} from "./pages/DetailPostPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {LoginPage} from "./pages/LoginPage";
import {NewsPage} from "./pages/NewsPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/news" exact>
                    <NewsPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePostPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPostPage />
                </Route>
                <Redirect to="/news" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact>
                <RegistrationPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}