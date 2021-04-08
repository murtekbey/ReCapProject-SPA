import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/entities/carImage';
import { ResponseModel } from 'src/app/models/responseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.css'],
})
export class CarImagesComponent implements OnInit {
  carImages: CarImage[] = [];
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  currentMain: CarImage;
  currentCar: any;
  tokenModel: TokenModel = this.localStorageService.get('tokenModel');
  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentCar = params['carId'];
    });
    this.initializeUploader();
  }

  openXl(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      animation: true,
      centered: true,
      size: 'lg',
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: environment.apiUrl + 'carimages/add',
      isHTML5: true,
      additionalParameter: { carId: this.currentCar },
      authToken: 'Bearer ' + this.tokenModel.token,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: ResponseModel = JSON.parse(response);
        this.toastrService.success(res.message, 'Başarılı');
        console.log(response);
      }
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      if (response) {
        const res: ResponseModel = JSON.parse(response);
        this.toastrService.error(res.message, 'Uyarı');
        console.log(response);
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
