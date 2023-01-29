// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../HOC/AuthRedirect";
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);


