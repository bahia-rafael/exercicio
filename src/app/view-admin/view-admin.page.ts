import { Component, OnInit } from '@angular/core';
import { APIService } from '../util/api.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.page.html',
  styleUrls: ['./view-admin.page.scss'],
})
export class ViewAdminPage implements OnInit {

  items: string[] = [];

  nome: string[] = [];

  data: string;

  isLoading = false;

  porcentagemBairro: number;

  setores: any[] = [];

  constructor(public alertController: AlertController, private router: Router, private dao: APIService, public loadingController: LoadingController) {

    this.getSetor();

    this.coutBairros();

    this.items = [];
  }

  ngOnInit() {
    this.items = [];

  }

  getData(): string {

    var d = new Date();
    var dia = ("00" + (d.getDate())).slice(-2);
    var mes = ("00" + (d.getMonth() + 1)).slice(-2);
    var ano = d.getFullYear();

    return ano.toString() + "-" + mes.toString() + "-" + dia.toString();
  }

  openAllCronograma() {
    this.router.navigate(['/view-list-cronograma']);
  }

  openProfile(item) {

    this.router.navigate(['/form-user', { nome: item }]);

    this.ocultar_list_user();

    this.items = [];
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

  async alertFunc(title: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: title,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  getSetor() {

    this.data = this.getData();

    this.present();

    this.dao.readSetor(this.data)
      .then((result: any) => {

        for (var i = 0; i < result.cronograma.length; i++) {
          var setor = result.cronograma[i];
          this.setores.push(setor);
        }

        this.dismiss();
      })
      .catch((error: any) => {

        this.alertFunc('Erro', error);
      });
  }

  initializeItems(nome) {

    this.dao.selectPessoa(nome)
      .then((result: any) => {

        for (var i = 0; i < result.pessoa.length; i++) {
          var nome = result.pessoa[i].nome;
          this.items.push(nome);
        }
      })
      .catch((error: any) => {

      });

  }

  ocultar_list_user() {
    document.getElementById('listUser').style.display = 'none';
  }

  mostrar_list_user() {
    document.getElementById('listUser').style.display = '';

  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    if (val.length > 3) {
      // Reset items back to all of the items

      this.items = [];

      this.initializeItems(val);

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    } else {
      this.items = [];

      this.ocultar_list_user();
    }
  }

  coutBairros() {


    this.dao.selectCountEndereco()
      .then((result: any) => {

        this.porcentagemBairro = (+result.total_rows / 163);

        document.getElementById('progressBairro').setAttribute('value', "" + this.porcentagemBairro);

      })
      .catch((error: any) => {

        this.alertFunc('Erro', error);
      });
  }

}
