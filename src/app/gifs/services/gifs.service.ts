import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public giftsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'gGnH24wO3pfD69w1oUEs1crM45LV0NB2';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

   searchTag(tag:string):void {

    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', 10)
        .set('q', tag)

    this.http.get<SearchResponse>( this.serviceUrl +  '/search', {params})
        .subscribe((resp) => {
          this.giftsList = resp.data
        })
    
  }

  private loadLocalStorage() {
    if(! localStorage.getItem('history')){
      return;
    }

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory[0]);
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }



  
}
