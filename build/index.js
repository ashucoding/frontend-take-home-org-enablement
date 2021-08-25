var page = 1;
var loadMoreButton = document.getElementById('loadMoreButton');

// loadMoreButton.addEventListener('click', function() {
//   console.log('clicked');
// })


function loadMore() {
  getEventsByPage(page);
  page++; // increment page for next load
}


function buttonOnClick(eventID) {
  // Display a modal with details on the event that was clicked

  // Find out which event was clicked
  // => eventID has the id of the event that was clicked

  // Then go fetch more details on that event
  
  fetch(`/events/${eventID}`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      var modalEl = document.getElementById('exampleModal');
      var myModal = new bootstrap.Modal(modalEl, { keyboard: false });

      document.querySelector('.modal-title').innerHTML = data.event.title;
      document.querySelector('#modal-body-event_start').innerHTML = new Date(data.event.event_start);
      document.querySelector('#modal-body-event_end').innerHTML = new Date(data.event.event_end);
      document.querySelector('#modal-body-description').innerHTML = data.event.description;
      // data.event.venues.forEach(venue => {
      // document.querySelector('#modal-body-venue').innerHTML += venue.address;
      // })
      data.event.sessions.forEach(session => {
        document.querySelector('#modal-body-sessions').innerHTML += session.title;
      })
      myModal.show();
    });
}

function addModalHTML() {
  document.querySelector("#root-container").innerHTML += `
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h4>Event Details</h4>
                <h6>Description</h6>
                <p id="modal-body-description">
                <h6>Location</h6>
                <p id="modal-body-venue">
                <h6>Time</h6>
                <p id="modal-body-event_start">
                <p id="modal-body-event_end">
                <h6>Sessions</h6>
                <p id="modal-body-sessions">
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
              </div>
            </div>
          </div>
        </div>`;
}


function getEventsByPage(page) {
  fetch(`/events?page=${page}`)
    .then((res) => {
      if (!res.ok) {
        throw Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const html = data.events
        .map((events) => {
          return `
         <div class="col">
          <div class="events_card card h-100" style="width: 18rem;">
          <img src="${events.image_url}" class="card-img-top" alt="Image">
          <div class="card-body">
            <h5 class="card-title">${events.title}</h5>
            <p class="card-text">${new Date(events.event_start)} - ${new Date(
            events.event_end)}</p>
            <button onclick="buttonOnClick(${events.id})" class="btn btn-primary">Check Out Event</button>
          </div>
          </div>
         </div>
          `;
        })
        .join("");
      console.log(html);
      document.querySelector("#events").innerHTML += html;
    })
    .catch((error) => {
      console.log(error);
    });
}

addModalHTML();
loadMore();

