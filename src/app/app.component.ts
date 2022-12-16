import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent {
  tree!: TreeNode[];
   constructor(
    public _http:HttpClient,
    private messageService:MessageService,
   ){
    this._http.get('/assets/employees.json').subscribe(
      ( data:any ) =>
    {

      const newdata : Array<any> = data.map((item:any)=>{
        const {EMPLOYEE_ID,FIRST_NAME,LAST_NAME,EMAIL,PHONE_NUMBER,HIRE_DATE,JOB_ID,SALARY,COMMISSION_PCT,MANAGER_ID,DEPARTMENT_ID} = item;
        return {
          id:EMPLOYEE_ID,
          label:FIRST_NAME,
          pid:MANAGER_ID,
          commisionPCT:COMMISSION_PCT,
          firstName:FIRST_NAME,
          lastName:LAST_NAME,
          email:EMAIL,
          phone:PHONE_NUMBER,
          dataOfJoining:HIRE_DATE,
          jobId:JOB_ID,
          salary:SALARY,
          deptId:DEPARTMENT_ID,
          styleClass: 'p-person',
           expanded: true,
           data:{
            name:HIRE_DATE,
           }
        }
      });
      const root = newdata.find((item)=>{
        return  newdata.findIndex(inner=>inner.id === item.pid) === -1;

        });


        if(root){
          root.children = [];
          this.tree = [root];
          this.tree[0]['children'] = newdata.filter(item=>item.pid === root.id);
          console.log(this.tree);
          this.tree[0].children.forEach((element:any)=>{
            element['children'] = newdata.filter(item=>item.pid === element.id);
          })
        }



    });
   }
   onNodeSelect(event: { node: { label: any; }; }) {
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
}
}
