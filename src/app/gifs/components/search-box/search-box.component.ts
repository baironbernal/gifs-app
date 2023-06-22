import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  
  @ViewChild('txtTagInput') TagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  searchTag( ) {

    const newTag = this.TagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    this.TagInput.nativeElement.value='';
    console.log(newTag);
  }
}
