import { NgModule } from '@angular/core';
//primeng

//Angular materials
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const UX_COMPONENTS = [MatIconModule, MatButtonModule];

@NgModule({
  imports: [],
  exports: [UX_COMPONENTS],
  declarations: [],
  providers: [],
})
export class UXModule {}
