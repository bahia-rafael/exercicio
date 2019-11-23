import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { APIService } from '../util/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.page.html',
  styleUrls: ['./form-user.page.scss'],
})
export class FormUserPage implements OnInit {

  pessoa = {
    id_pessoa: "",
    rua: "",
    nome: "",
    bairro: "",
    setor: "",
    login: "",
    regiao: ""
  };

  perfil: string;

  ListPerfil: string[] = [];

  isLoading = false;

  nome: string;

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController, public loadingController: LoadingController, private dao: APIService) {

    this.nome = this.route.snapshot.paramMap.get('nome');

    this.getTipoUser();
    this.getPessoa();
  }

  ngOnInit() {

  }

  getPessoa() {
    this.present();

    this.dao.selectPessoa(this.nome)
      .then((result: any) => {

        this.pessoa = {
          id_pessoa: result.pessoa[0].id_pessoa,
          rua: result.pessoa[0].rua,
          nome: result.pessoa[0].nome,
          bairro: result.pessoa[0].bairro,
          setor: result.pessoa[0].setor,
          login: result.pessoa[0].login,
          regiao: result.pessoa[0].regiao,
        };

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
  }

  getTipoUser() {

    this.dao.selectTipoUser()
      .then((result: any) => {

        for (var i = 0; i < result.pessoa.length; i++) {

          var perfil = result.pessoa[i].nome_tipo;
          this.ListPerfil.push(perfil);
        }

        (<HTMLSelectElement>document.getElementsByName('selectPerfil')[0]).value = 'cliente';

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
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

  removeUser() {

    this.present();

    this.dao.deleteUser(this.pessoa.id_pessoa)
      .then((result: any) => {
        document.getElementsByTagName('ion-back-button')[0].click();
        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
  }

  openViewUser() {
    this.router.navigate(['/view-user', { id_pessoa: this.pessoa.id_pessoa }]);
  }

  selectPerfil(event) {

    if ((<HTMLSelectElement>document.getElementsByName('selectPerfil')[0]).value != 'cliente') {
      document.getElementsByName('botaoCadastrar')[0].style.display = '';
    }
  }

  logForm() {
    this.perfil = (<HTMLSelectElement>document.getElementsByName('selectPerfil')[0]).value;

    this.present();

    this.dao.updateTipoUser(this.pessoa.id_pessoa, this.perfil)
      .then((result: any) => {

        this.alertFunc('Sucesso', 'Perfil alterado!');

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
  }
}
