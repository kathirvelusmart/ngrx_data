import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { first, map, mergeMap, Observable, of, tap } from 'rxjs';
import { PostService } from './post.service';

@Injectable()
export class PostsResolver implements Resolve<boolean> {
    constructor(private postService: PostService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return this.postService.loaded$.pipe(
            // Approach 1
            /*  mergeMap(loaded => {
                 if (loaded) {
                     return of(true)
                 }
                 return this.postService.getAll().pipe(
                     map((posts) => {
                         return !!posts;
                     })
                 )
             }),
             first() */
            // Approach 2
            tap((loaded) => {
                if (!loaded) {
                    this.postService.getAll();
                }
            }), first()
        );
    }
}
