import {LightningElement,wire} from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import Tomatos_Object from '@salesforce/schema/Tomato__c';
import Variety_Field  from '@salesforce/schema/Tomato__c.Variety__c';

export default class productFilter extends NavigationMixin(LightningElement) {

        recordTypeId;
        picklistValue;
        optionsArray=[];
        selectedproductVeriaty='';
        selectedproductId;
    @wire(getObjectInfo,{objectApiName:Tomatos_Object})

    getObjectInfos({ data,error}) {
        if(data){
            this.recordTypeId =data.defaultRecordTypeId;
            console.log('this.recordTypeId:'+JSON.stringify(this.recordTypeId))
            }

        else if(error){
            console.log('error:'+JSON.stringify(error));
        }
            }

    @wire(getPicklistValues,{recordTypeId :'$recordTypeId',fieldApiName:Variety_Field})
    VarietyFieldValues({ data,error}){
        if(data){
            let arr=[]
           this.picklistValue = data.values;
            console.log('picklist data :'+JSON.stringify(this.picklistValue))

            this.picklistValue.forEach(element => {
                arr.push({label: element.value, value:element.value})
            })

            this.optionsArray = arr;
            console.log( 'this.optionArrryl:'+JSON.stringify(this.optionsArray))
        
        }
        else if(error){
            console.log('error:'+JSON.stringify(error));
        }
    }

            handleOptionChange(event){
                this.selectedproductVeriaty =event.detail.value;
                console.log('this.selectedproductVeriaty:'+JSON.stringify(this.selectedproductVeriaty))
                // parant to chid calling//
                this.template.querySelector('c-product-search').searchProduct(this.selectedproductVeriaty);
            }
        
            handleCustomEvent(event){
                this.selectedproductId = event.detail.productId; 
            }
     
  
    
    createProduct(){
        this[NavigationMixin.Navigate]({
                type:'standard__objectPage',
                attributes:{
                    objectApiName:'Tomato__c',
                    actionName:'new'
                    } 
                
                })
    
         }  
        }
        
