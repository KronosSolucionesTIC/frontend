import {Component, inject, input, output} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: 'paginator.component.html',
  imports: [MatPaginatorModule],
})
export class PaginatorComponent {
    private _intl = inject(MatPaginatorIntl);
    totalItems = input<number>(0);
    pageSize = input<number>(5);
    onChange = output<{ page: number, limit: number }>();

    constructor(){
      this._intl.itemsPerPageLabel = 'Items por página:';
      this._intl.nextPageLabel = 'Siguiente página';
      this._intl.previousPageLabel = 'Página anterior';
    }

    handlePageEvent(e: PageEvent) {
      this.onChange.emit({
       page: e.pageIndex + 1, 
       limit: e.pageSize
      })
    }
}
