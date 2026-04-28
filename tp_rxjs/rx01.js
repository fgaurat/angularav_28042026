import {interval,map,tap,take} from 'rxjs';

//interval(500).subscribe(console.log);
// interval(500).pipe(
  
//     tap(value => console.log('Tap:', value)),
//     map(value => value * 10)

// ).subscribe(value => console.log('Subscribe:', value));

// Convention de nommage: $ à la fin du nom d'une variable pour indiquer qu'il s'agit d'un Observable
let source$ = interval(500) 

source$ = source$.pipe(take(10))

// source$.pipe(
//     tap(value => console.log('Tap:', value)),
//     map(value => value * 10)
// ).subscribe(value => console.log('Subscribe:', value));

source$.subscribe(value => console.log('Subscribe 1:', value));
source$.subscribe(value => console.log('Subscribe 2:', value));

setTimeout(() => {
    source$.subscribe(value => console.log('Subscribe 3:', value));
},1000)