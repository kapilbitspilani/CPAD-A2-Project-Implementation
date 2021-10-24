import { Component, OnInit } from '@angular/core';
import { StockTransaction } from "../../../models/StockTransaction";
import { Stock } from '../../../models/stock';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor() { }

  selectedItem: Stock;
  selectedItemToSell: Stock;
  numberOfShares: number=0;
  numberOfSharesToSell: number=0;

  stocks: Stock[] = [
    { id: 1, company: "Reliance", price: 2627.05 },
    { id: 2, company: "Infosys", price: 1719.55 },
    { id: 3, company: "HUL", price: 2455.05 },
    { id: 4, company: "Hdfc Bank", price: 1681.95 },
    { id: 5, company: "TCS", price: 3500.05 },
  ];
  availableBalance: number = 100000;
  transactions: StockTransaction[] = [];

  ngOnInit(): void {
    this.selectedItem = this.stocks[0];
    this.selectedItemToSell = this.stocks[0];
  }

  selectStock(id: number) {
    this.selectedItem = this.stocks.find(s => s.id == id);
  }

  selectStockToSell(id: number) {
    this.selectedItemToSell = this.stocks.find(s => s.id == id);
  }

  buyStocks() {
    if (this.numberOfShares * this.selectedItem.price > this.availableBalance || this.numberOfShares <= 0) {
      alert('Enter a valid amout of shares to purchase.');
      return;
    }
    this.availableBalance -= this.numberOfShares * this.selectedItem.price;
    this.transactions.push(
      {
        numberOfStocks: this.numberOfShares,
        price: this.selectedItem.price,
        purchaseDate: (new Date()).toString(),
        stockId: this.selectedItem.id,
        stockName: this.selectedItem.company,
        transactionType: "Buy"
      });
  }

  sellStocks() {
    if (this.numberOfSharesToSell > this.getAvailableShares(this.selectedItemToSell.id) || this.numberOfSharesToSell <= 0) {
      alert('Enter a valid amout of shares to sell.');
      return;
    }

    this.availableBalance += this.numberOfSharesToSell * this.selectedItemToSell.price;
    this.transactions.push(
      {
        numberOfStocks: this.numberOfSharesToSell,
        price: this.selectedItemToSell.price,
        purchaseDate: (new Date()).toString(),
        stockId: this.selectedItemToSell.id,
        stockName: this.selectedItemToSell.company,
        transactionType: "Sell"
      });
  }

  getAvailableShares(stockId: number): number {
    let boughtStocks = 0;
    this.transactions
      .filter(t => t.stockId == stockId && t.transactionType == "Buy")
      .forEach(t => boughtStocks += t.numberOfStocks);
    let soldStocks = 0;
    this.transactions
      .filter(t => t.stockId == stockId && t.transactionType == "Sell")
      .forEach(t => soldStocks += t.numberOfStocks);

    return boughtStocks - soldStocks;

  }
}
