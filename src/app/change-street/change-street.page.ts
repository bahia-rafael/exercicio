import { Util } from './../util/util';
import { Motorista } from './../util/motorista';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { APIService } from '../util/api.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ViewUserPage } from '../view-user/view-user.page';

@Component({
  selector: 'app-change-street',
  templateUrl: './change-street.page.html',
  styleUrls: ['./change-street.page.scss'],
})
export class ChangeStreetPage implements OnInit {

  bairro: string;

  cidade: string;

  rua: string;


  isLoading = false;

  ListCidade: string[] = [];

  ListBairro: string[] = [];

  ListRua: string[] = [];

  pessoa = {
    id_pessoa: 0,
    bairro: "",
    rua: "",
    cidade: ""
  };

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController, public loadingController: LoadingController, private dao: APIService) {

    this.pessoa.id_pessoa = +this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.selectCity();
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

  selectBairro(event) {

    this.ListBairro = [];
    this.ListRua = [];

    this.cidade = event.detail.value;

    this.present();

    this.dao.selectBairro(this.cidade)
      .then((result: any) => {

        for (var i = 0; i < result.endereco.length; i++) {
          var bairro = result.endereco[i].bairro;
          this.ListBairro.push(bairro);
        }

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })

    document.getElementsByName('gridBairro')[0].style.display = '';

  }

  selectCity() {

    this.present();

    this.dao.selectCidade()
      .then((result: any) => {

        for (var i = 0; i < result.endereco.length; i++) {
          var cidade = result.endereco[i].cidade;
          this.ListCidade.push(cidade);
        }

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
  }

  selectStreet(event) {

    this.ListRua = [];

    document.getElementsByTagName('ion-select')[2].value = '';

    this.bairro = event.detail.value;

    this.present();

    this.dao.selectStreet(this.cidade, this.bairro)
      .then((result: any) => {
        for (var i = 0; i < result.endereco.length; i++) {
          var rua = result.endereco[i].rua;
          this.ListRua.push(rua);
        }

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })

    document.getElementsByName('gridRua')[0].style.display = '';
  }

  mostrarLabel(nameLabel: string, name: string) {
    // Capta o valor do Input para saber se esta vazio ou não
    var conteudo = (<HTMLInputElement>document.getElementsByName(name)[0]).value;

    // Verifica o conteudo, se for vazio ele não mostra o Label
    if (conteudo == "") {

      document.getElementsByName(nameLabel)[0].style.display = 'none';
    } else {
      document.getElementsByName(nameLabel)[0].style.display = '';

      if (nameLabel == 'labelSenha') {
        document.getElementsByName('gridCidade')[0].style.display = '';
      }
    }
  }

  logForm() {
    this.pessoa.rua = this.rua;
    this.pessoa.bairro = this.bairro;
    this.pessoa.cidade = this.cidade;

    this.present();

    this.dao.updatePessoa(this.pessoa)
      .then((result: any) => {
        this.alertFunc('Sucesso!', 'Endereço alterado!');
      })
      .catch((error: any) => {
        this.router.navigate(['/view-user', { id_pessoa: this.pessoa.id_pessoa, refresh: true }]);

      });

    this.dismiss();
  }

  releaseAdd(event) {

    this.rua = event.detail.value;

    if (this.rua != "") {
      document.getElementsByName('botaoCadastrar')[0].style.display = '';
    }
  }

  async alertFunc(title: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: title,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
