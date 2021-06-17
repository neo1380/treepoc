import { Component } from '@angular/core';
import { ITreeviewItem, ITreeviewConfig } from './lib';
import { BookService } from './book/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'treepoc';

  dropdownEnabled = true;
  items: ITreeviewItem[];
  values: number[];
  config = ITreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400,
  });

  constructor(private book: BookService) {}

  ngOnInit(): void {
    this.items = this.book.getBooks();
  }

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }

  selectedChange($event){
     console.log($event)
  }
}
