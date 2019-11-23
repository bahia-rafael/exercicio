import { APIService } from '../util/api.service';
import { Usuario } from '../util/usuario';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})
export class CadastroUserPage implements OnInit {

  user: Usuario = {
    nome: "",
    login: "",
    senha: "",
    rua: "",
    bairro: "",
    cidade: ""
  };

  isLoading = false;

  ListCidade: string[] = [];

  ListBairro: string[] = [];

  ListRua: Street[] = [];

  bairro: string;

  cidade: string;

  rua: string;

  constructor(public alertController: AlertController, public loadingController: LoadingController, private dao: APIService) { }

  ngOnInit() {
    this.selectCity();

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
          this.ListRua.push(new Street(result.endereco[i].rua, result.endereco[i].id_rua));
        }

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })

    document.getElementsByName('gridRua')[0].style.display = '';
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

  logForm() {

    this.user.rua = this.rua;
    this.user.bairro = this.bairro;
    this.user.cidade = this.cidade;

    console.log(this.user);

    this.present();

    this.dao.insertPessoa(this.user)
      .then((result: any) => {
        this.alertFunc('Sucesso!', 'Usuario cadastrado!');
      })
      .catch((error: any) => {
        this.alertFunc('Sucesso!', 'Usuario cadastrado!');
      });

    this.dismiss();
  }

  async alertFunc(title: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: title,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
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

  releaseAdd(event) {

    this.rua = event.detail.value;

    if (this.rua != "") {
      document.getElementsByName('botaoCadastrar')[0].style.display = '';
    }
  }
}

class Street {

  _name: string;
  _id: number;

  constructor(name: string, id: number) {
    this._name = name;
    this._id = id;
  }

}