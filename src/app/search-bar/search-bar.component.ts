import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {SearchService} from "../search.service";
import {SearchResultsComponent} from "../search-results/search-results.component";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchText = '';
  searchResults : any = null
  spinner :Boolean = false
  constructor(public dialog: MatDialog, private searchService:SearchService) {

  }
  search() {
    /**check if exist search word*/
    if (this.searchText.length > 1) {
      this.spinner = true
      this.searchService.search('user', this.searchText).subscribe(
        (result: any) => {
          this.searchResults = result.hits.hits
          this.searchService.changeMessage(this.searchResults)
          this.searchResultsDialogOpen();
          this.spinner = false;
          this.searchText = "";
        },
        (error) => {
          this.searchResults = error.error();
          this.spinner = false;
        }
      )

    }
  }
  searchResultsDialogOpen(){
    const noticeRef = this.dialog.open(SearchResultsComponent, {
      height: '700px',
      width: '1000px',
    });
    noticeRef.afterClosed().subscribe(result => {
    })

  }


}
