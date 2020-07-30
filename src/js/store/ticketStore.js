import locations from "./locations";

class Ticket {
  constructor() {
    this.lastSearch = {}; //храняться билеты по последнему поиску
    this._favoriteTickets = {};
  }

  get favoriteTickets() {
    return this._favoriteTickets;
  }

  set favoriteTickets(ticket) {
    if (!(ticket.id_ticket in this._favoriteTickets)) {
      this._favoriteTickets[ticket.id_ticket] = ticket;
    }
  }

  deleteFavoriteTicket(idTicket) {
    delete this._favoriteTickets[idTicket];
    console.log(this.favoriteTickets);
    
  }

  async fetchTickets(params) {
    const response = await locations.api.prices(params);
    // console.log(response.data); //{data: obj ticket}
    this.lastSearch = this.serializeTickets(response.data);
    // console.log(this.lastSearch);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      console.log(ticket);
      return {
        ...ticket,
        id_ticket: `${ticket.airline}-${(~~(Math.random() * 1e8)).toString(
          16
        )}`,
        origin_name: locations.getCityNameByCode(ticket.origin),
        destination_name: locations.getCityNameByCode(ticket.destination),
        airline_logo: locations.getAirlineLogoByCode(ticket.airline),
        airline_name: locations.getAirlineNameByCode(ticket.airline),
        departure_at: locations.formateDate(
          ticket.departure_at,
          "dd MMM yyyy hh:mm"
        ),
        return_at: locations.formateDate(ticket.return_at, "dd MMM yyyy hh:mm"),
      };
    });
  }

  addTicketToFavorite(idTicket) {
    const ticket = Object.values(this.lastSearch).find(
      (ticket) => ticket.id_ticket == idTicket
    );
    this.favoriteTickets = ticket;
    console.log(this.favoriteTickets);
  }
}

const ticketStore = new Ticket();

export default ticketStore;
