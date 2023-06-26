import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/interface/transaction.interface';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AtmTransactionsService {
  private _transaction: Transaction[] = [];
  private _behaviorSubject: BehaviorSubject<Transaction[]> =
    new BehaviorSubject<Transaction[]>([]);

  constructor() {}

  public getTransactionHistory(): Observable<Transaction[]> {
    return this._behaviorSubject.asObservable();
  }

  public logTransactionHistory(transactionHistory: Transaction): boolean {
    this._transaction.push(transactionHistory);
    this._behaviorSubject.next(this._transaction);
    return true;
  }
}
