
import { Component} from '@angular/core';
import { NotificationServiceService } from '../../core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {
  checked = false;
  indeterminate = false;
  indeterminate1 = false;
  color="";
  labelPosition = 'after';
  disabled = false;
  constructor(NotificationServiceService : NotificationServiceService) {      
  }
  
  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target ? event.target.result : '';
      }
    }
  }
  public delete(){
    this.url = null;
  }
}
 