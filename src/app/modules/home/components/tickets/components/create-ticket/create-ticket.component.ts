import { TicketsService } from 'src/app/services/tickets.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { CustomFilePickerAdapter } from 'src/app/shared/custom-file-picker.adapter';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../../../../../../services/user.service';
import { EntityService } from '../../../../../../services/entity.service';
import { EntityType } from '../../../../../../core/models/details-models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CreateTicketComponent implements OnInit, OnDestroy {
  groupA: any[];
  // init file uploader adapter.
  public adapter = new CustomFilePickerAdapter(this.http);
  editor: Editor;
  disable: boolean;
  rest: any;
  /** If component in the loading mode. */
  loading: boolean;
  ticketFormGroup: FormGroup;
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
    public fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private entityService: EntityService
  ) {
    this.user = this.userService.getCurrentUser();
    this.reactiveForm();
  }
  ngOnInit(): void {
    {
      this.ticketsservice.getGroups().subscribe(data => {
        this.groupA = data.data;
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
    this.editor = new Editor();
  }
  uploadSuccess(event): void {
    this.files.set(event.fileName, event.file);
  }
  removeFiles(event): void {
    this.files.delete(event.fileName);
  }
  async uploadAttachment(entityId): Promise<void> {
    return new Promise(async (resolve, reject) => {
      for (let i of this.files) {
        await this.uploadSingleFile(entityId, i[1]);
      }
      resolve();
    });
  }
  private async uploadSingleFile(entityId, file: any) {
    return new Promise((resolve, reject) => {
      this.entityService.uploadNewAttachmentForEntity(entityId, EntityType.TICKET, file)
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
  /**
   * Fix scroll of page.
   * @public
   * @return {void}
   */
  fixScroll(): void {
    let top = document.getElementById('scroll-helper');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  CreateTicket() {
    // stop here if form is invalid
    if (this.ticketFormGroup.invalid) {
      return;
    }
    this.loading = true;
    this.disable = true;
    this.fixScroll();
    const contactData = this.ticketFormGroup.getRawValue();

    this.ticketsservice.createTicket({
      contact: {
        name: contactData.name,
        surname: contactData.surname,
        phone: contactData.phone,
        email: contactData.email,
      },
      ticket: {
        message: contactData.message,
        group_id: contactData.group_id,
        object: contactData.object,
        problem_area: contactData.problem_area,
        description: contactData.description,
        link: contactData.link
      }
    }).pipe(takeUntil(this.subject)).subscribe(
      results => {
        this.uploadAttachment(results.data.id).then(() => {
          this.router.navigate(['/']);
        }).catch((e) => console.log(e));
      }
    );
  }

  /* Reactive form */
  reactiveForm() {
    this.ticketFormGroup = this.fb.group({
      name: [this.user ? this.user.username : null, [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"))]],
      object: ['', [Validators.required]],
      problem_area: ['', [Validators.required]],
      group_id: ['', [Validators.required]],
      link: [],
      message: [null, Validators.required]
    });
  }

  submitForm() {
    this.errorHandling;
  }

  /* Handle form errors in Angular 8 */
  errorHandling = (control: string, error: string) => {
    if (this.ticketFormGroup.controls[control]) {
      return this.ticketFormGroup.controls[control].hasError(error);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
