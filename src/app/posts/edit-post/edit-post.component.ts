import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  updatePostForm!: FormGroup;
  id!: string;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updatePostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
    this.id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((posts) => {
      if (posts.length) {
        const post = posts.find((post) => post.id === this.id);
        this.updatePostForm.patchValue({
          title: post?.title,
          description: post?.description,
        });
      }
    });
  }

  onEditPost(): void {
    const postData = {
      ...this.updatePostForm.value,
      id: this.id,
    };
    this.postService.update(postData);
    this.router.navigate(['/posts']);
  }
}
