import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AtmTransactionsService } from '../../services/atm-transactions/atm-transactions.service';
import { AtmStockService } from '../../services/atm-stock/atm-stock.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent {
  public withdrawalForm: FormGroup;
  showSuccessMessage: string = '';
  showErrorMessage: string = '';
  constructor(
    public atmStockService: AtmStockService,
    public atmTransactionsService: AtmTransactionsService
  ) {
    this.withdrawalForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {}

  withdrawalSubmit() {
    this.showSuccessMessage = '';
    this.showErrorMessage = '';
    const amount = this.withdrawalForm.value['amount'];
    let processStatus = this.atmStockService.withdrawal(amount);
    if (processStatus && processStatus.status === true) {
      this.showSuccessMessage = processStatus.message;
      this.atmTransactionsService.logTransactionHistory({
        type: 'withdraw',
        message: 'Dispensed $' + amount,
        date: new Date(),
      });
      this.withdrawalReset();
    } else {
      this.showErrorMessage = processStatus.message;
    }
  }
  withdrawalReset() {
    this.withdrawalForm.controls['amount'].setValue('');
  }
}
