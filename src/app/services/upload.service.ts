import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  uploadFile(data): Observable<any> {
    // const formData: FormData = new FormData();
    // formData.append("file", fileToUpload, fileToUpload.name);
    // formData.append("entity_id", entity_id);
    // formData.append("entity_type", entity_type)
    return this.http.post(AppConfig.endpoints.uploadFile1, data)
  }

}
