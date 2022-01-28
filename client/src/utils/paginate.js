import _ from "lodash"

export default function paginate(content, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize

    return _(content).slice(startIndex).take(pageSize).value()
}