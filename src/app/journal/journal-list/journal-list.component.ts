import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Journal } from '../journal.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.css'],
})
export class JournalListComponent implements OnInit, OnDestroy {
  journals: Journal[] = [];
  private subscription: Subscription;

  constructor(private journalService: JournalService) {}

  ngOnInit() {
    this.subscription = this.journalService.journalListChangedEvent.subscribe(
      (journals: Journal[]) => {
        this.journals = journals;
      }
    );
    this.journalService.getJournals();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
