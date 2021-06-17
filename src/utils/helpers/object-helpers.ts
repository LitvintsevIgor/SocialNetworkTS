import {UserType} from "../../redux/users-reducer";

export const updateObjectInArray = (items: UserType[], itemId: number, itemPropName: string, newObjProps: { followed: true | false } ) => {
    return items.map(u => {
        // @ts-ignore
        if (u[itemPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}