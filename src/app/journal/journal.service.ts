import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Journal } from './journal.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class JournalService implements OnInit {
  journals: Journal[] = [];
  journalListChangedEvent = new Subject<Journal[]>();
  journalChangedEvent = new EventEmitter<Journal[]>();
  journalSelectedEvent = new EventEmitter<Journal[]>();
  maxJournalId: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getJournals() {
    this.http.get<{message: string, journals: Journal[]}>('http://localhost:3000/journals').subscribe(
      (journals) => {
        console.log(journals);
        this.journals = journals.journals;
        this.maxJournalId = this.getMaxId();
        this.journalListChangedEvent.next(this.journals.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getJournal(index: string) {
    return this.journals[index];
  }

  addJournal(journal: Journal) {
    if(!journal) {
      return;
    }

    journal.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{message: string; journals: Journal}>(
      'http://localhost:3000/journals',
      journal,
      {headers: headers}
    ).subscribe((responseData) => {
      this.journals.push(responseData.journals);
    });
  }

  updateJournal(originalJournal: Journal, newJournal: Journal) {
    if(!originalJournal || !newJournal) {
      return;
    }

    const pos = this.journals.findIndex((j) => j.id === originalJournal.id);

    if(pos < 0) {
      return;
    }

    newJournal.id = originalJournal.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/journals/' + originalJournal.id, newJournal, {headers: headers})
    .subscribe((response: Response) => {
      this.journals[pos] = newJournal;
    });
  }

  deleteJournal(journal: Journal) {
    if(!journal) {
      return;
    }

    const pos = this.journals.findIndex((j) => j.id === journal.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/journals/' + journal.id)
    .subscribe((response: Response) => {
      this.journals.splice(pos, 1);
    });
  }

  getMaxId() {
    let maxId = 0;
    if(this.journals) {
      for(const journal of this.journals) {
        const currentId = Number(journal.id);
        if(currentId > maxId) {
          maxId = currentId;
        }
      }
    }
    return maxId;
  }
}