export function parseArticleContent(content) {
    const newContent = content.map((par,index) => {
        if (index === 0) {
            return par.content
        }
        if (par.margin === 2) {
            return `\n\n${par.content}`
        } else {
            return `\n${par.content}`
        }
    })
    return newContent.join("")
}