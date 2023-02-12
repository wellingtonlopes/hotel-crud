export class Constants {
  public static readonly PATH = {
    HOME: '',
    ROOMS: 'rooms',
    REPORTS: 'reports',
    CLIENTS: 'clients',
    RESERVATIONS: 'reservations',
    CREATE_RESERVATION: 'create-reservation',
    EDIT_RESERVATION: 'edit-reservation',
    CREATE_ROOM: 'create-room',
    ID_PARAMETER: ":id"
  };

  public static readonly FIRST_PAGE = 0;

  public static readonly DATE_FORMATS = {
    DDMMYYY: {
      parse: {
        dateInput: 'DD/MM/YYYY',
      },
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    },
    YYYYMMDD: {
      parse: {
        dateInput: 'YYYY/MM/DD',
      },
      display: {
        dateInput: 'YYYY/MM/DD',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY MMMM',
      },
    },
  }
}