function docs() {
  var form = document.forms["RegForm"];
  var name = form["Nom"];
  var email = form["Email"];
  var age = document.getElementById("number-age");
  var checkbox = form["checkbox"];

  if (!name.value.trim()) {
    alert("Merci d'indiquer votre nom.");
    name.focus();
    return false;
  }

  if (!email.value.includes("@") || email.value.length < 5) {
    alert("Merci d'indiquer une adresse e-mail valide.");
    email.focus();
    return false;
  }

  var ageValue = parseInt(age.value, 10);
  if (isNaN(ageValue) || ageValue < 18 || ageValue > 99) {
    alert("L'âge doit être compris entre 18 et 99 ans.");
    age.focus();
    return false;
  }

  if (!checkbox.checked) {
    alert("Veuillez accepter les CGV.");
    checkbox.focus();
    return false;
  }

  alert("Merci ! Votre demande a bien été envoyée.");
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  var mapElement = document.getElementById("japan-map");
  if (!mapElement || typeof L === "undefined") {
    return;
  }

  var map = L.map("japan-map").setView([35.68, 139.76], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var points = [
    {
      name: "Tokyo",
      coords: [35.6762, 139.6503],
      details: "Sensō-ji, Shibuya, Tokyo Skytree",
      category: "ville",
    },
    {
      name: "Kyoto",
      coords: [35.0116, 135.7681],
      details: "Fushimi Inari, Kinkaku-ji, Arashiyama",
      category: "ville",
    },
    {
      name: "Osaka",
      coords: [34.6937, 135.5023],
      details: "Dōtonbori, Château d'Osaka, Umeda Sky",
      category: "ville",
    },
    {
      name: "Yokohama",
      coords: [35.4437, 139.638],
      details: "Minato Mirai, Chinatown, Jardin Sankeien",
      category: "ville",
    },
    {
      name: "Nara",
      coords: [34.6851, 135.8048],
      details: "Parc de Nara, Tōdai-ji",
      category: "temple",
    },
    {
      name: "Hakone",
      coords: [35.2324, 139.1069],
      details: "Onsen et vue sur le Mont Fuji",
      category: "parcours",
    },
    {
      name: "Hôtel Tokyo Ueno Comfort",
      coords: [35.7136, 139.7774],
      details: "Hôtel conseillé proche gare JR Ueno",
      category: "hotel",
    },
    {
      name: "Kinkaku-ji",
      coords: [35.0394, 135.7292],
      details: "Temple emblématique de Kyoto",
      category: "temple",
    },
    {
      name: "Parcours Kansai",
      coords: [34.7025, 135.4959],
      details: "Départ Osaka pour circuit Kyoto/Nara",
      category: "parcours",
    },
  ];

  function buildIcon(category) {
    return L.divIcon({
      className: "",
      html: '<span class="map-pin map-pin-' + category + '"></span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -8],
    });
  }

  var markers = [];

  points.forEach(function (point) {
    var marker = L.marker(point.coords, { icon: buildIcon(point.category) })
      .addTo(map)
      .bindPopup("<strong>" + point.name + "</strong><br>" + point.details);
    markers.push({ marker: marker, category: point.category });
  });

  function applyMapFilter(filter) {
    markers.forEach(function (entry) {
      var mustShow = filter === "all" || entry.category === filter;
      if (mustShow && !map.hasLayer(entry.marker)) {
        entry.marker.addTo(map);
      }
      if (!mustShow && map.hasLayer(entry.marker)) {
        map.removeLayer(entry.marker);
      }
    });
  }

  var filterButtons = document.querySelectorAll(".map-filter-btn");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter") || "all";
      applyMapFilter(filter);

      filterButtons.forEach(function (btn) {
        btn.classList.remove("is-active");
      });
      button.classList.add("is-active");
    });
  });
});
