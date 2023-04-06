import { Component } from '@angular/core';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent {
  selectedJournal: Journal;

  constructor(private journalService: JournalService) {}

  ngOnInit() {
    this.journalService.journalSelectedEvent.subscribe(
      (journal: Journal) => {
        this.selectedJournal = journal;
      }
    )
  }
}
