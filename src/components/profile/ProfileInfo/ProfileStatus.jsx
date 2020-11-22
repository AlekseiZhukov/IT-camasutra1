import React from 'react';
import s from './ProfileInfo.module.css'




class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMOde = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMOde = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (event) => {
        const newStatus = event.target.value
        this.setState({
            status: newStatus
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }

        console.log("componentDidUpdate")
    }


    render() {
        console.log("render")
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMOde}>{this.props.status || 'no status'}</span>
                </div>
                }

                {this.state.editMode &&
                <div>
                    <input  autoFocus={true}
                            onBlur={this.deActivateEditMOde}
                            value={this.state.status}
                            onChange={this.onStatusChange}/>
                </div>
                }
            </div>
        )
    }

}

export default ProfileStatus