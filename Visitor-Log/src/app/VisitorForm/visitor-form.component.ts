import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { VisitorModel } from './visitor-form.model'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VisitorService } from './visitor-service'

@Component({
    templateUrl: './visitor-form.component.html',
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition(':enter,:leave', [
                animate(250)
            ])
        ])
    ]
})
export class VisitorFormComponent implements OnInit {

    public visitorFormValidate: FormGroup = null;
    public visitorList: any = [];
    public visitorModel: VisitorModel = new VisitorModel();
    public showChild: boolean = false;
    public isEdit: boolean = false;
    public editRowId:number;
    constructor(public formBuilder: FormBuilder,
        public visitorService: VisitorService) {

    }

    ngOnInit() {
        this.visitorFormValidate = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            visitType: ['', Validators.required],
            personToVisit: ['', Validators.required],
            dateOfEntry: ['', Validators.required],
            timeOfEntry: ['', Validators.required],
            timeOfExit: ['', Validators.required],

        })
        this.visitorFormValidate.controls['dateOfEntry'].setValue(moment().format("YYYY-MM-DD"));
        this.visitorFormValidate.controls['visitType'].setValue("");
        this.visitorFormValidate.controls['dateOfEntry'].disable();
        this.visitorList = JSON.parse(localStorage.getItem('Visitor_List')) !== null ? JSON.parse(localStorage.getItem('Visitor_List')) : [];
    }

    expandChild() {
        if (this.showChild) {
            this.showChild = false;
            this.Reset();
        } else {
            this.isEdit = false;
            this.showChild = true;
            this.Reset();
        }
    }
    Submit() {
        let CheckIsValid = true;
        if (!this.visitorFormValidate.valid) {
            for (var b in this.visitorFormValidate.controls) {
                this.visitorFormValidate.controls[b].markAsDirty();
                this.visitorFormValidate.controls[b].updateValueAndValidity();
                CheckIsValid = false;
            }
        }
        if (CheckIsValid) {
            this.visitorFormValidate.controls['dateOfEntry'].enable();
            this.visitorModel = this.visitorFormValidate.value;
            this.visitorList.push(this.visitorModel)
            localStorage.setItem("Visitor_List", JSON.stringify(this.visitorList))
            this.showChild = false;
            this.visitorFormValidate.reset();
            this.visitorFormValidate.controls['dateOfEntry'].setValue(moment().format("YYYY-MM-DD"));
            this.visitorFormValidate.controls['visitType'].setValue("");
            this.visitorFormValidate.controls['dateOfEntry'].disable();
        } else {
            alert("Please fill mandatory fields.")
        }
    }
    Reset() {
        this.visitorFormValidate.reset();
        this.visitorFormValidate.controls['dateOfEntry'].setValue(moment().format("YYYY-MM-DD"));
        this.visitorFormValidate.controls['visitType'].setValue("");
        this.visitorFormValidate.controls['dateOfEntry'].disable();

    }
    Edit(row) {
        this.showChild = true;
        this.isEdit = true;
        this.editRowId = this.visitorList.indexOf(row);
        this.visitorFormValidate.controls['name'].setValue(row.name);
        this.visitorFormValidate.controls['email'].setValue(row.email);
        this.visitorFormValidate.controls['visitType'].setValue(row.visitType);
        this.visitorFormValidate.controls['personToVisit'].setValue(row.personToVisit);
        this.visitorFormValidate.controls['dateOfEntry'].setValue(moment(row.dateOfEntry).format("YYYY-MM-DD"));
        this.visitorFormValidate.controls['timeOfEntry'].setValue(row.timeOfEntry);
        this.visitorFormValidate.controls['timeOfExit'].setValue(row.timeOfExit);

    }
    Update() {
        this.visitorFormValidate.controls['dateOfEntry'].enable();
        this.visitorList[this.editRowId] =this.visitorFormValidate.value;
        this.visitorModel = new VisitorModel();
        this.showChild = false;
        localStorage.setItem("Visitor_List", JSON.stringify(this.visitorList))
        this.visitorList = this.visitorList;
        this.visitorFormValidate.controls['dateOfEntry'].disable();
        this.Reset();

    }
    Delete(row) {
        for (let a = 0; a < this.visitorList.length; a++) {
            let index = this.visitorList.indexOf(row);
            if (index ==a) {
                this.visitorList.splice(a,1);
            }
        } 
        localStorage.setItem("Visitor_List", JSON.stringify(this.visitorList))
        this.visitorList = this.visitorList;
    }

}