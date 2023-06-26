import { Component } from '@angular/core';
import { AtmTransactionsService } from '../../services/atm-transactions/atm-transactions.service';
import * as moment from 'moment';
import * as cloneDeep from 'lodash/cloneDeep';
import { Subscription } from 'rxjs';

const initColumns = [
  { name: 'type', display: 'Transaction', currency: '' },
  { name: 'date', display: 'Date', currency: '' },
  { name: 'message', display: 'Message', currency: '' },
];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  dataSource = [];
  initColumns = initColumns;
  transactionHistorySubscription: Subscription;

  constructor(public atmTransactions: AtmTransactionsService) {}
  ngOnInit() {
    this.transactionHistorySubscription = this.atmTransactions
      .getTransactionHistory()
      .subscribe((transactions) => {
        this.transactionDataFormat(transactions);
      });
  }

  transactionDataFormat(transactions) {
    const transactionsData = cloneDeep(transactions);
    transactionsData.map((data) => {
      data.date = moment(data.date).format('YYYY-MM-DD HH.mm.ss');
    });
    this.dataSource = transactionsData;
  }

  ngOnDestroy(): void {
    this.transactionHistorySubscription.unsubscribe();
  }
}
