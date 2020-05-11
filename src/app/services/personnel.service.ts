import { Injectable } from '@angular/core';
import { Personnel } from '../models/personnel.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  personnel: Personnel[] = [];
  personnelSubject = new Subject<Personnel[]>();

  constructor(private http: HttpClient) { }

  emitPersonnel(){
    this.personnelSubject.next(this.personnel);
  }


  savePersonnel(personnel: Personnel){
    console.log(personnel);
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/personnel', personnel).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  savePersonnelWithFile(personnel: Personnel, image: File) {
    return new Promise((resolve, reject) => {
      const personnelData = new FormData();
      personnelData.append('personnel', JSON.stringify(personnel));
      personnelData.append('image', image, personnel.prenom);
      this.http.post('http://localhost:3000/api/personnel', personnelData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPersonnel(id: string, personnel: Personnel){
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/personnel/' + id, personnel).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPersonnelWithFile(id: string, personnel: Personnel, image: File | string) {
    return new Promise((resolve, reject) => {
      let personnelData: Personnel | FormData;
      if (typeof image === 'string') {
        personnel.imageUrl = image;
        personnelData = personnel;
      } else {
        personnelData = new FormData();
        personnelData.append('personnel', JSON.stringify(personnel));
        personnelData.append('image', image, personnel.prenom);
      }
      this.http.put('http://localhost:3000/api/personnel/' + id, personnelData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getPersonnelById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/personnel/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAllPersonnel() {
    this.http.get('http://localhost:3000/api/personnel').subscribe(
      (personnel: Personnel[]) => {
        if (personnel) {
          this.personnel = personnel;
          this.emitPersonnel();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePersonnel(personnel: Personnel){}

}


