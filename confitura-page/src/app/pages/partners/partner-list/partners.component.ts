import {Component, OnInit} from '@angular/core';
import {PartnerService} from '../shared/partner.service';
import {Partner} from '../shared/partner.model';

@Component({
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']

})
export class PartnersComponent implements OnInit {
  types = ['platinum', 'gold', 'silver', 'bronze', 'media', 'technical'];
  partners: Partner[] = [];


  constructor(private service: PartnerService) {
  }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(partners => this.partners = partners);
  }

  partnersFor(type: string) {
    return this.partners.filter(partner => partner.type === type);
  }

}

