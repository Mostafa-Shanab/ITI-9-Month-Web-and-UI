document.forms[0].addEventListener("submit", function (event) {
  if (!confirm("Do you want to submit to GOOGLE ?")) {
    event.preventDefault();
  }
});
