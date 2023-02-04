// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../HOC/AuthRedirect";
import Dialogs from "./Dialogs";
import { addDialogCreator } from "./../../redux/dialogsReducer";

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage,
    };
};

export default compose(
    connect(mapStateToProps, { addDialogCreator }),
    WithAuthRedirect
)(Dialogs);
