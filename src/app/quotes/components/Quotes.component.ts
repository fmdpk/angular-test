import { Component, OnInit } from "@angular/core";
import { QuoteService } from "../service/Quote.service";
import { QuoteModel } from "../model/QuoteModel";

@Component({
  selector: "app-Quotes",
  templateUrl: "./Quotes.component.html",
  styleUrls: ["./Quotes.component.css"]
})
export class QuotesComponent implements OnInit {
  public quoteList: QuoteModel[] = [];
  public fetchedList: QuoteModel[] = [];
  public quoteText: String = "";
  clickCounter: number = 0

  constructor(private service: QuoteService) { }

  ngOnInit() {
    this.getQuoteList()
    this.service.fetchQuotesFromServer().then((data: QuoteModel[]) => {
      this.fetchedList = data;
    });
  }

  getQuoteList() {
    this.quoteList = this.service.getQuote();
  }

  createNewQuote() {
    this.service.addNewQuote(this.quoteText);
    this.clickCounter += 1
    this.getQuoteList()
  }

  removeQuote(index: number) {
    this.service.removeQuote(index);
    this.clickCounter += 1
    this.getQuoteList()
  }
}
