import React from "react";
import s from "./Dialogs.module.css"

export function Dialogs () {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + " " + s.active}>
                    Петя
                </div>
                <div className={s.dialog}>
                    Ваня
                </div>
                <div className={s.dialog}>
                    Маня
                </div>
                <div className={s.dialog}>
                    Миша
                </div>
                <div className={s.dialog}>
                    Кола
                </div>
            </div>
            <div className={s.messagesItems}>
                <div className={s.message}>
                    Привет, как дела?
                </div>
                <div className={s.message}>
                    Хехей!
                </div>
                <div className={s.message}>
                    Как твой прогресс?
                </div>
                <div className={s.message}>
                    Какую музыку случаешь?
                </div>
                <div className={s.message}>
                    Как твои животные?
                </div>
            </div>
        </div>
    )
}