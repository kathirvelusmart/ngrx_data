import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/model.posts';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  post: Post | undefined;
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === id);
    });
  }

}
