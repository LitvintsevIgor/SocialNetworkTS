import React, {ComponentType, Suspense} from "react";
import {Preloader} from "../Components/common/Preloader/Preloader";

export function withSuspense <T>(Component: ComponentType<T>) {

    return (props: any) => {
        debugger
        return <Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </Suspense>
    }
}