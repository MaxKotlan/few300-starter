import { createServer, Model, Response } from 'miragejs';
import { environment } from 'src/environments/environment';
import { TopicEntity } from '../reducers/topics.reducer';

const topicFixture: TopicEntity[] = [
  { id: '1', description: 'Angular' },
  { id: '2', description: 'TypeScript' },
  { id: '3', description: 'Git' },
  { id: '4', description: 'CSS Selectors' },
];
export function mockServer() {
  return createServer({
    fixtures: {
      topics: topicFixture,
    },
    models: {
      topics: Model.extend<Partial<TopicEntity>>({}),
    },
    routes() {
      this.urlPrefix = environment.urls.hypertheoryLearning;
      this.namespace = 'learning';
      this.get(
        'topics',
        (schema, request) => {
          return { data: schema.all('topics').models };
        },
        { timing: 3000 },
      );

      this.post(
        'topics',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          if (attrs.description === 'tacos') {
            return new Response(400, {}, { errors: ['We do not study tacos here.'] });
          } else {
            return schema.create('topics', attrs).attrs;
          }
        },
        { timing: 2000 },
      );
    },
  });
}
