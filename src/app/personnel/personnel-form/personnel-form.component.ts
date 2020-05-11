import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { PersonnelService } from 'src/app/services/personnel.service';
import { Router } from '@angular/router';
import { Personnel } from 'src/app/models/personnel.model';

@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.scss']
})
export class PersonnelFormComponent implements OnInit {

  personnelForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private personnelService: PersonnelService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.personnelForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      numeroContact: ['', Validators.required]
      // mailContact: ['', Validators.required]
    });

  }

  onSavePersonnel() {
    const prenom = this.personnelForm.get('prenom').value;
    const nom = this.personnelForm.get('nom').value;
    const numeroContact = this.personnelForm.get('numeroContact').value;

    const newPersonnel = new Personnel(prenom, nom, numeroContact, 'test@gmail.com', true, false, 'test');
    this.personnelService.savePersonnel(newPersonnel);
    this.router.navigate(['/personnel']);
  }


}
