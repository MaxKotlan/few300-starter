import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TopicModel } from '../models';
import { ExistenceCheckSelector } from '../validators/already-exists.validator';
import * as fromTempTopics from './temp-topics.reducer';
import * as fromTopics from './topics.reducer';

export interface AppState {
  topics: fromTopics.TopicState;
  tempTopics: fromTempTopics.TempTopicState;
}

export const reducers: ActionReducerMap<AppState> = {
  topics: fromTopics.reducer,
  tempTopics: fromTempTopics.reducer,
};

// Feature selector (since we are in the app feature - the root)
// we are, for purposes of selectors, going to consider each 'branch' of the state a 'feature'
const selectTopicsState = createFeatureSelector<fromTopics.TopicState>('topics');
const selectTempTopicsState = createFeatureSelector<fromTempTopics.TempTopicState>('tempTopics');

const selectAllTopics = createSelector(selectTopicsState, fromTopics.selectAllTopics);

const selectAllTempTopics = createSelector(selectTempTopicsState, fromTempTopics.selectAllTempTopics);

export const selectAllMergedTopics = createSelector(selectAllTopics, selectAllTempTopics, (topics, tempTopics) => {
  const newTopics = topics.map((t) => {
    return {
      entity: t,
      meta: {
        isTemporary: false,
      },
    } as TopicModel;
  });
  const newTempTopics = tempTopics.map((t) => {
    return {
      entity: t,
      meta: {
        isTemporary: true,
      },
    } as TopicModel;
  });
  return [...newTopics, ...newTempTopics];
});
export const selectTopicExists: ExistenceCheckSelector = (props: { value: string }) =>
  createSelector(selectAllTopics, (topics) =>
    topics.some((t) => t.description.toLocaleLowerCase().trim() === props.value.toLocaleLowerCase().trim()),
  );
