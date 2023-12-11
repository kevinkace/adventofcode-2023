export const eol = '\r\n';

export function getEol(str) {
    return str.includes("\r\n") ? "\r\n" : "\n";
}
