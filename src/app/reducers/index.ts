import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ExistenceCheckSelector } from '../validators/already-exists.validator';
import * as fromTopics from './topics.reducer';

export interface AppState {
  topics: fromTopics.TopicState;
}

export const reducers: ActionReducerMap<AppState> = {
  topics: fromTopics.reducer,
};

const selectTopicsState = createFeatureSelector<fromTopics.TopicState>('topics');

export const selectAllTopics = createSelector(selectTopicsState, fromTopics.selectAllTopics);

export const selectTopicExists: ExistenceCheckSelector = (props: { value: string }) =>
  createSelector(selectAllTopics, (topics) =>
    topics.some((t) => t.description.toLocaleLowerCase().trim() === props.value.toLocaleLowerCase().trim()),
  );
