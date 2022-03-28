import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Grocery List";

  constructor(
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceService,
    ) {}

  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + index + ' ...',
      duration: 3000
    });
    await toast.present();

    this.dataService.removeItem(index);
  }

  async editItem(item, index) {
    console.log("Editing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item - ' + index + ' ...',
      duration: 3000
    });
    await toast.present();
    this.showEditItemPrompt(item, index);
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
            this.dataService.addItem(item);
          }
        }
      ]
    });
    await alert.present();
  }

  async showEditItemPrompt(item, index) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Edit Item',
      message: "Please edit item",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item.name
        },        
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          value: item.quantity
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
            this.dataService.editItem(item, index);
          }
        }
      ]
    });
    await alert.present();
  }
}
