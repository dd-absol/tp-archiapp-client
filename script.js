function fact(n) {
  if (n == 0) {
    return 1;
  }

  return n * fact(n - 1)
}

function applique(f, tab) {
  let result_tab = [];

  for (elem of tab) {
    result_tab.push(f(elem))
  }

  return result_tab;
}

console.log(applique(fact, [1, 2, 3, 4, 5, 6]));
console.log(applique(function(n) { return (n + 1); }, [1, 2, 3, 4, 5, 6]));

msgs = [
  { "author": "me", "msg": "Hello World" },
  { "author": "me", "msg": "Blah Blah" },
  { "author": "me", "msg": "I love cats" }
];


function update(tab) {
  const baseUrl = document.getElementById("server-text").value;
  let message_list = document.getElementById("message-list");

  message_list.innerHTML = "";

  fetch(`${baseUrl}/msg/getAll`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      tab = data;
    }).then(() => {
      for (msg of tab) {
        let message = document.createElement("li");
        message.innerText = `${msg["author"]}: ${msg["msg"]}`;
        message_list.appendChild(message);
      }
    });
}

function send_message(tab) {
  const author = document.getElementById("author-text").value;
  const baseUrl = document.getElementById("server-text").value;
  const new_message = document.getElementById("message-text").value;

  const msg = {
    "msg": new_message,
    "author": author
  };

  console.log(msg);

  if (new_message.length > 0) {
    fetch(`${baseUrl}/msg/post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(msg)
    })
      .then((response) => {
        if (response.status != 200) {
          alert("Message could not be sent");
        }
      }).then(() => {
        update(tab);
      })
  }
}

document.getElementById("update-button").addEventListener("click", () => send_message(msgs), false);
document.getElementById("refresh-button").addEventListener("click", () => update(msgs), false);

