import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/model.posts';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]> | any
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
  }
  onDeletePost(event: Event, id: string) {
    if (confirm('Are you sure you want to delete this post')) {
      this.postService.delete(id)
    }
  }
}
