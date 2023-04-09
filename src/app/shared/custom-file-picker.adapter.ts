import { apiConfig } from './../config/constants';
import { AppConfig } from './../config/app.config';
import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import {
  FilePickerAdapter,
  UploadResponse,
  UploadStatus,
  FilePreviewModel
} from "ngx-awesome-uploader";

export class CustomFilePickerAdapter extends FilePickerAdapter {
  id = '32';
  cod = false;
  constructor(private http: HttpClient) {
    super();
  }


  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    return of({ status: UploadStatus.UPLOADED, body: fileItem });
  }


  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    return of({ status: UploadStatus.UPLOADED, body: fileItem });
  }
}
