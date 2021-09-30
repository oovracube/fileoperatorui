import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileitemService {

  private baseUrl = 'http://localhost:8080/fileitem/';

  constructor(private http:HttpClient) { }

  getFileitemList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'fileitem-list');
  }

  createFileitem(fileitem: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-fileitem', fileitem);
  }

  deleteFileitem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-fileitem/${id}`, { responseType: 'text' });
  }

  getFileitem(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/fileitem/${id}`);
  }

  updateFileitem(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-fileitem/${id}`, value);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    })
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`)

  }

  getFileHeaders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fileHeaders`)

  }
}                                           