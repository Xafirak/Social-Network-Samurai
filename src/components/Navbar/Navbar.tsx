import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';



type navbarPropsType = {

}

type navbarMenuPropsType = {
    link: string
    name: string
}


// сломался transition в css файле, хз почему и как починить, виню Mui

const Navbar: React.FC<navbarPropsType> = (props) => {
    const friends = useSelector((state: AppStateType) => state.sidebar.friends)
    const friend = friends.map((e) => {
        return (
            <NavLink to="#" className={classes.friend} key={e.id}>
                <img src={e.avatar} alt={e.name} />
                <figcaption className={classes.caption}>{e.name}</figcaption>
            </NavLink>
        );
    });





    const CustomTab: React.FC<navbarMenuPropsType> = ({ link, name }) => {
        // const ActiveButton = (n: any): string => {
        //     return n.isActive ? classes.active : classes.item
        // }
        return (
            <div className={classes.item}>
                <List >
                    <ListItem key={name}  >
                        <NavLink
                            to={link}
                            className={(n) =>
                                n.isActive ? classes.active : classes.item}
                        >
                            <ListItemText primary={name} />
                        </NavLink>
                    </ListItem>
                </List>
            </div>
        );
    };

    return (
        <div className={classes.nav}>

            <CustomTab link={'/profile'} name={'Profile'} />
            <CustomTab link={'/dialogs'} name={'Messages'} />
            <CustomTab link={'/chat'} name={'Chat'} />
            <CustomTab link={'/news'} name={'News'} />
            <CustomTab link={'/users'} name={'Users'} />
            <CustomTab link={'/music'} name={'Muzic'} />
            <CustomTab link={'/settings'} name={'Settings'} />

            <div className={classes.friendsArea}>
                <h1>Friends</h1>
                <div>
                    {/* обьединение кружочка авы\имени пользователя в один компонент 
                      тут и в диалогах??
                     имя компоненты --- <Friend /> */}
                    {friend}
                </div>
            </div>
        </div>

    );
};


export default Navbar;
