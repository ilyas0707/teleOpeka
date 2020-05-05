import React from "react"
import Styles from "./App.module.css"
import { Switch, Route, Redirect } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Dashboard from "./components/Dashboard/Dashboard"
import Topline from "./components/Topline/Topline"
import About from "./pages/main/About/About"
import Whyus from "./pages/main/Whyus/Whyus"
import Auth from "./pages/main/Auth/Auth"
import Plan from "./pages/subpages/Plan/Plan"
import Notes from "./pages/subpages/Notes/Notes"
import Stats from "./pages/subpages/Stats/Stats"
import Info from "./pages/subpages/Info/Info"
import Chat from "./pages/subpages/Chat/Chat"
import Account from "./pages/subpages/Account/Account"

export const useRoutes = (isAuthentificated, userId) => {
    if (isAuthentificated) {
        return(
            <div className={Styles.main}>
                <div className={Styles.nav}>
                    <Dashboard />
                </div>
                <div className={Styles.interface}>
                    <Topline id={userId} />
                    <div className={Styles.scene}>
                        <Switch>
                            <Route path="/panel/plan" exact>
                                <Plan id={userId} />
                            </Route>
                            <Route path="/panel/notes" exact>
                                <Notes id={userId} />
                            </Route>
                            <Route path="/panel/stats" exact>
                                <Stats id={userId} />
                            </Route>
                            <Route path="/panel/info" exact>
                                <Info id={userId} />
                            </Route>
                            <Route path="/panel/chat" exact>
                                <Chat id={userId} />
                            </Route>
                            <Route path="/panel/account" exact>
                                <Account id={userId} />
                            </Route>
                            <Redirect to="/panel/plan" />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Navbar />
            <div className={Styles.block}>
                <div className={Styles.overlay}></div>
                <Switch>
                    <Route path="/" exact>
                        <About />
                    </Route>
                    <Route path="/whyus" exact>
                        <Whyus />
                    </Route>
                    <Route path="/auth" exact>
                        <Auth />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    )
}