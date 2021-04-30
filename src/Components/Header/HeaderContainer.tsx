import React from "react";
import {Header} from "./Header";
import {auth} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/redux-store";

export type HeaderContainerPropsType = {
    id: number
    email: string
    login: string
    // setAuthUserDataAC: (id: number, email: string, login: string) => void
    isAuthorized: boolean
    auth: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {

        this.props.auth(); // thunkCreator


        // authAPI.auth().then(data => {
        //     if (data.resultCode === 0) {
        //         let {id, email, login} = data.data
        //         this.props.setAuthUserDataAC(id, email, login)
        //     }
        // })

    }

    render() {
        return <Header {...this.props}/>
    }
}


const mapStateToProps = (state: AllAppStateType) => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isAuthorized: state.auth.isAuthorized
    }
}

export default connect(mapStateToProps, {auth})(HeaderContainer);