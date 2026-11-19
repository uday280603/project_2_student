import { Component, Inject, inject, INJECTOR } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  selector: 'app-get-confirm',
  styleUrl: './get-confirm.scss',
  templateUrl: './get-confirm.html',
})
export class GetConfirm {
  msg!: string;
  constructor(
    private _matRef: MatDialogRef<GetConfirm>,
    @Inject(MAT_DIALOG_DATA)data: string,
  ) {
    this.msg=data;
  }

  onClick(flag: boolean) {
    this._matRef.close(flag);
  }
}
