

function getEvents() {
  fetch("/events")
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
        <div class="events">
        <p><img src="${events.image_url}"</p>
        <p>Event: ${events.title}</p>
        <p>Time: ${new Date(events.event_start)} - ${new Date(events.event_end)}</p> 
        </div>
        `;
        })
        .join("");
      console.log(html);
      document.querySelector("#root-container").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

getEvents();
