import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllTopics } from 'src/app/reducers';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent {
  topics$ = this.store.select(selectAllTopics);
  constructor(private store: Store) {}
}
