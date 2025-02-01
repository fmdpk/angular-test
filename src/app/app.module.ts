import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RoutesModule } from './routes/routes/routes.module';

import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/components/Quotes.component';
import { QuoteComponent } from './components/quote/quote.component';
import { MyComponent } from './components/my/my.component';
import { TestComponent } from './components/test/test.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TitleCasePipe } from './pipes/title-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    QuoteComponent,
    MyComponent,
    TestComponent,
    HighlightDirective,
    TitleCasePipe  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
