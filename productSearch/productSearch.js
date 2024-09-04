import { LightningElement,wire,api } from 'lwc';
import getProductList from '@salesforce/apex/Productcontrolar.getProductList';
import { publish , MessageContext } from 'lightning/messageService';
import SELECTED_PRODUCT_CHANNEL from'@salesforce/messageChannel/SelectedProduct__c';

export default class ProductSearch extends (LightningElement) {

    productVariety='';
    productData;
    selectedProductId;
    @wire(getProductList,{ variety: '$productVariety'})
    wireProduct({data,error}){
        if(data){
            this.productData=data;
            console.log(data);
        }
        else if(error){
            console.error(error);
        }
    }
      
   @wire(MessageContext)
      messageContext;

    handleClickproductcard(event){
        this.selectedProductId = event.currentTarget.dataset.id;
        console.log(this.selectedProductId);
//publishing selcted message//
        publish(this.messageContext , SELECTED_PRODUCT_CHANNEL , {productId : this.selectedProductId});

        let boxClass = this.template.querySelectorAll('.selected');
        if(boxClass.length >0 ){ 
            this.removeClass();
        }

        //current selected product card deatails
        let productBox = this.template.querySelector(`[data-id="${this.selectedProductId}"]`);

        if(productBox){
            productBox.className= 'title_wrapper selected'
        }
        //custom event firing to Praent//
            this.dispatchEvent(new CustomEvent('select',{
                detail:{
                    productId: this.selectedProductId
                }
            }))
    }

    removeClass(){
        this.template.querySelectorAll('.selected')[0].classList.remove('selected'); 
    }

        
        
    @api searchProduct(varietyOfProduct){
        this.productVariety = varietyOfProduct;
        
    }
        
        
    }

   
