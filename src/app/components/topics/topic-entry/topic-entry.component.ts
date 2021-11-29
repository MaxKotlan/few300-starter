import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { topicCreated } from 'src/app/actions/topics.actions';
import { selectTopicExists } from 'src/app/reducers';
import { alreadyExistsValidator } from 'src/app/validators/already-exists.validator';
type ControlWithErrors = (AbstractControl & { errors?: any }) | null;
@Component({
  selector: 'app-topic-entry',
  templateUrl: './topic-entry.component.html',
  styleUrls: ['./topic-entry.component.scss'],
})
export class TopicEntryComponent {
  form = this.formBuilder.group({
    description: [
      '',
      [Validators.required, Validators.maxLength(20)],
      [alreadyExistsValidator(this.store, selectTopicExists)],
    ],
  });

  constructor(private formBuilder: FormBuilder, private store: Store, cd: ChangeDetectorRef) {
    this.description?.statusChanges.subscribe(() => cd.markForCheck());
  }

  get description() {
    return this.form.get('description');
  }

  submit(el: HTMLElement) {
    if (this.form.valid) {
      const description = this.description?.value;
      this.store.dispatch(topicCreated({ description }));
      this.form.reset();
      el.focus();
    }
  }
}
