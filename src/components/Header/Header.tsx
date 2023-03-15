import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppStateType, DispatchType } from "../../redux/reduxStore";
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from "../../redux/auth-reducer";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";






export const Header: React.FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const profilePhoto = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small)
    const userId = useSelector((state: AppStateType) => state.profilePage.profile?.userId)
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)

    const dispatch: DispatchType = useDispatch()

    const [photo, setPhoto] = useState('')
    
    useEffect(() => {
        if (authorizedUserId === userId) setPhoto(profilePhoto!)

    })

    const logout = () => {
        dispatch(Logout())
    }

    const navigate = useNavigate()
    const loginButton = () => navigate('/login')



    return (
        <AppBar position="static" className={classes.header} sx={{
            textAlign: "center",
            width: 1250

        }} >

            <Toolbar sx={{ textAlign: "start" }} >
                <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sxdELx88HQjlvgfXWUENawHaHa%26pid%3DApi&f=1&ipt=af963e529a877c0c337cfc12d9319d0fc9a9a7e54792582b982c76fb6bb39368&ipo=images"
                    alt="Dp"
                />
                <Typography variant="h6" sx={{ width: 1, pl: 10 }} >
                    Samurai Social Network
                </Typography>
                <div >
                    {isAuth ? (
                        <div className={classes.userIconAndButton}>
                            <div className={classes.icon}>
                                <Avatar alt={login as string} src={photo} />
                            </div>
                            <div >
                                <Typography>
                                    {login!.slice(0, 1).toUpperCase() + login!.slice(1)}
                                </Typography>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'orange',
                                        '&:hover': {
                                            background: 'orangered'
                                        }
                                    }}
                                    onClick={logout}>Logout</Button>
                            </div>

                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={loginButton}
                            sx={{
                                backgroundColor: 'orange',
                                '&:hover': {
                                    background: 'orangered'
                                }
                            }}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar >
        // <header className={classes.header}>
        //     <img
        //         src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sxdELx88HQjlvgfXWUENawHaHa%26pid%3DApi&f=1&ipt=af963e529a877c0c337cfc12d9319d0fc9a9a7e54792582b982c76fb6bb39368&ipo=images"
        //         alt="Dp"
        //     />

        //     <div className={classes.loginBlock}>
        //         {isAuth ? (
        //             <div>
        //                 {login} <br />
        //                 <button onClick={logout}>Logout</button>
        //             </div>
        //         ) : (
        //             <NavLink to={"login"}>Login</NavLink>
        //         )}
        //     </div>
        // </header>
    );
};

