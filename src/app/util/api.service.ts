import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private API_URL = 'http://localhost/api/';

  constructor(public http: Http) { }

  selectBairro(cidade: string) {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'endereco/read_bairro.php?cidade=' + cidade)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectCidade() {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'endereco/read_cidade.php')
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectStreet(cidade: string, bairro: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'endereco/read_rua.php?cidade=' + cidade + '&bairro=' + bairro)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  insertPessoa(data: any) {
    return new Promise((resolve, reject) => {

      let obj = JSON.stringify(data);

      this.http.post(this.API_URL + 'pessoa/create.php', obj)
        .subscribe((result: any) => {

          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  updatePessoa(data: any) {
    return new Promise((resolve, reject) => {
      let obj = JSON.stringify(data);
      this.http.post(this.API_URL + 'pessoa/update.php', obj)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }


  selectCaminhao() {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'caminhao/read_motorista.php')
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectCronograma(data: string, nome: string) {
    console.log(this.API_URL + 'cronograma/read_cronograma.php?data=' + data + '&motorista=' + (nome.replace(' ', '%20')));
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'cronograma/read_cronograma.php?data=' + data + '&motorista=' + (nome.replace(' ', '%20')))
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  readSetor(data: string) {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'cronograma/read_setor.php?data=' + data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectAllCronograma() {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'cronograma/read_all_cronograma.php')
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectCountEndereco() {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'endereco/count.php')
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectPessoa(nome) {

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'cadastro_usuario/read_one.php?nome=' + nome)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectAllProfile() {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'pessoa/read.php')
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'cadastro_usuario/delete.php?id=' + id)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  getPessoa(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'pessoa/view_user.php?id=' + id)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  nextColeta(setor) {

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'cronograma/read_next_coleta.php?setor=' + setor)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  selectTipoUser() {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'cadastro_usuario/read_tipo_user.php')
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  updateTipoUser(id_pessoa: any, tipo_user: any){
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + 'user/update_tipo_user.php?id=' + id_pessoa + '&tipo_user=' + tipo_user)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }
}
