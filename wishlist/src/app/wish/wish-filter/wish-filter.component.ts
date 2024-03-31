import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wish-filter',
  templateUrl: './wish-filter.component.html',
  styleUrls: ['./wish-filter.component.css']
})
export class WishFilterComponent implements OnInit {

  @Input() filter: any;
  @Output() filterChange = new EventEmitter<any>();

  ngOnInit(): void {
    console.log("==== ngOnInit ====");
    this.updateFilter('0');
  }

  updateFilter(value: any) {
    console.log("==== updateFilter ====");
    this.filterChange.emit(value);
  }

}
