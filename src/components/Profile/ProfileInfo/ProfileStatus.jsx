import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        title: "Sup",
    };

    toggleActivateEditMode() {
        //альтернативный вариант, меньше кода, но понять труднее,
        //как бы понятность должна быть на 1 месте
        //====================
        // this.setState({
        //     editMode: !this.state.editMode
        // })
        //====================
        this.state.editMode === true
            ? this.setState({
                  editMode: false,
              })
            : this.setState({
                  editMode: true,
              });
    }

    render() {
        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span
                            onDoubleClick={this.toggleActivateEditMode.bind(
                                this
                            )}
                        >
                            {this.props.status}
                        </span>
                    </div>
                ) : (
                    <div>
                        <input
                            autoFocus={true}
                            onBlur={this.toggleActivateEditMode.bind(this)}
                            type="text"
                            value={this.props.status}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default ProfileStatus;
