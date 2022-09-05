export const refact = (props) => {
    return props.split('\n').map((it, i) => <div key={'x' + i}>{it}</div>)
}
export const refactPointer = (props) => {
    return props.split('.').map((it, i) => <div key={'x' + i}>{it}</div>)
}