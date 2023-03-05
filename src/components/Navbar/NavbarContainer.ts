import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { friendsType } from "../../redux/sidebarReducer";

// я КАК БЫ знаю что находится в friends, надо ли все типы для мелких 
// пропсов экспортировать или писать что-то общее, 
// что TS схавает и заткнется?


type mapStateToPropsPropsType = {
    friends: Array<friendsType>
}
let mapStateToProps = (state:AppStateType):mapStateToPropsPropsType => {
    return {
        friends: state.sidebar.friends,
    };
};

const NavbarContainer = connect(mapStateToProps)(Navbar);
export default NavbarContainer;
