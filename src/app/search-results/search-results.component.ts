import {Component, OnInit} from '@angular/core';
import { SearchService} from "../search.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{
  results:any = null
  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(message => this.results=message)
    console.log("user search results",this.results)
  }
  constructor(private searchService:SearchService) {
    this.searchService.currentMessage.subscribe(message => this.results=message)
  }

}
