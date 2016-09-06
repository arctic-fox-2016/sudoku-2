"use strict"

//105802000090076405200400819019007306762083090000061050007600030430020501600308900
//005030081902850060600004050007402830349760005008300490150087002090000600026049503
class Sudoku {
  constructor(board_string) {
    this.sudoku_template = "080020000040500320020309046600090004000640501134050700360004002407230600000700450" //masukan digit sudoku
    this.papan = [] //initiate papan kosong
    this.digit_separated = this.sudoku_template.split("") //jadi array panjang
    this.poin = 0

  }

  cek_zero(){ //cek berapa jumlah 0
    let zero = 0;
    for(let i=0; i<=this.digit_separated.length; i++){
        if(this.digit_separated[i]=="0"){
          zero = zero +1;
        }
    }
    return(zero)
  }

  solve() {
    //selagi ada angka 0, akan terus berjalan
    while(this.poin<=this.cek_zero()-1){
      for (let i=0; i<=8; i++){ //baris
        for (let j=0; j<=8; j++){ //kolom
          this.cek_baris_kolom(i,j);
        }
      }
    }
  }

  cek_baris_kolom(baris,kolom){ //untuk cek apakah papan[x][y] == 0
    let total_angka = ["1","2","3","4","5","6","7","8","9"]
    if(this.papan[baris][kolom] == "0"){
      //loop - cari baris yang sama: jika ada suatu angka: remove dari array total angka
      for (let i=0;i<=8;i++){
        for(let cek=0;cek<=total_angka.length;cek++){
          if(this.papan[baris][i]==total_angka[cek]){
            total_angka = this.remove(total_angka, this.papan[baris][i])
          }
        }
      }

      for (let j=0;j<=8;j++){
        for(let cek=0;cek<=total_angka.length;cek++){
          if(this.papan[j][kolom]==total_angka[cek]){
            total_angka = this.remove(total_angka, this.papan[j][kolom])
          }
        }
      }

      let koordinat_pengecekanx = this.cek_koordinat(baris)
      let koordinat_pengecekany = this.cek_koordinat(kolom)
      let koordinat_akhir_pengecekanx = koordinat_pengecekanx + 2
      let koordinat_akhir_pengecekany = koordinat_pengecekany + 2
      //loop untuk mengecek untuk semua koordinat di kotak kecil
      for (let x=koordinat_pengecekanx; x<=koordinat_akhir_pengecekanx; x++){
        for (let y=koordinat_pengecekany; y<=koordinat_akhir_pengecekany; y++){
            //untuk kolom yang sama, coret angka tersebut dari total_angka
          for(let cek=0;cek<=total_angka.length;cek++){
            //console.log("total angka ", "x", baris, " y", kolom,total_angka, " koordinat cek x", x, " koordinat cek y", y,"angka di cell",this.papan[x][y])
            if (x == baris && y == kolom){

            } else {
              if(this.papan[x][y] == total_angka[cek]){
                  total_angka = this.remove(total_angka, this.papan[x][y])
            }
            }
          }
        }

          //jika total_angka.length == 1, replace angka di this.papan[koordinatx][koordinaty] dengan angka itu
          // if (angka_sementara.length <=1){
          //   this.papan[koordinatx][koordinaty] = angka_sementara[0]
          // }
      }

      // total_angka = this.cek_kotak_kecil(baris,kolom, total_angka)

      if (total_angka.length <=1){
          this.papan[baris][kolom] = total_angka[0]
          this.poin = this.poin + 1
      }
    }
    // console.log(total_angka)
      //jika total_angka.length == 1, replace angka di this.papan[koordinatx][koordinaty] dengan angka itu
      //jika total_angka.length >1, loop lagi untuk kolom
        //untuk kolom yang sama, coret angka dari total_angka
        //jika total_angka.length == 1, replace angka di this.papan[koordinatx][koordinaty] dengan angka itu
      //jika total angka.length >1, loop lagi untuk kotak-kotak kecil
        //
  }


  // cek_kotak_kecil(koordinatx, koordinaty, angka_sementara){
  //   //cek untuk masuk koordinat x yang mana dan koordinat y yang mana
  //   //konvert koordinat untuk menjadi awal index pengecekan
  //   let koordinat_pengecekanx = this.cek_koordinat(koordinatx)
  //   let koordinat_pengecekany = this.cek_koordinat(koordinaty)
  //   let koordinat_akhir_pengecekanx = this.cek_koordinat(koordinatx)+ 2
  //   let koordinat_akhir_pengecekany = this.cek_koordinat(koordinaty)+ 2
  //   //loop untuk mengecek untuk semua koordinat di kotak kecil
  //     for (let i=koordinat_pengecekanx; i<=koordinat_akhir_pengecekanx; i++){
  //       for (let j=koordinat_pengecekany; j<=koordinat_pengecekany; j++){
  //         //untuk kolom yang sama, coret angka tersebut dari total_angka
  //         for(let cek=0;cek<=angka_sementara.length;cek++){
  //           if(this.papan[i][j] == angka_sementara[cek]){
  //             angka_sementara = this.remove(angka_sementara, this.papan[i][j])
  //           }
  //
  //         }
  //       }
  //
  //       //jika total_angka.length == 1, replace angka di this.papan[koordinatx][koordinaty] dengan angka itu
  //       // if (angka_sementara.length <=1){
  //       //   this.papan[koordinatx][koordinaty] = angka_sementara[0]
  //       // }
  //     }
  //     // console.log(koordinat_pengecekanx)
  //     // console.log(koordinat_pengecekany)
  //     // console.log(koordinat_akhir_pengecekanx)
  //     // console.log(koordinat_akhir_pengecekany)
  //     return angka_sementara;
  // }

  cek_koordinat(koordinat){ //untuk taruh mulai cek darimana
    let koordinat_mulai_cek = 0
    if(koordinat<=2){
      koordinat_mulai_cek += 0
    } else if ((koordinat>2) && (koordinat<=5)){
      koordinat_mulai_cek += 3
    } else if ((koordinat>5) && (koordinat<=8)){
      koordinat_mulai_cek += 6
    }
    // console.log(koordinat)
    // console.log(koordinat_mulai_cek)
    return koordinat_mulai_cek
  }

  remove(barisanangka,angka){
    let removedindex = barisanangka.indexOf(angka)
    barisanangka.splice(removedindex,1)
    return barisanangka
  }

  tambah_line(number){
    //console.log(this.digit_separated)
    this.line = [] //array kosong menampung digit/line
    for (let j=0; j<=8; j++){
      this.line[j] = this.digit_separated[number*9+j]
    }
    //console.log(this.line)
    return this.line
  }

  // Returns a string representing the current state of the board
  board() {
    for (let i=0; i<=8; i++){
      this.papan.push(this.tambah_line(i))
    }
    console.log(this.papan)
  }

  display_board(){
    let string = [] //buat array untuk menampung yang akan di console.log

    //loop untuk menambahkan string
    for (let i=0; i<=8; i++){
      string[i] = "| "
      for (let j=0; j<=8; j++){
        if ((j+1)%3==0){
          string[i] = string[i] + this.papan[i][j] + " | "
        } else {
          string[i] = string[i] + this.papan[i][j] + " "
        }
      }
    }
    console.log("------------------------")
    for(let k=0; k<=8; k++){

      console.log(string[k])
      if((k+1)%3 == 0){
        console.log("------------------------")
      }
    }

  }

}

// The file has newlines at the end of each line, so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

// var game = new Sudoku(board_string)
//
// // Remember: this will just fill out what it can and not "guess"
// game.solve()
//
// console.log(game.board())

let Sudoku1 = new Sudoku()
Sudoku1.board()
console.log("Soal")
Sudoku1.display_board()
console.log("****************************")

Sudoku1.solve()
console.log("Jawaban")
Sudoku1.display_board()
//
// console.log(Sudoku1.cek_kotak_kecil(2,4))
