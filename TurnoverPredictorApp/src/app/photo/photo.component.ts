import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  uploader: FileUploader;
  fileToUpload: FileList;
  user: User;
  url: any;
  userId: number;
  showUpload: boolean;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private authService: AuthService, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.refresh();
  }

  // tslint:disable-next-line: typedef
  initializeUploader() {
    console.log('init uploader');
    this.uploader = new FileUploader({
      url: 'http://localhost:5000/api/users/' + this.userId + '/photos' ,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: any = JSON.parse(response);
        console.log(res);
        this.showUpload = false;
        this.refresh();
      }
    };
  }

  // tslint:disable-next-line: typedef
  getImageService() {
    return this.http.get ('http://localhost:5000/api/users/' + this.userId + '/photos', {responseType: 'text'});
  }

  // tslint:disable-next-line: typedef
  getImage() {
    console.log('get image');
    this.getImageService().subscribe((url: string) => {
      this.url = url;
      console.log(this.url);
    }, error => {
      console.log(error);
    });
  }
  refresh(): void {
    this.userId = this.authService.currentUser.id;
    this.user = this.authService.currentUser;
    this.url = null;
    this.getImage();
    this.initializeUploader();
  }
}

