import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {setAuthUserDataAC} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/redux-store";

export type HeaderContainerPropsType = {
    id: number
    email: string
    login: string
    setAuthUserDataAC: (id: number, email: string, login: string) => void
    isAuthorized: boolean
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/auth/me", {
            withCredentials: true
        })
            .then(response => {

                if (response.data.resultCode === 0) {

                    // let {id, email, login} = response.data.data
                    // this.props.setAuthUserDataAC(id, email, login)
                    // let {id, email, login} = response.data.data
                    this.props.setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login)
                }
            })
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

export default connect(mapStateToProps, {setAuthUserDataAC})(HeaderContainer);