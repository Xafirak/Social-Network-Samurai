
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../HOC/AuthRedirect";
import Dialogs from "./Dialogs";
import addDialogCreator from "./../../redux/dialogsReducer"
import { AppStateType } from "../../redux/reduxStore";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
    };
};

type mapStateToPropsType = {
    dialogPage: Array<string>
}


export default compose<mapStateToPropsType>(
    connect(mapStateToProps, { addDialogCreator }),
    WithAuthRedirect
)(Dialogs);
