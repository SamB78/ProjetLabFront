import { Component, OnInit, OnDestroy } from '@angular/core';
import { Personnel } from '../models/personnel.model';
import { Subscription } from 'rxjs';
import { PersonnelService } from '../services/personnel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit, OnDestroy {

  personnel: Personnel[];
  personnelSubscription: Subscription;

  constructor(private personnelService: PersonnelService, private router: Router) { }

  ngOnInit(): void {

    this.personnelSubscription = this.personnelService.personnelSubject.subscribe(
      (personnel: Personnel[]) => {
        this.personnel = personnel;
        console.log(personnel);
      }
    );
    this.personnelService.emitPersonnel();
    this.personnelService.getAllPersonnel();
  }

  onNewPersonnel(){
    this.router.navigate(['/personnel', 'new']);
  }

  onDeletePersonnel(personnel: Personnel){
    this.personnelService.deletePersonnel(personnel);
  }

  onViewPersonnel(id: number) {
    this.router.navigate(['/personnel', 'view', id]);
  }


  ngOnDestroy(){
    this.personnelSubscription.unsubscribe();
  }

}
