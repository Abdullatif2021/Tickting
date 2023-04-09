import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityInterface, CheckListInterface, DetailsConfig, EntityType, TicketInterface } from '../core/models/details-models';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class EntityService {

  /** Logs key map */
  logsKeyMap = {
    CHANGE_PRIORITY: this.translate.instant('services.entity.prio'),
    CHANGE_STATE: this.translate.instant('services.entity.state'),
    UPLOAD_ATTACHMENT: this.translate.instant('services.entity.upload'),
    CHECKLIST_ITEM_CHECKED_CHILD: this.translate.instant('services.entity.checked_item'),
    CHECKLIST_ITEM_UNCHECKED_CHILD: this.translate.instant('services.entity.unchecked_item'),
    CREATE_ACTIVITY: this.translate.instant('services.entity.create_act'),
    CREATE_TICKET: this.translate.instant('services.entity.create_tic'),
    CREATE_SUB_ACTIVITY: this.translate.instant('services.entity.create_act'),
    UPDATE_ACTIVITY: this.translate.instant('services.entity.update1'),
    CREATE_CHECKLIST_CHILD: this.translate.instant('services.entity.create_check_item'),
    CHECKLIST_ITEM_CHECKED: this.translate.instant('services.entity.checked_item'),
    CHECKLIST_ITEM_UNCHECKED: this.translate.instant('services.entity.unchecked_item'),
    VALIDATE_TICKET: this.translate.instant('services.entity.vaild'),
    REJECT_TICKET: this.translate.instant('services.entity.reject'),
    REJECT_TICKET_WITH_COMMENT: this.translate.instant('services.entity.reject'),
    ASSIGN_USER: this.translate.instant('services.entity.assign'),
    TRACKED_TIME: this.translate.instant('services.entity.add_time'),
    CREATE_CHECKLIST_PARENT: this.translate.instant('services.entity.create_check'),
    DELETE_ATTACHMENT: this.translate.instant('services.entity.delete_attachment'),
  };
  /** Modal Routes */
  stackArray = [];
  /**
   * Create a new instance from entity service
   * @constructor
   * @public
   * @param {HttpClient} http
   * @param {ConfigService} configService
   */
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private translate: TranslateService,

  ) { }
  /**
   * Get entity by id
   * @param {number} entityId
   * @param {EntityType} entityType
   */
  getEntityById(entityId: number, entityType: EntityType): Observable<any> {
    if (entityType === EntityType.TICKET) {
      return this.http.get(AppConfig.endpoints.getTicketById(entityId));
    } else {
      return this.http.get(AppConfig.endpoints.getActivityById(entityId));
    }
  }
  /**
   * Change entity state
   * @param {number} entityId
   * @param {EntityType} entityType
   * @param {number} stateId
   * @return {Observable}
   */
  changeEntityState(entityId: number, entityType: EntityType, stateId: number): Observable<any> {
    return this.http.post(AppConfig.endpoints.changeEntityState, {
      entity_id: entityId,
      entity_type: entityType,
      state_id: stateId
    });
  }
  /**
   * Change entity priority
   * @param {number} entityId
   * @param {EntityType} entityType
   * @param {number} priorityId
   * @return {Observable}
   */
  changeEntityPriority(entityId: number, entityType: EntityType, priorityId: number): Observable<any> {
    return this.http.post(AppConfig.endpoints.changeEntityPriority, {
      entity_id: entityId,
      entity_type: entityType,
      priority_id: priorityId
    });
  }
  /**
   * Update ticket information.
   * @param {number} ticketId
   * @param  {string} subject
   * @param {string} description
   * @param {string} problemArea
   * @return {Observable}
   */
  updateTicketInformation(ticketId: number, subject: string, description: string, problemArea: string): Observable<any> {
    return this.http.post(AppConfig.endpoints.updateTicket, {
      ticket_id: ticketId,
      object: subject,
      description: description,
      problem_area: problemArea
    });
  }
  /**
   * Update activity information.
   * @param {number} activityId
   * @param {string} name
   * @param {string} description
   * @return {Observable}
   */
  updateActivityInformation(activityId: number, name: string, description: string): Observable<any> {
    return this.http.post(AppConfig.endpoints.updateActivity, {
      activity_id: activityId,
      name: name,
      description: description,
    });
  }
  /**
   * Change checklist item state
   * @param {CheckListInterface} item
   * @return {Observable}
   */
  changeChecklistItemState(item: CheckListInterface): Observable<any> {
    return this.http.post(AppConfig.endpoints.changeChecklistState, {
      checklist_id: item.id,
      checked: item.checked
    });
  }
  /**
   * Create a new checklist or a new item in checklist
   * @param {number} entityId
   * @param {EntityType} entityType
   * @param {string} description
   * @param {CheckListInterface | null} item
   * @return {Observable}
   */
  createNewChecklistItem(entityId: number, entityType: EntityType, description: string, item?: CheckListInterface): Observable<any> {
    return this.http.post(AppConfig.endpoints.createChecklist, {
      entity_id: entityId,
      entity_type: entityType,
      description: description,
      type: item ? 'CHILD' : 'PARENT',
      checklist_id: item ? item.id : null
    });
  }
  /**
   * Upload a new attachment for entity
   * @param {number} entityId
   * @param {EntityType} entityType
   * @param {File} file
   * @return {Observable}
   */
  uploadNewAttachmentForEntity(entityId: number, entityType: EntityType, file: File): Observable<any> {
    const formData = new FormData();
    formData.set('entity_id', entityId.toString());
    formData.set('entity_type', entityType);
    formData.set('file', file, file.name);
    return this.http.post(AppConfig.endpoints.uploadFile, formData);
  }
  /**
   * Create new comment for entity
   * @param {number} entityId
   * @param {EntityType} entityType
   * @param {string} comment
   * @return {Observable}
   */
  createNewComment(entityId: number, entityType: EntityType, comment: string): Observable<any> {
    return this.http.post(AppConfig.endpoints.createcomment, {
      entity_id: entityId,
      entity_type: entityType,
      comment: comment
    });
  }
  /**
   * Update checklist description
   * @param {number} checklistId
   * @param {string} description
   * @return {Observable}
   */
  updateChecklistDescription(checklistId: number, description: string): Observable<any> {
    return this.http.post(AppConfig.endpoints.updateChecklist, {
      checklist_id: checklistId,
      description: description
    });
  }
  /**
   * Create a new activity
   * @param {number} containerId
   * @param {string} description
   * @param {number} activityId
   * @param {number} ticketId
   * @param {string} name
   * @param {number} stateId
   * @param {number} priorityId
   * @return {Observable}
   */
  createNewActivity(containerId: number, description?: string, activityId?: number, ticketId?: number, name?: string, stateId?: number, priorityId?: number): Observable<any> {
    return this.http.post(AppConfig.endpoints.createActivity, {
      activity_id: activityId,
      ticket_id: ticketId,
      name: name,
      state_id: stateId,
      priority_id: priorityId,
      container_id: containerId,
      description: description
    });
  }
  /**
   * Load members to assign
   * @param {number} entityId
   * @param {EntityType} entityType
   * @return {Observable}
   */
  loadMembersToAssign(entityId: number, entityType: EntityType): Observable<any> {
    return this.http.get(AppConfig.endpoints.getAssignMember(entityId, entityType));
  }
  /**
   * Load members to assign for reloading data
   * @param {number} entityId
   * @param {EntityType} entityType
   * @return {Observable}
   */
  loadMembers(entityId: number, entityType: EntityType): Observable<any> {
    return this.http.get(AppConfig.endpoints.getMembers(entityId, entityType));
  }
  /**
   * Assign a new user to entity
   * @param {number} entityId
   * @param {EntityType} entityType
   * @param {string} role
   * @param {number} userId
   * @param {boolean} assigned
   * @return {Observable}
   */
  assignNewUser(entityId: number, entityType: EntityType, role: string, userId: number, assigned: boolean): Observable<any> {
    return this.http.post(AppConfig.endpoints.assignNewUser, {
      entity_id: entityId,
      user_id: userId,
      role: role,
      entity_type: entityType,
      assigned
    });
  }
  /**
   * Add tracked time to activity
   * @param {number} activityId
   * @param {number} min
   * @return {Observable}
   */
  addTrackedTimeToActivity(activityId: number, min: number): Observable<any> {
    return this.http.post(AppConfig.endpoints.addTrackedTime, {
      activity_id: activityId,
      time: min * 60
    });
  }
  /**
   * Load logs for entity
   * @param {number} entityId
   * @param {EntityType} entityType
   * @param {number} page
   * @param {number} pageSize
   * @return {Observable}
   */
  loadEntityLogs(entityId: number, entityType: EntityType, page: number, pageSize: number): Observable<any> {
    return this.http.get(AppConfig.endpoints.loadLogs(entityId, entityType, page, pageSize));
  }
  /**
   * Delete checklist
   * @param {number} checklistId
   * @return {Observable}
   */
  deleteChecklist(checklistId: number): Observable<any> {
    return this.http.post(AppConfig.endpoints.deleteChecklist, {
      id: checklistId
    });
  }
  /**
   * Map activity to configuration
   * @param {ActivityInterface} activity
   * return {DetailsConfig}
   */
  public mapActivityToConfig(activity: ActivityInterface): DetailsConfig {
    const statistics = this.configService.getConfigs();
    return {
      path: activity.container.folder.parent.name + ' > ' + activity.container.folder.name + ' > ' + activity.container.name,
      parentActivityId: activity.parentActivityId,
      states: statistics ? statistics.activity_states : [],
      selectedStates: activity.state,
      selectedPriority: activity.priority,
      assignedUser: activity.assignedUsers,
      testers: [],
      priorities: statistics ? statistics.priorities : [],
      creationDate: activity.createdAt,
      trickedTime: activity.tracked_time,
      title: activity.name,
      description: activity.description,
      activities: activity.subActivities,
      checkList: activity.checkList,
      attachments: activity.attachments,
      comments: activity.comments,
      destination: null,
      problemArea: null,
      entityId: activity.id,
      entityType: EntityType.ACTIVITY,
      logs: activity.activity_logs,
      logsCount: activity.logs_count,
      isValid: true
    };
  }
  /**
   * Map ticket to configuration
   * @param {TicketInterface} ticket
   * @return {DetailsConfig}
   */
  mapTicketToConfig(ticket: TicketInterface): DetailsConfig {
    const statistics = this.configService.getConfigs();
    return {
      path: '',
      parentActivityId: null,
      states: statistics ? statistics.ticket_states : [],
      selectedStates: ticket.state,
      selectedPriority: ticket.priority,
      assignedUser: ticket.assignedUsers,
      testers: [],
      priorities: statistics ? statistics.priorities : [],
      creationDate: ticket.createdAt,
      trickedTime: ticket.tracked_time,
      title: ticket.subject,
      description: ticket.description,
      activities: ticket.activities,
      checkList: ticket.checkList,
      attachments: ticket.attachments,
      comments: ticket.comments,
      destination: ticket.group ? ticket.group.name : '',
      problemArea: ticket.problem_area,
      entityId: ticket.id,
      entityType: EntityType.TICKET,
      logs: ticket.ticket_logs,
      logsCount: ticket.logs_count,
      isValid: ticket.is_valid
    };
  }
  /**
   * Map entity logs key
   * @param {string} logKey
   * @return {value}
   */
  getDescriptionOfLogByLogKey(logKey: string): string {
    if (this.logsKeyMap[logKey]) {
      return this.logsKeyMap[logKey];
    } else {
      return '';
    }
  }

  pushRoute(entityData) {
    this.stackArray.push(entityData);
    console.log('all routes', this.stackArray);
  }

  getPrevRoute() {
    console.log('all routes', this.stackArray);
    return this.stackArray[this.stackArray.length - 2];
  }

  flushRoute() {
    return this.stackArray = [];
  }

  isRouteExsist(route) {
    const index = this.stackArray.findIndex(item => (item.eId === route.eId && item.eType === route.eType)); 
    if (index > -1) {
       return true;
    }
    return false;
  }

  deleteAttachment(attachmentId){
    return this.http.post(AppConfig.endpoints.deleteAttachment,{file_id: attachmentId});
  }

}
