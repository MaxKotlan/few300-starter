import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as actions from '../actions/topics.actions';
import { TopicEntity } from '../reducers/topics.reducer';

@Injectable()
export class TopicsEffects {
  readonly baseUrl = environment.urls.hypertheoryLearning + 'learning';
  id = 1;
  // topicCreated => tempTopicCreated
  createTempTopic$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.topicCreated),
      map((a) => actions.tempTopicCreated({ payload: { description: a.description, id: 'T' + this.id++ } })),
    );
  });

  topicSaved$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.tempTopicCreated), // if it isn't one of these, I don't care.
      switchMap((originalAction) =>
        this.client
          .post<TopicEntity>(`${this.baseUrl}/topics`, { description: originalAction.payload.description })
          .pipe(map((r) => actions.topicSaved({ payload: r, meta: { oldId: originalAction.payload.id } }))),
      ),
    );
  });

  loadTopics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadTopics),
      switchMap(() =>
        this.client
          .get<{ data: TopicEntity[] }>(`${this.baseUrl}/topics`)
          .pipe(map(({ data: payload }) => actions.loadTopicsSucceeded({ payload }))),
      ),
    );
  });
  constructor(private actions$: Actions, private client: HttpClient) {}
}
