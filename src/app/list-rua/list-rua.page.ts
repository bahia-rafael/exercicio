import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { APIService } from '../util/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-rua',
  templateUrl: './list-rua.page.html',
  styleUrls: ['./list-rua.page.scss'],
})
export class ListRuaPage implements OnInit {

  isLoading = false;

  listRua: string[] = [];

  bairro: string;

  constructor(private route: ActivatedRoute, public alertController: AlertController, public loadingController: LoadingController, private dao: APIService) { }

  ngOnInit() {

    this.bairro = this.route.snapshot.paramMap.get('bairro');

    this.selectRua(this.bairro);
  }

  selectRua(p) {

    this.present();

    this.dao.selectStreet('Salvador', p)
      .then((result: any) => {

        for (var i = 0; i < result.endereco.length; i++) {

          var rua = result.endereco[i].rua;

          this.listRua.push(rua);
        }

        this.dismiss();

      })
      .catch((error: any) => {

      })

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
