
export interface IArticle{
    id?: number,
    boardId?: number,
    title?: string,
    content?: string,
    registerDate?: string,
    userId?: number,
    writerUsername?: string,
    regDate?: string,
    modDate?: string,
    array?: IArticle[],
    json?: IArticle
    message?: string
}