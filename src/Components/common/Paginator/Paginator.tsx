import style from "./Paginator.module.css";
import React from "react";

export type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    getNewUserPage: (p: number) => void
}

export const Paginator:React.FC<PaginatorPropsType> = ({totalUsersCount, pageSize,getNewUserPage, currentPage}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
            <div>
                {pages.map(p => <span onClick={() => getNewUserPage(p)}
                                      className={currentPage === p ? style.selectedPage : ""}>{p}</span>)}
            </div>
    )
}