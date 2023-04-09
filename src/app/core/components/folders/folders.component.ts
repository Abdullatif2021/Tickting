import { Component, Input, OnChanges, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivityStatisticsService } from 'src/app/services/activity-statistics.service';
import { faEllipsisH, faEllipsisV, faFolderOpen, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { NameInputDialogComponent } from '../../../shared/dialogs/name-input-dialog/name-input-dialog.component';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiInterface } from '../../models/api-interface';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AlertDialogComponent } from 'src/app/shared/dialogs/alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface TreeNode {
  id: number;
  folderName: string;
  children?: any;
  type?: string;
  parentId?: number;
}

export enum ItemType {
  FOLDER = 'folder',
  SUB_FOLDER = 'sub_folder',
  CONTAINER = 'container'
}

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})

export class FoldersComponent implements OnInit, OnChanges, OnDestroy {

  @Input() title: string;
  @Input() dataSource: any = [];
  @Output() itemClicked = new EventEmitter();
  folders_tree: TreeNode[] = [];
  folders = [];
  current_folders = [];

  faFolderOpen = faFolderOpen;
  faFolder = faFolder;
  faPlus = faPlus;
  faTimes = faTimes;
  faTrashAlt = faTrashAlt;
  faEllipsisH = faEllipsisH;
  isOpen = false;
  subject: Subject<ApiInterface> = new Subject<ApiInterface>();
  search = faSearch;

  constructor(
    private ActivityStatisticsService: ActivityStatisticsService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes) {
    if (changes.dataSource)
      this.renderFolders();
  }

  getSubFolders(id, container) {
    if (id) {
      this.ActivityStatisticsService.getsubfolders(id, container).subscribe(resposne => {
        if (container) {
          this.renderContainer(resposne.data);
        } else {
          this.renderSubFolders(resposne.data);
        }
      });
    }
  }

  renderFolders() {
    if (this.dataSource) {
      this.dataSource.forEach(item => {
        this.folders_tree.push({
          id: item.folder.id,
          folderName: item.folder.name,
          children: [],
          type: ItemType.FOLDER
        });
      });
    }
    this.folders = this.folders_tree;
  }

  renderSubFolders(subfolders) {
    if (subfolders) {
      subfolders.forEach(subFolder => {
        if (this.current_folders.indexOf(subFolder.folder.id) == -1) {
          this.folders_tree.find(item => item.id === subFolder.folder.folder_id).children.push({
            id: subFolder.folder.id,
            folderName: subFolder.folder.name,
            children: [],
            type: ItemType.SUB_FOLDER,
            parentId: subFolder.folder.folder_id
          });
          this.current_folders.push(subFolder.folder.id);
        }
        this.folders = this.folders_tree;
      });
    }
  }

  whenClickItem(item: any, container): void {
    if (item.type != 'container' && item.id) {
      this.getSubFolders(item.id, container);
    }
    this.itemClicked.emit(item);
  }

  renderContainer(containers): void {
    if (containers) {
      containers.forEach(container => {
        // Get sub folder.
        const mainFolder = this.folders.find(folder => {
          return folder.children.find((sub) => sub.id === container.container.folder.id);
        });
        const subFolder = mainFolder.children.find((sub) => sub.id === container.container.folder.id);
        //subFolder.children = [];
        console.log(subFolder.children.find(containerItem => containerItem.id === container.id));
        //check already assigned containers for duplications
        const alreadyContainers = subFolder.children.find(containerItem => containerItem.id === container.container.id); 
        if (!alreadyContainers) {
          subFolder.children.push({
            id: container.container.id,
            folderName: container.container.name,
            children: [],
            type: ItemType.CONTAINER,
            parentId: subFolder.id
          });
        }
      });
    }
  }

  /**
   * Open dialog to insert name for a new folder
   * @public
   * @param {TreeNode} item
   * @return {void}
   */
  openCreateDialog(item: TreeNode): void {
    this.dialog.open(NameInputDialogComponent, {
      width: '40%',
      data: {
        keys: [{
          key: 'name',
          value: null,
          visible: true,
          validators: [Validators.required],
          label: 'Name',
          placeHolder: 'name',
        }],
        title: 'Insert name'
      }
    }).afterClosed().subscribe((data) => {
      if (data && data.name) {
        (item && item.type === ItemType.SUB_FOLDER) ? this.createANewContainer(item, data.name) : this.createANewItem(item, data.name);
      }
    });
  }
  /**
  * Open dialog to delete folder
  * @public
  * @param {TreeNode} item
  * @return {void}
  */
  openDeleteDialog(item: TreeNode): void {
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: this.translate.instant('core.dialogs.deleteFolder', { folderName: item.folderName })
      }
    })
      .afterClosed().subscribe((data) => {
        if (data) {

          let folder_type = null;
          let message = '';

          if (item.type == ItemType.FOLDER) {
            folder_type = 'MAIN';
            message = this.translate.instant('core.dialogs.youHaveToDelete', { type: 'sub folders' });
          }
          else if (item.type == ItemType.SUB_FOLDER) {
            folder_type = 'CHILD';
            message = this.translate.instant('core.dialogs.youHaveToDelete', { type: 'containers' });
          }
          else {
            folder_type = 'CONTAINER';
            message = this.translate.instant('core.dialogs.haveActivities');
          }

          this.ActivityStatisticsService.deleteFolder(item.id, folder_type).subscribe(response => {
            console.log('folders', this.folders);
            if (response.success) {
              // get index of object with id:37
              var removeIndex = 0;
              // remove object
              if (item.type == ItemType.FOLDER) {
                removeIndex = this.folders.map(function (i) { return i.id; }).indexOf(item.id);
                this.folders.splice(removeIndex, 1);//remove object from array
              }
              else if (item.type == ItemType.SUB_FOLDER) {
                removeIndex = this.folders.map(function (i) { return i.children.id; }).indexOf(item.id);
                this.folders.forEach(folder => {
                  folder.children.splice(removeIndex, 1);//remove object from array
                });
              } else {
                this.remoreContainerFromArray(item.id); //remove container from folder array
                console.log(this.folders);
              }
              this.openSnackBar(this.translate.instant('core.dialogs.success'), 'green-snackbar');
            } else {
              this.openSnackBar(message, 'red-snackbar');
            }
          }, error => {
            console.log('Error => ', error);
          });


        }

      });
  }

  openSnackBar(message: string, style) {
    this._snackBar.open(message, '', {
      duration: 50000,
      horizontalPosition: 'end',
      panelClass: [style],
    });
  }

  remoreContainerFromArray(id) {
    this.folders.forEach(function (folder) {
      folder.children.forEach(function (subfolder) {
        subfolder.children.forEach(function (container, index, object) {
          if (container.id === id) {
            object.splice(index, 1);
          }
        });
      });
    });
  }

  /**
   * Call api to create a new folder or sub folder or container.
   * @public
   * @param {TreeNode} item
   * @param {string} name
   * @return {void}
   */
  createANewItem(item: TreeNode, name: string): void {
    // value to check if you create a new folder or sub folder
    const createFolder = !item;
    this.ActivityStatisticsService.createFolder(name, createFolder ? null : item.id).pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          if (createFolder) {
            this.folders.push({
              id: results.data.id,
              folderName: results.data.name,
              children: [],
              type: ItemType.FOLDER
            });
          } else {
            /* const itemToChange = this.folders.find((folder => folder.id === results.data.folder_id));
            itemToChange.children.push({
              id: results.data.id,
              folderName: results.data.name,
              children: [],
              type: ItemType.SUB_FOLDER,
              parentId: results.data.folder_id
            }); */
          }
        },
        error => {
          console.log('Error => ', error);
        }
      );
  }
  /**
   * Create a new container
   * @param {TreeNode} subFolder
   * @param {string} name
   * @return {void}
   */
  createANewContainer(subFolder: TreeNode, name: string): void {
    this.ActivityStatisticsService.createContainer(name, subFolder.id).pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          // Get folder.
          const folder = this.folders.find(fold => fold.id === subFolder.parentId);
          // Get sub folder
          const sub = folder.children.find(child => child.id === subFolder.id);
          sub.children.push({
            id: results.data.id,
            folderName: name,
            type: ItemType.CONTAINER,
            parentId: sub.id,
            children: []
          });
          console.log('Folders => ', this.folders);
        }, error => {
          console.log('ERROR => ', error);
        }
      );
  }
  /**
   * When component destroyed
   * @return {void}
   */
  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
