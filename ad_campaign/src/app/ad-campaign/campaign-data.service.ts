import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/RX';
import { Observable } from 'rxjs/Observable';

import { Campaign } from '../shared/campaign.model';

@Injectable()
export class CampaignDataService {
  campaigns: Campaign[] = [];
  activatedCampaign: any;
  private getUrl = 'http://192.168.1.11:8080/campaigns';
  constructor(private http: Http) {
  }
  requireCampaignData() {
    return this.http.get(this.getUrl + '')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong: ' + error);
        }
      );
  }
  requireCampaignDataByID(id: string) {
    // if (!id) return 'Wrong id input';
    return this.http.get(this.getUrl + '/' + id)
      .map(
        (response: Response) => {
          const data = response.json();
          this.activatedCampaign = data;
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong: ' + error);
        }
      );
  }
  storeCampaign(newCampaign: Campaign) {
    const headers = new Headers({'Content-type': 'application/json'});
    return this.http.post(this.getUrl, newCampaign, { headers: headers });
  }
  getCampaignByID(id: any) {
    this.requireCampaignDataByID(id)
      .subscribe(
        (campaign: any) => {
          this.activatedCampaign = campaign;
          console.log(this.activatedCampaign);
        },
        (error) => {
          console.log(error);
        }
      );
    return this.activatedCampaign;
  }
  getActivatedCampaign() {
    return this.activatedCampaign;
  }
  addCampaign(campaign: Campaign) {
    this.storeCampaign(campaign);
  }

}
