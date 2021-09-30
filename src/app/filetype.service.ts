import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FiletypeService {

  private baseUrl = 'http://localhost:8080/filetype/';

  private filestorageBaseUrl = 'http://localhost:8080/filestorage';

  constructor(private http:HttpClient) { }

  getFiletypeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'filetype-list');
  }

  createFiletype(filetype: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-filetype', filetype);
  }

  deleteFiletype(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-filetype/${id}`, { responseType: 'text' });
  }

  getFiletype(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/filetype/${id}`);
  }

  updateFiletype(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-filetype/${id}`, value);
  }

  getHeaders(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'map-filetype');
  }

  getFilemappingList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'filemapping-list');
  }

  getFilemapping(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/filemapping/${id}`);
  }

  updateFilemapping(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-filemapping/${id}`, value);
  }

  getAllFiletypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'get-all-filetypes');
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.filestorageBaseUrl}/files`);
  }

  getFileHeaders(): Observable<any> {
    return this.http.get(`${this.filestorageBaseUrl}/fileHeaders`);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file',file);

    const req = new HttpRequest('POST', `${this.filestorageBaseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}                                           