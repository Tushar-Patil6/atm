import { Component, Input } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: any[];
  @Input() initColumns: any[];

  displayedColumns: any[] = [];
  dataSourcevalue = [];
  ngOnInit(): void {
    this.displayedColumns = this.initColumns.map((col) => col.name);
    this.dataSourcevalue = cloneDeep(this.dataSource);
    this.dataSourcevalue.forEach((data) => {
      data.value = data.amount * data.display;
    });
  }
}
