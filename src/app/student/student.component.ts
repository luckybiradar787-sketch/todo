import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../modules/students';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  

 stdArr:Array<Istd>=[

  {
    fname: "Laxmikant",
    lname: 'Biradar',
    email: 'luckybiradar787@gmail.com',
    stdId: "0"
  },

  {
    fname: "Neha",
    lname: 'Biradar',
    email: 'Neha45@gmail.com',
    stdId: "1"
  },

  {
    fname: "Rahul",
    lname: 'Kulkarni',
    email: 'Rahul786@gmail.com',
    stdId: "2"
  },

 ]


isInEditMode: boolean= false;
editId!:string

@ViewChild('fname') fname!:ElementRef;
@ViewChild('lname') lname!:ElementRef;
@ViewChild('email') email!:ElementRef;

  constructor(
    private _matDialog:MatDialog,
    private _snakBar:MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onStdAdd(){
    // STD_OBJ
    let STD_OBJ : Istd = {
      fname: this.fname.nativeElement.value,
      lname: this.lname.nativeElement.value,
      email: this.email.nativeElement.value,
      stdId: Date.now().toString()
    }
     this.fname.nativeElement.value=''
     this.lname.nativeElement.value=''
    this.email.nativeElement.value=''

    console.log(STD_OBJ)
    this.stdArr.push(STD_OBJ)
    
  }
 

  trackById(index:number, item:Istd ){
    return item.stdId
  }


onRemove(id:string){
  //open dialog box>>close
// let getConfirm= confirm(`Are you sure??`)
// console.log(getConfirm);

let matConfirg = new MatDialogConfig()
matConfirg.disableClose = true
matConfirg.width="500px"
let matDialogRef = this ._matDialog.open(GetConfirmComponent)
matDialogRef.afterClosed()
 .subscribe(res=>{
  // console.log(res)
  if(res){
    let getIndex= this.stdArr.findIndex(s=>s.stdId === id)
    let std = this.stdArr.splice(getIndex,1)
    // console.log(std)
    this._snakBar.open(`The student with id${id} is removed successfully !!!`,`close`,{
      horizontalPosition :'left',
      verticalPosition:'top',
      duration:3000
    })

  }
 })

// ({
//   next : res =>{
//     console.log(res);
//   }
// })


}

onEdit(std:Istd){
//console.log(std);
this.fname.nativeElement.value=std.fname;
this.lname.nativeElement.value=std.lname;
this.email.nativeElement.value=std.email;
this.isInEditMode=true
this.editId=std.stdId
}

onUpdate(){
  //updated obj
  let UPDATED_OBJ: Istd ={
    fname:this.fname.nativeElement.value,
    lname:this.lname.nativeElement.value,
    email:this.email.nativeElement.value,
    stdId:this.editId
  }

  this.fname.nativeElement.value=''
  this.lname.nativeElement.value=''
  this.email.nativeElement.value=''

  let getIndex=this.stdArr.findIndex(s=>s.stdId === this.editId)
  this.stdArr[getIndex]= UPDATED_OBJ

  this.isInEditMode=false
  this._snakBar.open(`The student with id${this.editId} updated successfully !!`)
}
}
