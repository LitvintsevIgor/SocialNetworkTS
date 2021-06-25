import style from "./Paginator.module.css";
import React, {useState} from "react";

export type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    getNewUserPage: (p: number) => void
    portionSize: number
}

export const Paginator:React.FC<PaginatorPropsType> = ({totalItemsCount, pageSize,getNewUserPage, currentPage, portionSize}) => {
    debugger
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const selectedPageStyle = `${style.selectedPage} + ${style.page}`

    return (
            <div>
                { portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1) }} >PREV</button>
                }


                {pages
                    .filter( (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
                    .map(p => <span key={p} onClick={() => getNewUserPage(p)}
                                      className={currentPage === p ? selectedPageStyle : style.page}>{p}</span>)}


                { portionNumber !== portionCount &&
                <button onClick={() => {setPortionNumber(portionNumber + 1) }} >NEXT</button>
                }
            </div>
    )
}