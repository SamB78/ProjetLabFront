import { Component, OnInit } from '@angular/core';
import { Personnel } from 'src/app/models/personnel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-single-personnel',
  templateUrl: './single-personnel.component.html',
  styleUrls: ['./single-personnel.component.scss']
})
export class SinglePersonnelComponent implements OnInit {

  personnel: Personnel;

  constructor(private route: ActivatedRoute,
              private personnelService: PersonnelService,
              private router: Router) { }

  ngOnInit(): void {
    this.personnel = new Personnel ('', '', '', '', false, false, '');
    const id = this.route.snapshot.params.id;
    this.personnelService.getPersonnelById(id).then(
      (personnel: Personnel) => {
        this.personnel = personnel;
      }
    );
  }

  onBack() {
    this.router.navigate(['/personnel']);
  }
}
