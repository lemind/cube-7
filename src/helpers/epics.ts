import { pipe } from 'rxjs'
import { filter } from 'rxjs/operators';

export const ofType = type => pipe(filter((action:any) =>
  action.type === type))
