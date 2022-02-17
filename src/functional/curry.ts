export function curry<A extends Function>(fn: A) {
    let arity = fn.length

    return function f1<T>(...args: T[]) {
        console.log('f1 args', args)
        if (args.length >= arity) {
            console.log('enough arguments')
            console.log(arity)
            return fn(...args)
        } else {
            console.log('need more arguments')
            return function f2<C extends T>(...moreArgs: C[]) {
                console.log('f2', moreArgs)
                const newArgs = args.concat(moreArgs)
                console.log(newArgs)
                return f1(...newArgs)
            }
        }
    }
}