const rules = [
  "Weekdays: Max 6 rooms per member including temp.",
  "Weekends/Long weekends: Max 3 total.",
  "Temp-only bookings: Max 3 rooms.",
  "Meals: Veg + Non-Veg = Party Size.",
  "Booking window: 180/90/60 days by type."
];

const calendar = [
  { date: "2025-10-17", type: "season", label: "Diwali Begins" },
  { date: "2025-12-25", type: "special", label: "Christmas" }
];

const rooms = [
  { id: "A-1", block: "A", ac: false, wheelchair: true, pets: false },
  { id: "A-2", block: "A", ac: false, wheelchair: false, pets: false },
  { id: "D-1", block: "D", ac: true, wheelchair: true, pets: true },
  { id: "E-3", block: "E", ac: true, wheelchair: false, pets: true }
];

// OTP verification
document.getElementById("otp-button").onclick = () => {
  const otp = document.getElementById("otp-input").value;
  if (otp === "0000") {
    document.getElementById("otp-section").classList.add("hidden");
    document.getElementById("booking-section").classList.remove("hidden");
    setupDemo();
  } else {
    alert("Demo OTP is 0000");
  }
};

function setupDemo() {
  const rulesList = document.getElementById("rules-list");
  rules.forEach(r => {
    const li = document.createElement("li");
    li.innerText = r;
    rulesList.appendChild(li);
  });

  const calendarEl = document.getElementById("calendar");
  calendar.forEach(d => {
    const span = document.createElement("span");
    span.innerText = d.date.slice(-2);
    span.title = d.label;
    span.className = d.type;
    calendarEl.appendChild(span);
  });

  const roomList = document.getElementById("room-list");
  rooms.forEach(r => {
    const div = document.createElement("div");
    div.innerText = r.id;
    div.onclick = () => div.classList.toggle("selected");
    roomList.appendChild(div);
  });

  const inputs = ["adults", "children", "veg", "nonveg"];
  inputs.forEach(id => {
    document.getElementById(id).addEventListener("change", validate);
  });
}

function validate() {
  const adults = +document.getElementById("adults").value;
  const children = +document.getElementById("children").value;
  const veg = +document.getElementById("veg").value;
  const nonveg = +document.getElementById("nonveg").value;

  const selectedRooms = document.querySelectorAll("#room-list .selected").length;

  const errors = [];
  if (veg + nonveg !== adults + children)
    errors.push("Meal count must match total party size.");
  if (selectedRooms > 6) errors.push("Too many rooms — max 6.");

  const errBox = document.getElementById("errors");
  const successBox = document.getElementById("success");
  errBox.innerHTML = "";
  successBox.classList.add("hidden");

  if (errors.length) {
    errBox.innerHTML = errors.map(e => `<div>${e}</div>`).join("");
  } else {
    successBox.classList.remove("hidden");
  }
}
