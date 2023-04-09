import { element } from 'protractor';
import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { CommentService } from 'src/app/services/Comment.service';
import { LogInterface } from '../../models/details-models';
import { EntityService } from '../../../services/entity.service';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

  @Input() logs: LogInterface[];
  @Input() canAddComment: boolean;
  timezone: any;
  trace: any[];
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() commentCreated = new EventEmitter<string>();
  @Output() loadMore = new EventEmitter<any>();
  haveLogs: boolean;
  faRedoAlt = faRedoAlt;

  constructor(
    private entityService: EntityService
  ) {
}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.logs) {
      this.getLogsDescrition();
    }
    if (changes.currentPage) {
      this.haveLogs = this.currentPage < this.totalPages;
    }
  }

  createComment(comment: any): void {
    this.commentCreated.emit(comment.value);
    comment.value = null;
  }

  private getLogsDescrition() {
    if (!this.logs) {
      this.logs = [];
    }
    this.logs.forEach((log) => {
      log.desc = this.entityService.getDescriptionOfLogByLogKey(log.log_type);
    });
  }
  loadMoreComment(): void {
    this.loadMore.emit();
  }

}
