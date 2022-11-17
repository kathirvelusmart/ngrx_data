import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsResolver } from '../post.resolver';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { PostDataService } from '../post-data.service';
import { Post } from '../models/model.posts';

const routes: Routes = [
  {
    path: '', component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: 'add',
    component: AddPostComponent,
    resolve: { posts: PostsResolver }
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: { posts: PostsResolver }
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
    resolve: { posts: PostsResolver }
  }

]

const entityMetadata: EntityMetadataMap = {
  Post: {
    sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    }
  },
}

function sortByName(a: Post, b: Post): number {
  let comp = a.title.localeCompare(b.title);
  if (comp > 0) return -1;
  if (comp < 0) return 1;
  return comp;
}

@NgModule({
  declarations: [
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent,
    PostsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PostsResolver, PostDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    PostsDataService: PostDataService
  ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerService('Post', PostsDataService);
  }
}
