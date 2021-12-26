import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() images: string[] | undefined = [];

  selectedImageUrl =
    'https://i.pinimg.com/564x/9d/bb/7b/9dbb7b1fee6b77fcfd20cb2b9023701f.jpg';

  ngOnInit(): void {
    if (this.images != undefined) {
      if (this.hasImages) {
        this.selectedImageUrl = this.images[0];
      }
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages(): boolean {
    if (this.images) {
      return this.images?.length > 0;
    } else {
      return false;
    }
  }
}
