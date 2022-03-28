import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Grocery List";

  items = [
    {
      name: "Milk",
      quantity: "1"
    },
    {
      name: "Bread",
      quantity: "2"
    },
    {
      name: "Apples",
      quantity: "6"
    },
    
  ];

  constructor(
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController
    ) {}

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + index + ' ...',
      duration: 3000
    });
    await toast.present();

    this.items.splice(index, 1);//Research this more
  }

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Add Item',
      message: "Please enter item",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },        
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (item) => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Save',
          handler: (item) => {
            console.log('Save clicked', item);
            this.items.push(item);
          }
        }
      ]
    });
    await alert.present();
  }
}
