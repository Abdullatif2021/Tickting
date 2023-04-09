import { UploadService } from 'src/app/services/upload.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { CustomFilePickerAdapter } from 'src/app/shared/custom-file-picker.adapter';
import { FormGroup,FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FilePickerComponent } from "ngx-awesome-uploader";
import { EntityService } from '../../../../../services/entity.service';
import { FilePreviewModel } from "ngx-awesome-uploader";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import {faDownload,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import {UserService} from '../../../../../services/user.service';
import {EntityType} from '../../../../../core/models/details-models';
import {takeUntil} from 'rxjs/operators';

interface CertificateSubmissionResult {
  fileName: string;
  fileSize: number;
}
export interface AttachmentInterface{
  id: number;
  filePath: string;
  fileName: string;
  createdAt: string;
}


@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {
  uploadProgress = 0;
  selectedFiles: File[];
  uploading = false;
  errorMsg = '';
  disable: boolean;
  /** If component in the loading mode. */
  loading: boolean;
  submissionResults: CertificateSubmissionResult[] = [];
  id = null;
  @ViewChild("uploader", { static: false }) uploader: FilePickerComponent;
  public adapter = new CustomFilePickerAdapter(this.http);
  public myFiles: FilePreviewModel[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  idgroup = '';
  enable = false;
  enable1 = 6;
  faPlusCircle = faPlusCircle;
  enable2 = '';
  idprio = '';
  url= "www.edryhrstxr.com"
  idstate = '';
  groupA: any[];
  appconfig: any;
  fileToUpload: File = null;
  attachments: any;
  data1: any;
  states: any;
  prior: any;
  activitystatuses: any;
  data :any= {
    name: '',
    description: '',
    startdate: '',
    enddate: '',
    container_id: this.idgroup,
    priority_id: this.idprio,
    state_id: this.idstate,
  };
  //init file uploader adapter
  editor: Editor;
  myForm: FormGroup;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  subject = new Subject();
  user;
  files = new Map();

  constructor(
    private ticketsservice: TicketsService,
    private http: HttpClient,
    private ActivitiesService: ActivitiesService,
    public fb: FormBuilder,
    private entityService: EntityService,
    private uploadservice: UploadService,
    private router: Router,
    private readonly httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    {
      console.log('wetertewer');
      localStorage.getItem('AppConfig');
      this.appconfig = JSON.parse(localStorage.getItem("AppConfig"));
      console.log(this.appconfig);

      this.states = this.appconfig.activity_states;
      this.prior = this.appconfig.priorities;
      console.log(this.prior);
      // console.log(this.states);
      this.reactiveForm()
      this.ActivitiesService.getContainer()
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          console.log(results);
          this.groupA = results.data;
        }, error => {
          console.log(error);
        }
      );

    }
    this.editor = new Editor();

  }

  Createactivity() {
    if (this.myForm.invalid) {
      return;
    }
    this.loading = true;
    this.disable = true;
    this.fixScroll();
    this.ActivitiesService.createActivity(this.data).subscribe(results => {
      this.uploadAttachment(results.data.id).then(() => {
        this.router.navigate(['/activities']);
      }).catch((e) => console.log(e));
  }, error => {
      console.log(error);
    })
  }
   // upload file
   uploadSuccess(event): void {
    this.files.set(event.fileName, event.file);
  }
  removeFiles(event): void{
    this.files.delete(event.fileName);
  }
  async uploadAttachment(entityId): Promise<void>{
      return new Promise( async (resolve, reject) => {
          for (let i of this.files){
            await this.uploadSingleFile(entityId, i[1]);
          }
          resolve();
      });
  }
  private async uploadSingleFile(entityId, file: any) {
    return new Promise((resolve, reject) => {
      this.entityService.uploadNewAttachmentForEntity(entityId, EntityType.ACTIVITY, file)
        .pipe(takeUntil(this.subject))
        .subscribe(
          results => {
            resolve(results);
          }, error => {
            reject(error);
          }
    );
    });
  }
  // end of upload file
  /* Reactive form */
  reactiveForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      groupss: ['', [Validators.required]],
    })
  }
  /**
   * Fix scroll of page.
   * @public
   * @return {void}
   */
   fixScroll(): void{
    let top = document.getElementById('scroll-helper');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  submitForm() {
    console.log(this.myForm.value)
  }
  groupSelected(event) {
    console.log(this.data1)
    this.idgroup = event.id;
    console.log(this.idgroup);
    this.data.container_id = this.idgroup
  }
  prioSelected(event) {
    this.idprio = event.id;
    console.log(this.idprio);
    this.data.priority_id = this.idprio
  }
  stateSelected(event) {
    this.idstate = event.id;
    console.log(this.idstate);
    this.data.state_id = this.idstate
  }
  /* Handle form errors in Angular 8 */
  errorHandling = (control: string, error: string) => {
    console.log('wegwrgweg');

    return this.myForm.controls[control].hasError(error);
  }

  changeEvent(event) {
  console.log(event.value);
  this.data.startdate = event.value
  }
  changeEvent2(event) {
  console.log(event.value);
  this.data.enddate = event.value
}
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}


