import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import ticketStore from "./store/ticketStore";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";

document.addEventListener("DOMContentLoaded", (e) => {
  const form = formUI.form;
  const container = ticketsUI.container;

  // Events
  initApp();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await ticketStore.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(ticketStore.lastSearch);
  }

  container.addEventListener("click", (e) => {
    if (e.target.matches(".add-favorite")) {
      const id_ticket = e.target.dataset.ticket;

      ticketStore.addTicketToFavorite(id_ticket);
      ticketsUI.renderFavoriteTickets(ticketStore.favoriteTickets);
    }
  });

  const favorite = document.querySelector(".dropdown-content");

  favorite.addEventListener("click", (e) => {
    if (e.target.matches(".delete-favorite")) {
      const deleteBtn = e.target;
      ticketStore.deleteFavoriteTicket(deleteBtn.dataset.ticket);
      ticketsUI.renderFavoriteTickets(ticketStore.favoriteTickets);
    }
  });

  favorite.addEventListener("click", ({ target }) => {
    if (target.matches(".search-favorite")) {
      HandlerFavoriteSearch(target);
    }
  });

  async function HandlerFavoriteSearch(target) {
    const idticket = target.dataset.ticket;
    const ticket = ticketStore.getFavoriteTicket(idticket);
    const origin = ticket.origin;
    const destination = ticket.destination;
    const depart_date = locations.formateDate(new Date(), "yyyy-MM");
    const currency = currencyUI.currecyValue;
    const return_date = "";

    await ticketStore.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(ticketStore.lastSearch);
  }
});
