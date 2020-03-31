import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from './user.service';
@Pipe({
    name: 'translate'
})
export class Translate implements PipeTransform {

    constructor(private userservice: UserService) { }

    transform(status: string): string {

        let language = sessionStorage.getItem('language')
        if (!language) {
            language = 'english'
        }

        console.log('global', language)
        if (language == 'english') {
            return status
        }
        else {
            return 'hello'
        }

    }


}