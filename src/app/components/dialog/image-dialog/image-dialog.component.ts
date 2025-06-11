import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  imports: [],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}
}
