import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ActivityInterface,
  AttachmentInterface,
  CheckListInterface,
  DetailsConfig,
  EntityType, FullUserInterface,
  PriorityInterface,
  UserInterface
} from '../../../core/models/details-models';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityService } from '../../../services/entity.service';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { faDownload, faTrashAlt, faEllipsisV, faPlusCircle, faTimes, faArrowLeft, faPlay, faEye } from '@fortawesome/free-solid-svg-icons';
import { AppConfig } from '../../../config/app.config';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { EPermission } from '../../../config/permissions-enum';
import { TicketsService } from '../../../services/tickets.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { log } from 'node:console';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-base-details-component',
  templateUrl: './base-details-component.component.html',
  styleUrls: ['./base-details-component.component.css']
})
export class BaseDetailsComponentComponent implements OnInit, OnDestroy {

  programmersMembers: UserInterface[] = [];
  testersMembers: UserInterface[] = [];
  show: boolean = true;
  /** entityId */
  entityId: number;
  /** entity type */
  entityType: EntityType;
  /** Configuration of this component. */
  configuration: DetailsConfig;
  /** Map assigned users from configurations. */
  assignedUser: FullUserInterface[];
  /** Map testers users from configurations. */
  testers: FullUserInterface[];
  /** Selected priority */
  selectedPriority: PriorityInterface;
  /** Tracked time in after format. */
  trackedTime: string;
  /** Activities title */
  activitiesTitle: string;
  /** If current user can changed track time. */
  canChangeTrackTime: boolean;
  /** If current user can changed entity state. */
  canChangeEntityState: boolean;
  /** If current user can changed entity priority. */
  canChangeEntityPriority: boolean;
  /** If current user can change entity title */
  canChangeEntityTitle: boolean;
  /** If current user can change entity description */
  canChangeEntityDescription: boolean;
  /** If current user can add item to checklist. */
  canAddChecklistItem: boolean;
  /** If current user can add a new checklist to this entity. */
  canAddChecklist: boolean;
  /** If current user can create a new activity or a new sub activity */
  canCreateActivity: boolean;
  /** If current user can assign users */
  canAssignUsers: boolean;
  /** Can upload a new attachment */
  canUploadAttachment: boolean;
  /** If new checklist input clicked */
  newChecklistInputClicked: boolean;
  /** If new activity input clicked */
  newActivityInputClicked: boolean;
  /** If can create comment */
  canCreateComment: boolean;
  /** Main details form group. */
  mainDetailsFormGroup: FormGroup;
  /** Base information form group. */
  baseInformationFormGroup: FormGroup;
  /** Subject instance */
  subject = new Subject();
  /** Download icon */
  faDownload = faDownload;
  /** video icon */
  faPlay = faPlay;
  /** Delete icon */
  faTrashAlt = faTrashAlt;
  /** Upload icon */
  faPlusCircle = faPlusCircle;
  /** Close Icon */
  faTimes = faTimes;
  /** View Icon */
  faEye = faEye;
  /** Options Icon */
  faEllipsisV = faEllipsisV;
  /** Back button */
  faArrowLeft = faArrowLeft;
  /** Base url  */
  baseUrl = AppConfig.baseUrl;
  /** Containers */
  containers: any[] = [];
  /** If list user clicked */
  listUserClicked: boolean;
  /** If testers clicked */
  listTestersClicked: boolean;
  /** If time tracker opened */
  timeTrackerOpened: boolean;
  /** Current page for logs // always start from page 2. */
  currentPageOfLogs = 1;
  /** Maximum page number of logs */
  maximumLogsPage: number;
  /** Html input element for attachment */
  /** temp array to prepend logs */
  logsArray: any;

  @ViewChild('htmlFileInputElement') fileInput: any;
  /**
   * Create a new instance of BaseDetailComponent
   * @constructor
   * @public
   * @param {MatDialogRef} dialogRef
   * @param {MAT_DIALOG_DATA} data
   * @param {FormBuilder} formBuilder
   * @param {EntityService} entityService
   * @param {DatePipe} datePipe
   * @param {Router} router
   * @param notifier
   * @param {MatDialog} dialog
   * @param {UserService} userService
   * @param {TicketsService} ticketService
   */
  constructor(
    private dialogRef: MatDialogRef<BaseDetailsComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private entityService: EntityService,
    private datePipe: DatePipe,
    private router: Router,
    private notifier: NotifierService,
    private dialog: MatDialog,
    private userService: UserService,
    private ticketService: TicketsService,
    private translate: TranslateService,
    private activitiesService: ActivitiesService,
  ) {
    this.entityId = data.id;
    this.entityType = data.type;
  }
  /**
   * When component init
   * @return {void}
   */
  ngOnInit(): void {
    // Load entity 
    this.loadEntity().then(() => {
      this.loadContainers();
      this.assignConfiguration();
      this.checkPossibleActions();
      this.initForms();
      this.checkCanChangeEntityState();
    }).catch((error) => {
      alert(error.message);
      this.dialogRef.close();
    });
  }
  /**
   * Load entity from server-side
   * @return {Promise<void>}
   */
  async loadEntity(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.entityService.getEntityById(this.entityId, this.entityType)
        .pipe(takeUntil(this.subject))
        .subscribe(
          results => {
            if (this.entityType === EntityType.TICKET) {
              this.configuration = this.entityService.mapTicketToConfig(results.data);
            } else {
              this.configuration = this.entityService.mapActivityToConfig(results.data);
            }
            this.maximumLogsPage = Math.ceil(this.configuration.logsCount / 10);
            resolve(results.data);
            //add current modal to route stack array
            var x = {
              eId: this.entityId,
              eType: this.entityType
            };
            if (!this.entityService.isRouteExsist(x)) {
              this.entityService.pushRoute(x);
            } else {
              this.entityService.stackArray.splice(-1, 1);
            }
          }, error => {
            reject(error);
          }
        );
    });
  }
  /**
   * Load containers
   * @return {void}
   */
  loadContainers(): void {
    this.ticketService.getContainer()
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.containers = results.data;
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Assign configuration
   * @return {void}
   */
  assignConfiguration(): void {
    this.assignedUser = this.configuration.assignedUser ? this.configuration.assignedUser.filter(user => user.role === 'PROGREMMER') : [];
    this.testers = this.configuration.assignedUser ? this.configuration.assignedUser.filter(user => user.role === 'TESTER') : [];
    this.selectedPriority = this.configuration.selectedPriority ? this.configuration.selectedPriority : {
      label: '',
      color: ''
    };
    // this.configuration.creationDate = this.datePipe.transform(this.configuration.creationDate, 'd MMM , h:mm:ss');
    this.trackedTime = this.configuration.trickedTime;
    this.activitiesTitle = this.configuration.entityType === EntityType.TICKET ? 'core.act_det.act' : 'core.act_det.sub';
  }
  /**
   * Init forms
   * @return {void}
   */
  initForms(): void {
    // Init main details form group
    this.mainDetailsFormGroup = this.formBuilder.group({
      state: [
        this.configuration.selectedStates.id
      ],
      priority: [
        this.selectedPriority.id
      ]
    });
    // Init base details form group
    this.baseInformationFormGroup = this.formBuilder.group({
      title: [
        { value: this.configuration.title, disabled: !this.canChangeEntityTitle }
      ],
      description: [
        { value: this.configuration.description, disabled: !this.canChangeEntityDescription }
      ]
    });
  }
  /**
   * Check on possible actions
   * return {void}
   */
  checkPossibleActions(): void {
    // If change entity state.
    this.canChangeEntityState = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.CHANGE_TICKET_STATE_PERMISSION] :
      [EPermission.CHANGE_ACTIVITY_STATE_PERMISSION]
    );
    //console.log('STATE => ', this.canChangeEntityState);
    // Handle change entity priority.
    this.canChangeEntityPriority = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.CHANGE_TICKET_PRIORITY_PERMISSION] :
      [EPermission.CHANGE_ACTIVITY_PRIORITY_PERMISSION]
    );
    // Handle change entity title.
    this.canChangeEntityTitle = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.UPDATE_TICKET_PERMISSION] :
      [EPermission.UPDATE_ACTIVITY_PERMISSION]
    );
    // Handle change entity description.
    this.canChangeEntityDescription = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.UPDATE_TICKET_PERMISSION] :
      [EPermission.UPDATE_ACTIVITY_PERMISSION]
    );
    // Handle add a new check list for entity.
    this.canAddChecklist = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.ADD_TICKET_CHECKLIST_PERMISSION] :
      [EPermission.ADD_ACTIVITY_CHECKLIST_PERMISSION]
    );
    // Handle add a new item to checklist.
    this.canAddChecklistItem = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.UPDATE_TICKET_CHECKLIST_PERMISSION] :
      [EPermission.UPDATE_ACTIVITY_CHECKLIST_PERMISSION]
    );
    // Handle create a new activity or sub activity for entity.
    this.canCreateActivity = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.ADD_ACTIVITY_PERMISSION] :
      [EPermission.ADD_SUB_ACTIVITY_PERMISSION]
    );
    // Handle create a new activity or sub activity for entity.
    this.canAssignUsers = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.ADD_TICKET_ASSIGN_USER_PERMISSION] :
      [EPermission.ADD_ACTIVITY_ASSIGN_USER_PERMISSION]
    );
    // Handle upload a new attachment.
    this.canUploadAttachment = this.userService.currentUserCan([
      EPermission.UPLOAD_ATTACHMENT
    ]);
    // Handle create a new comment for entity.
    this.canCreateComment = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.ADD_TICKET_COMMENT_PERMISSION] :
      [EPermission.ADD_ACTIVITY_COMMENT_PERMISSION]
    );
    // If change entity state.
    this.canChangeTrackTime = this.userService.currentUserCan(this.entityType === EntityType.TICKET ?
      [EPermission.CHANGE_ACTIVITIY_TRACKTIME_PERMISSION] :
      [EPermission.CHANGE_ACTIVITIY_TRACKTIME_PERMISSION]
    );
  }
  /**
   * When state changed
   * @param event
   * @return {void}
   */
  whenStateChanged(event): void {
    // Send request to change entity state
    this.entityService.changeEntityState(this.configuration.entityId, this.configuration.entityType, event.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.configuration.selectedStates = results.data;
          this.activitiesService.setRefreshData(true);
          console.log(results);
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * When priority changed
   * @param event
   * @return {void}
   */
  whenPriorityChanged(event): void {
    this.entityService.changeEntityPriority(this.configuration.entityId, this.configuration.entityType, event.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.configuration.selectedPriority = results.date;
          this.selectedPriority = results.data;
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Assign new user
   * @param {{selected: boolean, user: UserInterface}} event
   * @param {string} type
   * @return {void}
   */
  assignNewUser(event: { selected: boolean, user: UserInterface }, type: string): void {
    this.entityService.assignNewUser(this.entityId, this.entityType, type, event.user.id, event.selected)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          if (!event.selected) {
            if (type === 'PROGREMMER') {
              this.assignedUser = this.assignedUser.filter((user) => user.user.id !== event.user.id);
            } else {
              this.testers = this.testers.filter((user) => user.user.id !== event.user.id);
            }
          }
          this.loadUser();
        }, error => {
          console.log(error);
        }
      );
  }

  private loadUser(): void {
    this.entityService.loadMembers(this.entityId, this.entityType)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          if (results.data) {
            this.programmersMembers = [];
            this.testersMembers = [];
            results.data.assignedUsers.forEach(item => {
              item.user.selected = true;
              if (item.role == 'PROGREMMER') {
                this.programmersMembers.push(item.user);
              }
              else {
                this.testersMembers.push(item.user);
              }
            });
            if (results.data.allUsers) {
              results.data.allUsers.forEach(item => {
                this.programmersMembers.push(item);
                this.testersMembers.push(item);
              });
            }
          }
        }, error => {
          console.log(error);
        }
      );
  }

  /**
   * Update entity information.
   * @return {void}
   */
  updateEntityInformation(): void {
    // Check on entity type.
    if (this.configuration.entityType === EntityType.TICKET) {
      this.updateTicketInformation(this.baseInformationFormGroup.getRawValue());
    } else {
      this.updateActivityInformation(this.baseInformationFormGroup.getRawValue());
    }
  }
  /**
   * Update ticket information
   * @param {{title: string, description: string}} info
   * @return {void}
   */
  updateTicketInformation(info: { title: string, description: string }): void {
    this.entityService.updateTicketInformation(this.configuration.entityId, info.title, info.description, null)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.configuration.title = info.title;
          this.configuration.description = info.description;
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Update activity information
   * @param {{title: string, description: string}} info
   * @return {void}
   */
  updateActivityInformation(info: { title: string, description: string }): void {
    this.entityService.updateActivityInformation(this.configuration.entityId, info.title, info.description)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.configuration.title = info.title;
          this.configuration.description = info.description;
          console.log(results);
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Create a new activity
   * @param containerInputElm
   * @param descriptionInputElm
   * @return {void}
   */
  createNewActivity(containerInputElm: any, descriptionInputElm: any): void {
    if (!containerInputElm.value || !descriptionInputElm.value || descriptionInputElm.value === '') {
      return;
    }
    this.entityService.createNewActivity(
      containerInputElm.value,
      null,
      this.entityType === EntityType.ACTIVITY ? this.entityId : null,
      this.entityType === EntityType.TICKET ? this.entityId : null,
      descriptionInputElm.value
    ).pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          if (!this.configuration.activities) {
            this.configuration.activities = [];
          }
          this.configuration.activities.push(results.data);
          containerInputElm.value = null;
          descriptionInputElm.value = null;
          this.toggleNewActivityInput();
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Open activity
   * @param {ActivityInterface} activity
   * @return {void}
   */
  openActivity(activity: ActivityInterface): void {
    this.dialog.open(BaseDetailsComponentComponent, {
      width: '100%',
      data: {
        id: activity.id,
        type: EntityType.ACTIVITY
      }
    });
    this.dialogRef.close();
  }
  /**
   * Toggle item in check list
   * @param  {CheckListInterface} item
   * @param {CheckListInterface} parent
   */
  toggleItemInChecklist(item: CheckListInterface, parent: CheckListInterface): void {
    this.entityService.changeChecklistItemState(item)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.detectChecklistItemChange(results.data, parent);
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Detect change of checklist item state
   * @param {CheckListInterface} item
   * @param {CheckListInterface} parent
   * @return {void}
   */
  private detectChecklistItemChange(item: CheckListInterface, parent: CheckListInterface): void {
    const itemIndex = parent.children.findIndex(child => child.id === item.id);
    parent[itemIndex] = item;
    if (item.checked) {
      parent.checkedChildCount++;
    } else {
      parent.checkedChildCount--;
    }
  }
  /**
   * Create a new item or new checklist
   * @param {HTMLInputElement} element
   * @param {CheckListInterface | null} item
   * @return {void}
   */
  createNewChecklist(element: HTMLInputElement, item?: CheckListInterface): void {
    if (!element.value || element.value === '') {
      return;
    }
    this.entityService.createNewChecklistItem(this.configuration.entityId, this.configuration.entityType, element.value, item)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          if (item) {
            if (!item.children) {
              item.children = [];
            }
            item.children.push(results.data);
            item.allChildCount++;
          } else {
            if (!this.configuration.checkList) {
              this.configuration.checkList = [];
            }
            this.configuration.checkList.push(results.data);
            this.toggleNewChecklistInput();
          }
          element.value = '';
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Change click state for new checklist input
   * @return {void}
   */
  toggleNewChecklistInput(): void {
    this.newChecklistInputClicked = !this.newChecklistInputClicked;
  }
  /**
   * Change click state for new activity input
   * @return {void}
   */
  toggleNewActivityInput(): void {
    this.newActivityInputClicked = !this.newActivityInputClicked;
  }
  /**
   * Change click state for users list
   * @return {void}
   */
  toggleUsersList(): void {
    this.listUserClicked = !this.listUserClicked;
  }
  /**
  * Close user list
  * @return {void}
  */
  ClosetoggleUser(): void {
    this.listUserClicked = false;
  }
  /**
   * Change click state for users list
   * @return {void}
   */
  toggleTestersList(): void {
    this.listTestersClicked = !this.listTestersClicked;
  }
  /**
   * Close user tester list
   * @return {void}
   */
  ClosetoggleTester() {
    this.listTestersClicked = false;
  }
  /**
   * Change click state for users list
   * @return {void}
   */
  toggleTimeTracker(): void {
    if (this.canChangeTrackTime && this.entityType === EntityType.ACTIVITY) {
      this.timeTrackerOpened = !this.timeTrackerOpened;
    }
  }

  ClosetoggleTimeTracker(): void {
    this.timeTrackerOpened = false;
  }
  /**
   * View attachment
   * @param {AttachmentInterface} attachment
   * @return {void}
   */
  viewAttachment(attachment: AttachmentInterface): void {
    const url = `${this.baseUrl}/${attachment.filePath}`;
    window.open(url, 'download');
  }
  /**
   * Upload new attachment
   * @return {void}
   */
  uploadNewAttachment(): void {
    if (AppConfig.allowedUploadFileExtessions.indexOf(this.fileInput.nativeElement.files[0].type) != -1) {
      this.entityService.uploadNewAttachmentForEntity(
        this.configuration.entityId,
        this.configuration.entityType,
        this.fileInput.nativeElement.files[0])
        .pipe(takeUntil(this.subject))
        .subscribe(
          results => {
            if (!this.configuration.attachments) {
              this.configuration.attachments = [];
            }
            this.configuration.attachments.push(results.data);
            if (results.responseCode !== 200) {
              this.notifier.notify('error', results.message);
            }
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.notifier.notify('error', this.translate.instant('core.act_det.notAllowedFile'));
    }
  }
  /**
   * Save new comment for entity
   * @param {string} comment
   * @return {void}
   */
  saveNewComment(comment: string): void {
    this.entityService.createNewComment(this.configuration.entityId, this.configuration.entityType, comment)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          if (!this.configuration.logs) {
            this.configuration.logs = [];
          }
          this.configuration.logs.push({
            from_user: results.data.user,
            log_type: 'CREATE_COMMENT',
            log_value: results.data.comment_body,
            createdAt: results.data.createdAt,
            to_user: null,
            id: results.data.id
          });
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Update checklist description
   * @param {CheckListInterface} checklistItem
   * @param {string} description
   * @return {void}
   */
  updateChecklistDescription(checklistItem: CheckListInterface, description: string): void {
    if (!description || description === '') {
      return;
    }
    this.entityService.updateChecklistDescription(checklistItem.id, description)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          checklistItem.description = description;
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Add min to time track
   * @param {number} min
   * @return {void}
   */
  addMinToTimeTrack(min: number): void {
    this.entityService.addTrackedTimeToActivity(this.entityId, min)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.trackedTime = results.data.tracked_time;
          this.toggleTimeTracker();
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        },
        error => {
        }
      );
  }
  /**
   * Load logs for entity
   * @return {void}
   */
  loadLogs(): void {
    this.logsArray = [];
    this.currentPageOfLogs++;
    this.entityService.loadEntityLogs(this.entityId, this.entityType, this.currentPageOfLogs, 10)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          this.logsArray = results.data;
          this.logsArray = this.logsArray.concat(this.configuration.logs);
          this.configuration.logs = this.logsArray;
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Delete checklist
   * @param {CheckListInterface} itemToDelete
   * @param {CheckListInterface} parent
   * @return {void}
   */
  deleteChecklist(itemToDelete: CheckListInterface, parent?: CheckListInterface): void {
    this.entityService.deleteChecklist(itemToDelete.id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          if (results.success) {
            if (parent) {
              parent.children = parent.children.filter((item) => item.id !== itemToDelete.id);
            } else {
              this.configuration.checkList = this.configuration.checkList.filter((checklist) => checklist.id !== itemToDelete.id);
            }
          }
          if (results.responseCode !== 200) {
            this.notifier.notify('error', results.message);
          }
        }, error => {
          console.log(error);
        }
      );
  }
  /**
   * Close dialog
   * @public
   * @return {void}
   */
  close(): void {
    this.entityService.flushRoute();
    this.dialogRef.close();
  }
  show_base() {
    this.show = true;
  }
  hide_base() {
    this.show = false;
  }
  /**
  * When component destroyed
  * @return {void}
  */
  ngOnDestroy(): void {
    this.subject.complete();
    this.subject.next();
  }

  checkCanChangeEntityState() {
    if ((!this.canChangeEntityState) || (this.canChangeEntityState && !this.configuration.isValid)) {
      this.canChangeEntityState = false;
      this.canCreateActivity = false;
    }
    else {
      this.canChangeEntityState = true;
    }
  }

  goBack() {
    this.dialog.closeAll();
    const routeData = this.entityService.getPrevRoute();
    console.log('prev', routeData);
    if (routeData) {
      this.dialog.open(BaseDetailsComponentComponent, {
        width: '100%',
        data: {
          id: routeData.eId,
          type: routeData.eType
        }
      })
    }
  }

  deleteAttachment(attachment) {
    if (attachment) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: this.translate.instant('core.dialogs.deleteAttachment')
        }
      }).afterClosed().subscribe((data) => {
        if (data) {
          this.entityService.deleteAttachment(attachment.id).pipe(takeUntil(this.subject)).subscribe(results => {
            if (results) {
              const removeIndex = this.configuration.attachments.map(function (i) { return i.id; }).indexOf(attachment.id);
              this.configuration.attachments.splice(removeIndex, 1);
            }
          }, error => {
            console.log(error);
          });
        }
      });
    }

  }


}
