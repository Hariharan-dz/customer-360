import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Customer360UiService } from 'src/app/services/customer360-ui.service';

@Component({
  selector: 'app-work-queue',
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss'],
})
export class WorkQueueComponent implements OnInit {
  ticker: any = {};

  wqm: any = {};
  isModalOpen = false;
  task: any = {
    name: "openorders",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: true,
    fields: [
      { name: "TASK NUMBER", attr: "task_nr", width: "135", type: "CLICK", clickFunction: (el: any) => this.editModalOpen() },
      { name: "AGENT ID", attr: "agent_id", width: "175" },
      { name: "AGENT NAME", attr: "agent_name", width: "175" },
      { name: "DATE & TIME", attr: "date_time", width: "175" },
      { name: "TEST SUMMARY", attr: "test_summary", width: "175" },
      { name: "STATUS", attr: "status", width: "100" }

    ],
    actions: [
    ],
    getRecord: (params: any) => this.custmservice.openOrders(params),
    buildData: (openorders: any) => {
      return openorders.map((order: any) => {

        return {
          task_nr: order.task_nr,
          agent_id: order.agent_id,
          agent_name: order.agent_name,
          date_time: this.datePipe.transform(order.date_time, this.custmservice.date_time_format),
          test_summary: order.test_summary,
          status: order.status,
          link: {
            id: '/configuration/template/' + order.id
          },
          action: {
            edit: '/configuration/template/' + order.id,
            clone: '/configuration/template/clone/' + order.id,
          },
          additionalData: {
            category_id: order.id
          }
        };
      });
    }
  };

  queue: any = {
    name: "task",
    pk: "id",
    search: "",
    needServerSidePagination: false,
    isPageNationDisable: true,
    fields: [
      { name: "ID", attr: "id", width: "135", type: "CLICK", clickFunction: (el: any) => this.editModalOpen() },
      { name: "TASK NAME", attr: "name", width: "175" },
      { name: "DESCRIPTION", attr: "description", width: "175" },
      { name: "PRIORITY", attr: "priority", width: "135" },
      { name: "DUE DATE", attr: "dueDate", width: "135" },
      { name: "STATUS", attr: "status", width: "100" },
      { name: "ASSIGNEE", attr: "assignee", width: "100" },
    ],
    actions: [
    ],
    getRecord: (params: any) => this.custmservice.gettaskOrders(params),
    buildData: (tasks: any) => {
      return tasks.map((task: any) => {
        return {
          id: task.id,
          name: task.name,
          description: task.description,
          priority: task.priority,
          dueDate: this.datePipe.transform(task.dueDate, this.custmservice.date_format),
          status: task.status,
          assignee: task.assignee,
          link: {
            id: '/configuration/template/' + task.id
          },
          action: {
            edit: '/configuration/template/' + task.id,
            clone: '/configuration/template/clone/' + task.id,
          },
          additionalData: {
            category_id: task.id
          }
        };
      });
    }
  };
  summary: any = {};
  isEditModal = false;

  constructor(private datePipe: DatePipe, private custmservice: Customer360UiService, private modalCtrl: ModalController) { }

  view: string = 'TASK';
  ngOnInit() {
    this.getTaskCount();
  }
  isCreateTicketModel = false;

  getTaskCount() {
    this.custmservice.getTaskCount().subscribe((data: any) => {
      this.summary = data;
    })
  }

  switchView(view: string) {
    this.view = view;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  editModalOpen(isOpen?: boolean) {
    this.isEditModal = true;
  }

  saveWQM() {
    this.custmservice.saveWQM(this.wqm).subscribe({
      next: (categoryList: any) => {
        alert('succes')
      },
      error: (err: any) => {
        err = err.error || err;
      }
    })
  }
}
