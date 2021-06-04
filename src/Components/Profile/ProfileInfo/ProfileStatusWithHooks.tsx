import React, {ChangeEvent, useState} from "react";


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {
    debugger

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState("");

    const activateEditMode = () => {
        setEditMode(true)
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }


    return (
        <div>
            { !editMode ?
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
                </div>
                :
                <div>
                    <input
                        onChange={onChangeStatus}
                        autoFocus={true}
                        onBlur={deActivateEditMode}
                        value={status}
                    />
                </div>
            }
        </div>
    )
}
