// @ts-nocheck
import React from "react";

class ProfileStatus extends React.Component {
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
        }
        else if (this.state.editMode === false) {
            this.setState({
                editMode: true,
            });
        }
    };
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    render() {
        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span onDoubleClick={this.toggleActivateEditMode}>
                            {this.props.status}
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
