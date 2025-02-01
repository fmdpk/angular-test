import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  data: string = '';

  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
