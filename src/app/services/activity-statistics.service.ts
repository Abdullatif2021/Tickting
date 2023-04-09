import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { ApiInterface } from '../core/models/api-interface';

@Injectable({
  providedIn: 'root'
})

export class ActivityStatisticsService {

  constructor(
    private http: HttpClient
  ) { }

  getActivitySatistics(): Observable<any> {
    return this.http.get<ApiInterface>(AppConfig.endpoints.getActivitiesSatistics);
  }

  getsubfolders(id, container): Observable<any> {
    const options = { params: new HttpParams() };
    options.params = options.params.set('id', id);
    if (container) {
      options.params = options.params.set('type', 'CONTAINER');
    }
    return this.http.get<ApiInterface>(AppConfig.endpoints.getSubfolders, options);
  }

  /**
   * Request to create a new folder or sub folder.
   * @public
   * @param {string} name
   * @param {number} folderId
   * @return {Observable<ApiInterface>}
   */
  createFolder(name: string, folderId?: number): Observable<ApiInterface> {
    return this.http.post<ApiInterface>(AppConfig.endpoints.createFolder, {
      folder_name: name,
      folder_id: folderId,
      type: folderId ? 'CHILD' : null
    });
  }
  /**
   * Request to create a new folder or sub folder.
   * @public
   * @param {string} folder_type
   * @param {number} folder_id
   * @return {Observable<ApiInterface>}
   */
  deleteFolder(folder_id: number, folder_type: string): Observable<ApiInterface> {      
    return this.http.post<ApiInterface>(AppConfig.endpoints.deleteFolder, {
      folder_id: folder_id,
      folder_type: folder_type,
    });
  }
  /**
   * Request create a new container.
   * @public
   * @param {string} name
   * @param {number} subFolderId
   * @return {Observable<ApiInterface>}
   */
  createContainer(name: string, subFolderId: number): Observable<ApiInterface> {
    return this.http.post<ApiInterface>(AppConfig.endpoints.createContainer, {
      container_name: name,
      folder_id: subFolderId,
      type: 'CHILD'
    });
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('');
  }

}
