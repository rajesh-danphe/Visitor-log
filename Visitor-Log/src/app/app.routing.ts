
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import { VisitorFormComponent } from './VisitorForm/visitor-form.component'
import { LatestNewsComponent } from './LatestNews/latest-news.component'
@NgModule({
    imports:[
        RouterModule.forRoot([
            {path:'',component:VisitorFormComponent},
            {path:'VisitorLog',component:VisitorFormComponent},
            {path:'LatestNews',component:LatestNewsComponent},
        ])
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}