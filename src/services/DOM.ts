export function removeDocumentListener() {
    function someFn() {
    }
    window.removeEventListener('keydown', someFn)
    window.removeEventListener('keyup', someFn)
}

