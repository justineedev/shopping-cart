import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { PlusCircle, MinusCircle, Trash2 } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  PlusCircle,
  MinusCircle,
  Trash2,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
