import { Motorista } from './../util/motorista';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { APIService } from '../util/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-motorista',
  templateUrl: './view-motorista.page.html',
  styleUrls: ['./view-motorista.page.scss'],
})
export class ViewMotoristaPage implements OnInit {

  isLoading = false;

  listMotorista: string[] = [];

  listBairro: string[] = [];

  motorista: Motorista = {
    nome: "",
    data: "",
    setor: ""
  }


  setor: string;


  constructor(private router: Router, public alertController: AlertController, public loadingController: LoadingController, private dao: APIService) { }

  ngOnInit() {

    this.motorista.data = this.getTime();

    this.selectMotorista();
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

  async alertFunc(title: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: title,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
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

  selectMotorista() {

    this.present();

    this.dao.selectCaminhao()
      .then((result: any) => {
        for (var i = 0; i < result.motorista.length; i++) {
          var motorista = result.motorista[i].nome_motorista;
          this.listMotorista.push(motorista);
        }

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
  }

  openListRua(p) {
    this.router.navigate(['/list-rua', { bairro: p }]);
  }

  getTime(): string {

    var d = new Date();
    var dia = ("00" + (d.getDate())).slice(-2);
    var mes = ("00" + (d.getMonth() + 1)).slice(-2);
    var ano = d.getFullYear();

    return ano.toString() + "-" + mes.toString() + "-" + dia.toString();
  }

  logForm() {

    this.present();

    this.dao.selectCronograma(this.motorista.data, this.motorista.nome)
      .then((result: any) => {

        this.setor = result.cronograma[1].setor;

        for (var i = 0; i < result.cronograma.length; i++) {

          var cronograma = result.cronograma[i].bairro;

          this.listBairro.push(cronograma);
        }

        document.getElementById('cardRua').style.display = '';


        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })


  }

  addMotorista(event) {

    this.motorista.nome = event.detail.value;

  }
}
