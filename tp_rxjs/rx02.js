import {interval,map,tap,take, share} from 'rxjs';


let source$ = interval(500) 


source$ = source$.pipe(
    take(10),
    share() // share() permet de partager la même source entre plusieurs abonnés, évitant ainsi de créer une nouvelle source pour chaque abonné. Hot Observable
)

source$.subscribe(value => console.log('Subscribe 1:', value));
source$.subscribe(value => console.log('Subscribe 2:', value));

setTimeout(() => {
    source$.subscribe(value => console.log('Subscribe 3:', value));
},2000)