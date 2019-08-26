import {Rate} from './rate.model';

export class Exchange {
  table: string;
  no: string;
  effectiveDate: Date;
  rates: Rate[];
}
