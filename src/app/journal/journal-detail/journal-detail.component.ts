import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Journal } from '../journal.model';
import { JournalService } from '../journal.service';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.css'],
})
export class JournalDetailComponent implements OnInit {
  journal: Journal;
  journals: Journal[] = [new Journal('', '', '')];
  id: string;
  nativeWindow: any;

  constructor(
    private journalService: JournalService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.journal = this.journalService.getJournal(this.id);
        }
      );
  }

  onView() {
    if(this.journal.id) {
      this.nativeWindow.open(this.journal.id);
    }
  }

  onDelete() {
    this.journalService.deleteJournal(this.journal);
    this.router.navigateByUrl('/journals');
  }
}
