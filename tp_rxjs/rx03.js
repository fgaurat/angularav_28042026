import {interval,map,tap,take, share, merge} from 'rxjs';


let source1$ = interval(500).pipe(map(value => `Source 1: ${value}`)) 
let source2$ = interval(1000).pipe(map(value => `Source 2: ${value}`)) 

let source3$ = merge(source1$, source2$) // merge() permet de fusionner plusieurs Observables en un seul Observable qui émet les valeurs de tous les Observables fusionnés.

source3$ = source3$.pipe(take(10))

source3$.subscribe({
    next: value => console.log('Subscribe:', value),
    error: err => console.error('Error:', err),
    complete: () => console.log('Completed')
});