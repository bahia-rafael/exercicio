import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { APIService } from '../util/api.service';

@Component({
  selector: 'app-view-list-cronograma',
  templateUrl: './view-list-cronograma.page.html',
  styleUrls: ['./view-list-cronograma.page.scss'],
})
export class ViewListCronogramaPage implements OnInit {

  cronogramas: any[] = [];

  isLoading = false;

  constructor(public alertController: AlertController, private dao: APIService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.inicialize();
  }

  inicialize() {

    this.present();

    this.dao.selectAllCronograma()
      .then((result: any) => {
        console.log(result);
        for (var i = 0; i < result.cronograma.length; i++) {
          var item = result.cronograma[i];
          this.cronogramas.push(item);
        }

        this.dismiss();
      })
      .catch((error: any) => {

        this.alertFunc('Erro', error);
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
}
