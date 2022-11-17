import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/model.posts';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  addPostForm!: FormGroup;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
  }
  onAddPost(): void {
    console.log(this.addPostForm.value)
    const post: Post = this.addPostForm.value
    this.postService.add(post).subscribe((data) => {
      this.router.navigate(['/posts'])
    })
  }
}