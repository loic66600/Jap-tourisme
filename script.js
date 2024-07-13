function updateRange() {
  document.getElementById("range-age").value =
    document.getElementById("number-age").value;
}

function updateNumber() {
  document.getElementById("number-age").value =
    document.getElementById("range-age").value;
}

function checkAge() {
  // Récupérer la valeur de l'âge depuis le champ de saisie
  var ageInput = document.getElementById("number-age").value;

  // Convertir la valeur de chaîne en nombre
  var age = parseInt(ageInput);

  // Vérifier si l'âge est supérieur ou égal à 18 et inférieur à 99
  if (age >= 18 && age < 99) {
    alert("Vous avez l'âge requis !");
  } else {
    alert("Vous n'avez pas l'âge requis.");
  }
}
function docs() {
  var name = document.forms["RegForm"]["Nom"];
  var email = document.forms["RegForm"]["Email"];
  var checkbox = document.forms["RegForm"]["checkbox"];
  if (name.value == "") {
    alert("Mettez votre nom.");
    name.focus();
    return false;
  }
  if (email.value.indexOf("@", 0) < 0) {
    alert("Mettez une adresse email valide.");
    email.focus();
    return false;
  }
  if (checkbox.value == "") {
    alert("Accepter les CGV");
    checkbox.focus();
    return false;
  }
  return true;
}
