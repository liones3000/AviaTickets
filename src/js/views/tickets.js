import currencyUI from "./currency";

class TicketsUI {
  constructor() {
    this.container = document.querySelector(".tickets-sections .row");
    this.favoriteContainer = document.querySelector(".favorites #dropdown1");
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  renderFavoriteTickets(tickets) {
    this.favoriteContainer.innerHTML = "";

    let fragment = "";

    Object.values(tickets).forEach((ticket) => {
      const template = TicketsUI.favoriteTicketTemplate(ticket);
      fragment += template;
    });
    this.favoriteContainer.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">По вашему запросу билетов не найдено.</div>
    `;
  }

  static ticketTemplate(ticket) {
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img src="${ticket.airline_logo}" class="ticket-airline-img" />
          <span class="ticket-airline-name">${ticket.airline_name}</span>
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currencyUI.getCurrencySymbol2(
            ticket.currency
          )}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto" data-ticket="${ticket.id_ticket}">Add to favorites</a>
      </div>
    </div>
    `;
  }

  static favoriteTicketTemplate(ticket) {
    return `
    <div class="favorite-item  d-flex align-items-start">
        <img
          src="${ticket.airline_logo}"
          class="favorite-item-airline-img"
        />
      <div class="favorite-item-info d-flex flex-column">
        <div class="favorite-item-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${ticket.origin_name} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currencyUI.getCurrencySymbol2(
            ticket.currency
          )}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${
            ticket.flight_number
          }</span>
        </div>
        <div class="favorite-action">
        <a
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
          data-ticket="${ticket.id_ticket}">Delete</a
        >
        <a
          class="waves-effect waves-light btn-small purple darken-3 search-favorite ml-auto"
          data-ticket="${ticket.id_ticket}">Search</a
        >
        </div>
      </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI();

export default ticketsUI;
