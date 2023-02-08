import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClientInterface } from 'src/app/interfaces/client.interface';
import { RoomTypeEnum } from 'src/app/interfaces/room.interface';

@Component({
  selector: 'app-room-details-dialog',
  templateUrl: './room-details-dialog.component.html',
  styleUrls: ['./room-details-dialog.component.scss']
})
export class RoomDetailsDialogComponent implements OnInit {
  public roomType!: RoomTypeEnum;
  public roomPrice!: number;
  public roomNumber!: number;
  public reservedBy!: ClientInterface;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<RoomDetailsDialogComponent>) { }

  ngOnInit(): void {
    this.roomNumber = this.data.roomNumber;
    this.roomType = this.data.roomType;
    this.roomPrice = this.data.roomPrice;
    this.reservedBy = this.data.reservedBy;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
