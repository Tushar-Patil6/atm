import { Injectable } from '@angular/core';
import { Currency } from 'src/app/interface/currency.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyDenomination } from '../../enum/currency-denomination.enum';
@Injectable({
  providedIn: 'root',
})
export class AtmStockService {
  private _currentStock: Currency[] = [];
  private _behaviorSubject: BehaviorSubject<Currency[]> = new BehaviorSubject<
    Currency[]
  >([]);

  constructor() {
    this._currentStock = [
      {
        value: 'hundred',
        display: 100,
        amount: 10,
      },
      {
        value: 'fifty',
        display: 50,
        amount: 10,
      },
      {
        value: 'twenty',
        display: 20,
        amount: 10,
      },
      {
        value: 'ten',
        display: 10,
        amount: 10,
      },
      {
        value: 'five',
        display: 5,
        amount: 10,
      },
      {
        value: 'one',
        display: 1,
        amount: 10,
      },
    ];
    this._behaviorSubject.next(this._currentStock);
  }

  public getCurrentStock(): Observable<Currency[]> {
    return this._behaviorSubject.asObservable();
  }

  public updateStock(currencyDenomination: string, amount: number) {
    this._currentStock[CurrencyDenomination[currencyDenomination]].amount +=
      amount;
    this._behaviorSubject.next(this._currentStock);
    return true;
  }

  public withdrawal(amount: number) {
    let message = 'Insufficient Funds';
    const initialAmount = amount;
    let currencyBillsUsed: number[];
    currencyBillsUsed = this._currentStock.map((currencyAmount, index) => {
      let currencyUsed = Math.floor(amount / currencyAmount.display);
      if (currencyUsed > this._currentStock[index].amount) {
        currencyUsed = this._currentStock[index].amount;
      }
      amount -= currencyUsed * currencyAmount.display;
      return currencyUsed;
    });
    if (amount === 0) {
      this._currentStock.forEach((currencyAmount, index) => {
        this._currentStock[index].amount -= currencyBillsUsed[index];
      });
      return { status: true, message: 'Dispensed $' + initialAmount };
    }

    return { status: false, message: message };
  }
}
