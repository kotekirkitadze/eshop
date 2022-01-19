import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'users-change-pic',
  templateUrl: './change-pic.component.html',
  styleUrls: ['./change-pic.component.scss'],
})
export class ChangePicComponent {
  @Output() picChange: EventEmitter<any> = new EventEmitter();
  // imageDisplay: any = '';
  @Input() imageDisplay: any = '';
  // set imageDisplay(value: string | undefined) {
  //   this.imageDisplay = value;
  // }
  // get imageDisplay() {
  //   return this.imagePath;
  // }
  // imageDisplay: any =
  //   'https://commschool.ge/wp-content/uploads/2021/07/kote-960x604.png';
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.picChange.next({ image: file });

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
}
