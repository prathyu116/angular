import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm = '';

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
}