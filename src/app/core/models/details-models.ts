export interface StateInterface {
  id: number;
  key: number;
  label: string;
  color: string;
}
export interface PriorityInterface {
  id?: number;
  key?: string;
  label?: string;
  color?: string;
}
export interface UserInterface {
  id: number;
  name: string;
  surname: string;
  tipo: string;
  tipologia: string;
  email: string;
  phone: string;
  selected?: boolean;
}
export interface FullUserInterface {
  user: UserInterface;
  role?: string;
  createdAt?: string;
}
export interface GroupInterface {
  id: number;
  name: string;
  userId: number;
}
export interface CheckListInterface {
  id: number;
  entity_id: number;
  description: string;
  checkedBy: UserInterface;
  checked: boolean;
  children: CheckListInterface[];
  allChildCount: number;
  checkedChildCount: number;
}
export interface AttachmentInterface {
  id: number;
  filePath: string;
  filename: string;
  createdAt: string;
}
export interface CommentInterface {
  id: number;
  user: UserInterface;
  comment_body: string;
  createdAt: string;
}
export interface LogInterface {
  id: number;
  from_user: UserInterface;
  to_user: UserInterface;
  log_type: string;
  log_value: string;
  createdAt: string;
  desc?: string;
}
export interface ContainerInterface {
  id: number;
  name: string;
  folder: FolderInterface
}
export interface FolderInterface {
  id: number;
  parent: FolderInterface;
  name: string;
}
export interface ActivityInterface {
  id: number;
  container: ContainerInterface;
  ticket_id: number;
  parentActivityId: number;
  user: UserInterface;
  name: string;
  description: string;
  type: string;
  state: StateInterface;
  priority: PriorityInterface;
  start_date: string;
  end_date: string;
  createdAt: string;
  assignedUsers: FullUserInterface[] | any;
  checkList: CheckListInterface[];
  attachments: AttachmentInterface[];
  all_children: number;
  all_completed_children: number;
  total_sub_activities: number;
  completed_sub_activities: number;
  total_checkList_items: number;
  checked_checklist_items: number;
  progress: number;
  tracked_time: string;
  activity_logs: LogInterface[];
  subActivities: ActivityInterface[];
  comments: CommentInterface[];
  logs_count: number;
}
export interface TicketInterface {
  id: number;
  subject: string;
  link: string;
  description: string;
  problem_area: string;
  createdAt: string;
  state: StateInterface;
  priority: PriorityInterface;
  contact: UserInterface;
  group: GroupInterface;
  activities: ActivityInterface[];
  checkList: CheckListInterface[];
  comments: CommentInterface[];
  attachments: AttachmentInterface[];
  progress: number;
  is_valid: boolean;
  ticket_logs: LogInterface[];
  tracked_time: string;
  assignedUsers: FullUserInterface[];
  logs_count: number;
}
export enum EntityType {
  ACTIVITY = 'ACTIVITY',
  SUB_ACTIVITY = 'SUB_ACTIVITY',
  TICKET = 'TICKET'
}
export interface DetailsConfig {
  path: string;
  parentActivityId: Number;
  states: StateInterface[];
  selectedStates: StateInterface;
  assignedUser: FullUserInterface[];
  testers: UserInterface[];
  priorities: PriorityInterface[];
  selectedPriority: PriorityInterface;
  creationDate: string;
  trickedTime: string;
  title: string;
  description: string;
  activities: ActivityInterface[];
  checkList: CheckListInterface[];
  attachments: AttachmentInterface[];
  comments: CommentInterface[];
  destination: string;
  problemArea: string;
  entityId: number;
  entityType: EntityType;
  logs: LogInterface[];
  logsCount: number;
  isValid: boolean;
} 