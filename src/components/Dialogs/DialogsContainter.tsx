
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../HOC/AuthRedirect";
import Dialogs from "./Dialogs";
import { dialogActions, iniialStateType } from "./../../redux/dialogsReducer"
import { AppStateType } from "../../redux/reduxStore";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
    };
};



export default compose<React.ComponentType>(
    connect(mapStateToProps, { ...dialogActions }),
    WithAuthRedirect
)(Dialogs);
