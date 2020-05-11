export class Personnel {
  photo: string;
  // tslint:disable-next-line:max-line-length
  constructor(public prenom: string, public nom: string, public numeroContact: string, public mailContact: string, public chefChantier: boolean, public interimaire: boolean, public imageUrl: string ) {}
}
