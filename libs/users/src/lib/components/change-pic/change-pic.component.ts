import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-change-pic',
  templateUrl: './change-pic.component.html',
  styleUrls: ['./change-pic.component.scss'],
})
export class ChangePicComponent {
  changePic() {
    console.log('changePic');
  }
}
