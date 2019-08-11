import {Rate} from './rate.model';

export class Exchange {
  table: String;
  no: String;
  effectiveDate: Date;
  rates: Rate[];
}
