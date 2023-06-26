import { Component } from '@angular/core';
import { UserLoginService } from '@app/services/user-login/user-login.service';
import { Subscription } from 'rxjs';
import { AtmStockService } from '@app/services/atm-stock/atm-stock.service';

const initColumns = [
  { name: 'display', display: 'Currency', currency: '$' },
  { name: 'amount', display: 'Atm Currency', currency: '' },
  { name: 'value', display: 'Atm Amount', currency: '$' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dataSource = [];
  initColumns = initColumns;
  currentStocksubscription: Subscription;
  avalibleAmount: number;

  constructor(
    public atmStockService: AtmStockService,
    public userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {
    this.currentStocksubscription = this.atmStockService
      .getCurrentStock()
      .subscribe((stock) => {
        this.dataSource = stock;
        this.totalAmount(stock);
      });
  }

  totalAmount(stock): void {
    this.avalibleAmount = 0;
    stock.forEach((val) => {
      this.avalibleAmount += val.display * val.amount;
    });
  }

  ngOnDestroy(): void {
    this.currentStocksubscription.unsubscribe();
  }
}
