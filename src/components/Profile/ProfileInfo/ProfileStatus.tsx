
import React, { ChangeEvent } from "react";


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

type stateType = {
    editMode: boolean
    status: string
}
// НЕ ИСПОЛЬЗУЕТСЯ, юзается profileStatusWithHooks


class ProfileStatus extends React.Component<PropsType, stateType> {
    state = {
        editMode: false,
        status: this.props.status,
    };

    toggleActivateEditMode = () => {
        //альтернативный вариант, меньше кода, но понять труднее,
        //как бы понятность должна быть на 1 месте
        //====================
        // this.setState({
        //     editMode: !this.state.editMode
        // })
        //====================
        if (this.state.editMode === true) {
            this.setState({
                editMode: false,
            });
            this.props.updateStatus(this.state.status);
        } else if (this.state.editMode === false) {
            this.setState({
                editMode: true,
            });
        }
    };
    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    componentDidUpdate(prevProps:PropsType, prevState:stateType) {
        if (prevProps.status !== this.props.status)
            this.setState({
                status: this.props.status,
            });
    } 

    render() {
        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span onDoubleClick={this.toggleActivateEditMode}>
                            {this.props.status || "_____"}
                        </span>
                    </div>
                ) : (
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            autoFocus={true}
                            onBlur={this.toggleActivateEditMode}
                            type="text"
                            value={this.state.status}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default ProfileStatus;

// НЕ ИСПОЛЬЗУЕТСЯ, юзается profileStatusWithHooks
