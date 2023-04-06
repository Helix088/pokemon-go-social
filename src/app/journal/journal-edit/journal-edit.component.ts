import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Journal } from '../journal.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-edit',
  templateUrl: './journal-edit.component.html',
  styleUrls: ['./journal-edit.component.css'],
})
export class JournalEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  originalJournal: Journal;
  journal: Journal;
  editMode: boolean = false;
  id: string;

  constructor(private journalService: JournalService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.id = params['id'];
          if(params['id'] == null) {
            this.editMode = false;
            return;
          }
          this.originalJournal = this.journalService.getJournal(this.id);

          if(this.originalJournal == null) {
            null;
          }
          this.editMode = true;
          this.journal = JSON.parse(JSON.stringify(this.originalJournal));
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newJournal = new Journal(
      value.id,
      value.date,
      value.text
    );
    if(this.editMode == true) {
      this.journalService.updateJournal(this.originalJournal, newJournal);
    } else {
      this.journalService.addJournal(newJournal);
    }
    this.router.navigate(['/journals']);
    console.log(newJournal);
  }

  onCancel() {
    this.router.navigate(['/journals']);
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
