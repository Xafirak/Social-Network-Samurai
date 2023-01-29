// @ts-nocheck
import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";

// const NavbarContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => (
//                 <>
//                     <Navbar friends={store.getState().sidebar.friends} />
//                 </>
//             )}
//         </StoreContext.Consumer>
//     );
// };

let mapStateToProps = (state) => {
    return {
        friends: state.sidebar.friends,
    };
};

const NavbarContainer = connect(mapStateToProps)(Navbar);
export default NavbarContainer;
