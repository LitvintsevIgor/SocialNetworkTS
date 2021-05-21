import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/redux-store";
import {getAuthUserData, logout} from "../../redux/auth-reducer";

export type HeaderContainerPropsType = {
    id: number
    email: string
    login: string
    isAuth: boolean
    getAuthUserData: () => void
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {

        this.props.getAuthUserData(); // thunkCreator
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
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {getAuthUserData, logout })(HeaderContainer);