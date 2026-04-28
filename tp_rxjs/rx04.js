import {interval,map,tap,take, share, merge, switchMap} from 'rxjs';


interval(1000).pipe(
    tap(value => console.log('Source:', value)), // Affiche les valeurs émises par l'intervalle toutes les secondes
    switchMap(()=> interval(200))
).subscribe(value => console.log('\tInterval:', value)) // Affiche les valeurs émises par l'intervalle toutes les secondes

