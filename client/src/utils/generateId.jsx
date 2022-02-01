
export function generateId(length) {
    let abc = "abcdefghijklmnopqrstuvwxyz123456789";
    let rs = "";
    while (rs.length < length) {
        rs += abc[Math.floor(Math.random() * abc.length)];
    }
    return rs
}