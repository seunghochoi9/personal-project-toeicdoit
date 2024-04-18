import { ReactNode } from "react"

export interface IArticle{
    id?: number,
    boardId?: number,
    title?: string,
    content?: string,
    registerDate?: string,
    writer?: ReactNode,
    regDate?: string,
    modDate?: string,
    array?: IArticle[],
    json?: IArticle
    message?: string

}