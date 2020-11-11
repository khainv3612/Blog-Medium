import {NgModule} from '@angular/core';

import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
// import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  exports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDialogRef]
})
export class MaterialModule {
}
