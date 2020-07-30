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
    // console.log(ticketStore.lastSearch);
  }

  container.addEventListener("click", (e) => {
    if (e.target.matches(".add-favorite")) {
      const id_ticket = e.target.dataset.ticket;

      // console.log(e.target.dataset.ticket);

      ticketStore.addTicketToFavorite(id_ticket);
      ticketsUI.renderFavoriteTickets(ticketStore.favoriteTickets);
    }
  });

  const favorite = document.querySelector(".dropdown-content");

  favorite.addEventListener("click", (e) => {
    if (e.target.matches(".delete-favorite")) {
      const deleteBtn = e.target;
      // console.log(deleteBtn.dataset.ticket);
      ticketStore.deleteFavoriteTicket(deleteBtn.dataset.ticket);
      ticketsUI.renderFavoriteTickets(ticketStore.favoriteTickets);
    }
  });
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
