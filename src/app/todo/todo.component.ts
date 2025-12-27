import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../modules/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoArray:Array<Itodo>= [
    {
    todoItem:'Angular',
    todoId: '143'
    },
    {
    todoItem:'JS',
    todoId: '176'
    },
    {
    todoItem:'Ts',
    todoId: '897'
    }
  ]

isInEditMode:boolean=false;

editId!:string;

@ViewChild('todoItem') todoItem !:ElementRef
  
// private_snackbar= new MatSnackBar
  constructor(
    private _snackbar:MatSnackBar   //Service inject
  ) { }

  ngOnInit(): void {
  }

 onTodoAdd(){
  // get Todo obj
  if(this.todoItem.nativeElement.value.length>0){
   let todoObj:Itodo ={
    todoItem :this.todoItem.nativeElement.value,
    todoId :Date.now().toString()
  }
  this.todoItem.nativeElement.value=''
  console.log(todoObj)
  // push arr
  this.todoArray.push(todoObj)
  this. _snackbar.open(`The todo item with id ${todoObj.todoId} created successfully `,'close',
  {
  horizontalPosition:'left',
  verticalPosition:'top',
  duration:3000,
  } )
  // create a new li
  }
 }

 trackById(index:number,todo:Itodo){
 }

 removeTodo(id:string){
  console.log(id)
  let getIndex=this.todoArray.findIndex(t=>t.todoId === id)
  this.todoArray.splice(getIndex,1)
  this. _snackbar.open(`The todo with id ${id} removed successfully `, "close", {
  horizontalPosition:'left',
  verticalPosition:'top',
  duration:3000,

  })
 }

 onEdit(todo:Itodo){
  console.log(todo)
  this.editId=todo.todoId
  this.todoItem.nativeElement.value=todo.todoItem
  this.isInEditMode=true

 }
 onUpdate(){
  // Updated TODO
let UPDATED_TODO:Itodo={
  todoItem:this.todoItem.nativeElement.value,
  todoId:this.editId
}
console.log(UPDATED_TODO)
this.todoItem.nativeElement.value=''
this. _snackbar.open(`The todo item  with id ${this.editId} Updated successfully `, "close",
  {
  horizontalPosition:'left',
  verticalPosition:'top',
  duration:3000
  })

  // Replace in Array
let getIndex=this.todoArray.findIndex(t=>t.todoId=== UPDATED_TODO.todoId )
this.todoArray[getIndex]=UPDATED_TODO,
this.isInEditMode=false

 }
}

//Zone.js >>ChangeDetection.default
//Zone.js >> ChangeDetection.onpush