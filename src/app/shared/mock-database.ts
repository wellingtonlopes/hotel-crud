import { ClientResponse } from "src/app/interfaces/client.interface";
import { ReservationResponse } from "src/app/interfaces/reservation.interface";
import { RoomInterface, RoomTypeEnum } from "src/app/interfaces/room.interface";

const clientsPage1: ClientResponse = {
  clientList: [{
    clientId: 1,
    firstName: 'Maui',
    lastName: 'Lopes-Pinheiro',
    email: 'maui@email.com'
  },
  {
    clientId: 2,
    firstName: 'Zelda',
    lastName: 'Lopes-Pinheiro',
    email: 'zelda@email.com'
  },
  {
    clientId: 3,
    firstName: 'Kamina',
    lastName: 'Lopes-Pinheiro',
    email: 'kamina@email.com'
  },
  {
    clientId: 4,
    firstName: 'Lucca',
    lastName: 'Lopes-Pinheiro',
    email: 'lucca@email.com'
  },
  {
    clientId: 5,
    firstName: 'Joel',
    lastName: 'Miller',
    email: 'joel@email.com'
  }],
  totalCount: 7
};

const clientsPage2: ClientResponse = {
  clientList: [{
    clientId: 6,
    firstName: 'Ellie',
    lastName: 'Williams',
    email: 'ellie@email.com'
  },
  {
    clientId: 7,
    firstName: 'John',
    lastName: 'Halo',
    email: 'john@email.com'
  }],
  totalCount: 7
};

const reservationsPage1: ReservationResponse = {
  reservationList: [{
    reservationId: 1,
    reservationDoneAt: new Date(),
    canceledReservationAt: null,
    checkInAt: new Date(),
    hasCheckedIn: false,
    hasCheckedOut: false,
    checkOutAt: new Date(),
    reservedBy: clientsPage1.clientList[0],
    reservedRoomId: 3
  },
  {
    reservationId: 2,
    reservationDoneAt: new Date(),
    canceledReservationAt: null,
    checkInAt: new Date(),
    hasCheckedIn: false,
    hasCheckedOut: false,
    checkOutAt: new Date(),
    reservedBy: clientsPage1.clientList[1],
    reservedRoomId: 10
  },
  {
    reservationId: 3,
    reservationDoneAt: new Date(),
    canceledReservationAt: null,
    checkInAt: new Date(),
    hasCheckedIn: false,
    hasCheckedOut: false,
    checkOutAt: new Date(),
    reservedBy: clientsPage1.clientList[2],
    reservedRoomId: 5
  },
  {
    reservationId: 4,
    reservationDoneAt: new Date(),
    canceledReservationAt: null,
    checkInAt: new Date(),
    hasCheckedIn: true,
    hasCheckedOut: true,
    checkOutAt: new Date(),
    reservedBy: clientsPage1.clientList[3],
    reservedRoomId: 6
  },
  {
    reservationId: 5,
    reservationDoneAt: new Date(),
    canceledReservationAt: null,
    checkInAt: new Date(),
    hasCheckedIn: true,
    hasCheckedOut: false,
    checkOutAt: new Date(),
    reservedBy: clientsPage1.clientList[4],
    reservedRoomId: 2
  }],
  totalCount: 8
};

const reservationsPage2: ReservationResponse = {
  reservationList: [{
    reservationId: 6,
    reservationDoneAt: new Date(),
    canceledReservationAt: null,
    checkInAt: new Date(),
    hasCheckedIn: false,
    hasCheckedOut: false,
    checkOutAt: new Date(),
    reservedBy: clientsPage2.clientList[0],
    reservedRoomId: 9
  },
  {
    reservationId: 7,
    reservationDoneAt: new Date(),
    canceledReservationAt: new Date(),
    checkInAt: new Date(),
    hasCheckedIn: false,
    hasCheckedOut: false,
    checkOutAt: new Date(),
    reservedBy: clientsPage2.clientList[1],
    reservedRoomId: 1
  },
  {
    reservationId: 8,
    reservationDoneAt: new Date(),
    canceledReservationAt: null,
    checkInAt: new Date(),
    hasCheckedIn: false,
    hasCheckedOut: false,
    checkOutAt: new Date(),
    reservedBy: clientsPage2.clientList[0],
    reservedRoomId: 1
  }],
  totalCount: 8
};

const rooms: RoomInterface[][] = [
  [{
    roomId: 1,
    roomNumber: 101,
    roomType: RoomTypeEnum.SINGLE_ROOM,
    reservation: [reservationsPage2.reservationList[1], reservationsPage2.reservationList[2]],
    price: 250
  },
  {
    roomId: 2,
    roomNumber: 102,
    roomType: RoomTypeEnum.SINGLE_ROOM,
    reservation: [reservationsPage1.reservationList[4]],
    price: 250
  },
  {
    roomId: 3,
    roomNumber: 103,
    roomType: RoomTypeEnum.DOUBLE_ROOM,
    reservation: [reservationsPage1.reservationList[0]],
    price: 350
  },
  {
    roomId: 4,
    roomNumber: 104,
    roomType: RoomTypeEnum.DOUBLE_ROOM,
    reservation: [],
    price: 350
  }],
  [{
    roomId: 5,
    roomNumber: 201,
    roomType: RoomTypeEnum.DELUXE_ROOM,
    reservation: [reservationsPage1.reservationList[2]],
    price: 500
  },
  {
    roomId: 6,
    roomNumber: 202,
    roomType: RoomTypeEnum.DELUXE_ROOM,
    reservation: [reservationsPage1.reservationList[3]],
    price: 500
  },
  {
    roomId: 7,
    roomNumber: 203,
    roomType: RoomTypeEnum.DELUXE_ROOM,
    reservation: [],
    price: 500
  },
  {
    roomId: 8,
    roomNumber: 301,
    roomType: RoomTypeEnum.SUITE,
    reservation: [],
    price: 900
  }],
  [{
    roomId: 9,
    roomNumber: 302,
    roomType: RoomTypeEnum.SUITE,
    reservation: [reservationsPage2.reservationList[0]],
    price: 900
  },
  {
    roomId: 10,
    roomNumber: 401,
    roomType: RoomTypeEnum.PRESIDENTIAL_SUITE,
    reservation: [reservationsPage1.reservationList[1]],
    price: 1500
  }]
];

export const MOCKED_ROOMS = JSON.stringify(rooms);
export const MOCKED_RESERVATIONS_PAGE_1 = JSON.stringify(reservationsPage1);
export const MOCKED_RESERVATIONS_PAGE_2 = JSON.stringify(reservationsPage2);
export const MOCKED_CLIENTS_PAGE_1 = JSON.stringify(clientsPage1);
export const MOCKED_CLIENTS_PAGE_2 = JSON.stringify(clientsPage2);
