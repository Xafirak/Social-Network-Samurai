// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = (props) => {
    const friend = props.friends.map((e) => {
        return (
            <NavLink to="s" className={classes.friend} key={e.id}>
                <img src={e.avatar} alt={e.name} />
                <figcaption className={classes.caption}>{e.name}</figcaption>
            </NavLink>
        );
    });

    
    const NavbarMenu = ({ link, name }) => {
        return (
            <div className={classes.item}>
                <NavLink
                    to={link}
                    className={(n) =>
                        n.isActive ? classes.active : classes.item
                    }
                >
                    {name}
                </NavLink>
            </div>
        );
    };
    // ЗАРЕФАКТОРИТЬ дублирование, готово, надо ли выделять в отдельную
    // компоненту такое малое кол-во кода?
    return (
        <nav className={classes.nav}>
            <NavbarMenu link={'profile'} name={'Profile'} />
            <NavbarMenu link={'dialogs'} name={'Messages'} />
            <NavbarMenu link={'news'} name={'News'} />
            <NavbarMenu link={'users'} name={'Users'} />
            <NavbarMenu link={'music'} name={'Muzic'} />
            <NavbarMenu link={'settings'} name={'Settings'} />
            <div className={classes.friendsArea}>
                <h1>Friends</h1>
                <div>
                    {/* обьединение кружочка авы\имени пользователя в один компонент 
                     тут и в диалогах??
                    имя компоненты --- <Friend /> */}
                    {friend}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
