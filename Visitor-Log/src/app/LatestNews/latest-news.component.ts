import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
@Component({
    templateUrl: './latest-news.component.html'
})
export class LatestNewsComponent {

    public lastestNewsList: any = [];
    constructor(public http: HttpClient) {
        this.http.get<any>("http://newsapi.org/v2/everything?q=bitcoin&from=" + moment().format("YYYY-MM-DD") + "&sortBy=publishedAt&apiKey=a0e323a6abe54e7fa917d7e06fe2933c")
            .subscribe(res => {
                this.lastestNewsList = res.articles
                console.log(res);
            }, err => {
                console.log(err);
            })
        
    }
}