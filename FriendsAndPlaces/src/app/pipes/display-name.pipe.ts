import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from '../interfaces/friends';

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {

  transform(friend: Friend): string {
    return friend.vorname + ' ' + friend.nachname;
  }

}
