import { Motorista } from './../util/motorista';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { APIService } from '../util/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../util/util';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

  isLoading = false;

  pessoa = {
    id_pessoa: "",
    data: "",
    nome: "",
    bairro: "",
    setor: "",
    rua: "",
    motorista: ""
  };

  Flagrefresh: string = "";

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController, public loadingController: LoadingController, private dao: APIService) {

    this.pessoa.id_pessoa = this.route.snapshot.paramMap.get('id_pessoa');

  }

  refreshPage(){
    window.location.reload();
  }

  ngOnInit() {

    this.getPessoa();

  }

  async present() {

    this.isLoading = true;

    return await this.loadingController.create({

    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async alertFunc(title: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: title,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  getPessoa() {
    this.present();

    this.dao.getPessoa(this.pessoa.id_pessoa)
      .then((result: any) => {

        console.log(result);
        
        this.pessoa = {
          id_pessoa: this.pessoa.id_pessoa,
          rua: result.pessoa[0].rua,
          nome: result.pessoa[0].nome,
          bairro: result.pessoa[0].bairro,
          setor: result.pessoa[0].setor,
          motorista: result.pessoa[0].motorista,
          data: new Util().parseDate(result.pessoa[0].data),
        };

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
  }

  openNextColeta() {
    this.router.navigate(['/next-coleta', { setor: this.pessoa.setor }]);
  }

  openChangeStreet() {
    this.router.navigate(['/change-street', { id: this.pessoa.id_pessoa, cidade: 'SALVADOR', bairro: this.pessoa.bairro, rua: this.pessoa.rua }]);
  }

}
