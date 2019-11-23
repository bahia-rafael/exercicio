import { Util } from './../util/util';
import { Motorista } from './../util/motorista';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { APIService } from '../util/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-next-coleta',
  templateUrl: './next-coleta.page.html',
  styleUrls: ['./next-coleta.page.scss'],
})


export class NextColetaPage implements OnInit {

  listColeta: string[] = [];

  isLoading = false;

  setor: string

  constructor(private route: ActivatedRoute, public alertController: AlertController, public loadingController: LoadingController, private dao: APIService) {

    this.setor = this.route.snapshot.paramMap.get('setor');

    this.getNextDate();

  }

  ngOnInit() {
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

  getNextDate() {

    this.present();

    this.dao.nextColeta(this.setor)
      .then((result: any) => {

        console.log(result);

        for (var i = 0; i < result.cronograma.length; i++) {

          var data = result.cronograma[i].data;

          this.listColeta.push(new Util().parseDate(data));
        }

        this.dismiss();

      })
      .catch((error: any) => {
        this.alertFunc('Erro', error);

      })
  }

}
