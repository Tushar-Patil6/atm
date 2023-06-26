import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../../interface/currency.interface';
import { AtmStockService } from '../../services/atm-stock/atm-stock.service';
import { AtmTransactionsService } from '../../services/atm-transactions/atm-transactions.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss'],
})
export class RestockComponent {
  restockForm: FormGroup;
  public showSuccess: boolean = false;
  atmStockData: Currency[] = [];
  subscription: any;

  constructor(
    public atmStockService: AtmStockService,
    public atmTransactionsService: AtmTransactionsService
  ) {
    this.restockForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.subscription = this.atmStockService
      .getCurrentStock()
      .subscribe((stockItems) => {
        this.atmStockData = stockItems;
      });
    this.atmStockData.forEach((stockItem) => {
      this.restockForm.addControl(
        stockItem.value,
        new FormControl(0, Validators.min(0))
      );
    });
  }

  restockReset() {
    this.atmStockData.forEach((stockItem) => {
      this.restockForm.controls[stockItem.value].setValue(0);
    });
  }

  restockSubmit(): void {
    let message = 'Restock- ';
    Object.keys(this.restockForm.value).forEach((stockCurrency) => {
      this.atmStockService.updateStock(
        stockCurrency,
        this.restockForm.value[stockCurrency]
      );
      message +=
        ' ' + stockCurrency + ':' + this.restockForm.value[stockCurrency];
    });
    this.atmTransactionsService.logTransactionHistory({
      type: 'restock',
      message: message,
      date: new Date(),
    });
    this.showSuccess = true;
    this.restockReset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
