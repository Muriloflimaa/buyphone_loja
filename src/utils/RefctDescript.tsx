export const refact = (props: string) => {
    return props.split('\n').map((it, i) => <div key={`x${i}`}>- {it}</div>)
}
