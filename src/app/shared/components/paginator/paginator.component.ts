import { Component, inject, input, output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TEXTS } from '../../../core/constants/texts';

@Component({
  selector: 'app-paginator',
  templateUrl: 'paginator.component.html',
  imports: [MatPaginatorModule],
})
export class PaginatorComponent {
    readonly texts = TEXTS.PAGINATION;
    private _intl = inject(MatPaginatorIntl);
    totalItems = input<number>(0);
    pageSize = input<number>(5);
    onChange = output<{ page: number, limit: number }>();

    constructor(){
      this._intl.itemsPerPageLabel = this.texts.ITEMS;
      this._intl.nextPageLabel = this.texts.NEXT_PAGE;
      this._intl.previousPageLabel = this.texts.PREVIOUS_PAGE;
    }

    handlePageEvent(e: PageEvent): void {
      this.onChange.emit({
       page: e.pageIndex + 1, 
       limit: e.pageSize
      })
    }
}
