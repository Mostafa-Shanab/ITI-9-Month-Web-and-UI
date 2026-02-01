fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }

    return response.json();
  })
  .then((users) => {
    console.log("🚀 ~ users:", users);

    const table = document.createElement("table");

    table.style.width = "80%";
    table.style.margin = "20px auto";
    table.style.borderCollapse = "collapse";
    table.style.fontFamily = "Arial";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    const headers = ["ID", "Name", "Username", "Email"];

    headers.forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.border = "1px solid #333";
      th.style.padding = "10px";
      th.style.backgroundColor = "#f2f2f2";
      th.style.fontWeight = "bold";
      headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    users.forEach((user) => {
      const row = document.createElement("tr");

      [user.id, user.name, user.username, user.email].forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        td.style.border = "1px solid #333";
        td.style.padding = "8px";
        td.style.textAlign = "center";
        row.appendChild(td);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    document.getElementById("tableContainer").appendChild(table);
  })
  .catch(() => {
    const errorMsg = document.createElement("h3");
    errorMsg.textContent = "Failed to load data";
    errorMsg.style.color = "red";
    errorMsg.style.textAlign = "center";
    document.body.appendChild(errorMsg);
  });
