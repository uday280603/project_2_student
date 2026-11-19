import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Service()
export class SnackbarService {
  _snackbar = inject(MatSnackBar);

  openSnackbar(msg: string) {
    this._snackbar.open(msg, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
