import { FeedData, FeedQuery } from "../../../../types/API"
import { Get } from "../../get"
import { DisplayPost } from "../displayPost"
import Styled from "./styled"
import { useState } from "react"

export interface FeedProps {
    userId?:number
}

export function Feed(props:FeedProps) {
    const [ skip, setSkip ] = useState<number>(0)
    const limit = 25

    function handlerNext() {
        setSkip((skip) => { return skip + 1 })
    }

    function handlerPreviw() {
        setSkip((skip) => { if (skip <= 0) { return skip } return skip - 1 })
    }

    return (
        <Styled.Feed>
            <Get type="getFeed" query={{ skip:skip * limit, limit:limit, userId:props.userId, findUser:true, parentPostLimit:1  } as FeedQuery}>
                {(data:FeedData) => (
                    <>
                        {data.posts.map((post) => ( <DisplayPost {...post} />))}
                        <Styled.Controls>
                            {skip !== 0?<button onClick={handlerPreviw}>Anterior</button>:<></>}
                            {data.all > ((skip * limit) + limit)?<button onClick={handlerNext}>Proximo</button>:<></>}
                        </Styled.Controls>
                    </>
                )}
            </Get>
        </Styled.Feed>
    )
}