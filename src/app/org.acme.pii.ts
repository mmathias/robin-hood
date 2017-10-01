import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.pii{
   export class Address {
      street: string;
      house: string;
      city: string;
      county: string;
      country: string;
      zip: string;
   }
   export class User extends Participant {
      email: string;
      firstName: string;
      lastName: string;
      dob: Date;
      address: Address;
      authorized: string[];
   }
   export class Retailer extends Participant {
      email: string;
      companyName: string;
      authorized: string[];
   }
   export class Request extends Asset {
      requestId: string;
      requestData: string;
      retailer: Retailer;
   }
   export class RequestAccess extends Transaction {
      request: Request;
   }
   export class YesResponse extends Transaction {
      request: Request;
   }
   export class NoResponse extends Transaction {
      request: Request;
   }
   export class CounterOfferResponse extends Transaction {
      request: Request;
      price: string;
   }
// }
