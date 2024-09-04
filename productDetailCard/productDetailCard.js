import { LightningElement,wire} from 'lwc';
import { subscribe,MessageContext } from 'lightning/messageService';
import SELECTED_PRODUCT_CHANNEL from'@salesforce/messageChannel/SelectedProduct__c';
import getSelectedProductDetail from '@salesforce/apex/Productcontrolar.getSelectedProductDetail';
import ResultCompont from '../resultCompont/resultCompont';
import {NavigationMixin} from 'lightning/Navigation'
export default class ProductDetailCard extends NavigationMixin (LightningElement) {

    selectedProductId;
    productData;
    @wire(MessageContext)
    messageContext;

    connectedCallback(){ 
        subscribe(
            this.messageContext, 
            SELECTED_PRODUCT_CHANNEL,
            (message)=>{
                this.haldleSelectedProduct(message.productId);
            }
        )
    }

    haldleSelectedProduct(productId){
        this.selectedProductId=productId;

        getSelectedProductDetail({productId:this.selectedProductId})
        .then(result=>{
            this.productData =result;
            console.log('Selected Product detail :'(result));
        })
        .catch(error=>{
            console.error(error);
        })

    }
}   