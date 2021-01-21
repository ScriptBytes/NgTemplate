import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/core/services/post.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {
  posts$ = this.postService.items$;

  displayedColumns: string[] = ['id', 'title', 'body'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.load();

    this.postService.getError$.subscribe(console.log)

    setTimeout(() => {
      this.postService.get('55');
    }, 3000);
  }
}
