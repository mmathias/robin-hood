import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Request } from '../org.acme.pii';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RequestService {

	
		private NAMESPACE: string = 'Request';
	



    constructor(private dataService: DataService<Request>) {
    };

    public getAll(): Observable<Request[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Request> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Request> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Request> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Request> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
