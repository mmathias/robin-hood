import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RequestService } from './Request.service';
import { Subscription } from 'rxjs/Subscription';
import { ServerSocket } from './server-socket.service';
import 'rxjs/add/operator/toPromise';
import { WebSocketService } from 'angular2-websocket-service';

@Component({
	selector: 'app-Request',
	templateUrl: './Request.component.html',
	styleUrls: ['./Request.component.css'],
  providers: [RequestService, ServerSocket]
})
export class RequestComponent implements OnInit {

  myForm: FormGroup;

	private socketSubscription: Subscription;
  private allAssets;
  private asset;
  private currentId;
	private errorMessage;



          requestId = new FormControl("", Validators.required);



          requestData = new FormControl("", Validators.required);



          retailer = new FormControl("", Validators.required);




  constructor(private serviceRequest:RequestService, fb: FormBuilder, private socket: ServerSocket) {
    this.myForm = fb.group({


          requestId:this.requestId,



          requestData:this.requestData,



          retailer:this.retailer


    });

		const stream = this.socket.connect();

		this.socketSubscription = stream.subscribe(message => {
			console.log('received message from server: ', message);

			this.socket.send({ type: 'helloServer' })
		});

		// send message to server, if the socket is not connected it will be sent
		// as soon as the connection becomes available thanks to QueueingSubject
		// this.socket.send({ type: 'helloServer' })
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceRequest.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.pii.Request",


          "requestId":this.requestId.value,



          "requestData":this.requestData.value,



          "retailer":this.retailer.value


    };

    this.myForm.setValue({


          "requestId":null,



          "requestData":null,



          "retailer":null


    });

    return this.serviceRequest.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({


          "requestId":null,



          "requestData":null,



          "retailer":null


      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.pii.Request",







            "requestData":this.requestData.value,





            "retailer":this.retailer.value



    };

    return this.serviceRequest.updateAsset(form.get("requestId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceRequest.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceRequest.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {


            "requestId":null,



            "requestData":null,



            "retailer":null


      };




        if(result.requestId){

            formObject.requestId = result.requestId;

        }else{
          formObject.requestId = null;
        }

        if(result.requestData){

            formObject.requestData = result.requestData;

        }else{
          formObject.requestData = null;
        }

        if(result.retailer){

            formObject.retailer = result.retailer;

        }else{
          formObject.retailer = null;
        }


      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({


          "requestId":null,



          "requestData":null,



          "retailer":null


      });
  }

}
