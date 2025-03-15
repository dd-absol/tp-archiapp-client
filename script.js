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
  { "msg": "Hello World" },
  { "msg": "Blah Blah" },
  { "msg": "I love cats" }
];

const baseUrl = 'http://localhost:8080/msg'

console.log(baseUrl + "/getAll");

fetch(`${baseUrl}/getAll`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    msgs = data.map((msg) => { return { "msg": msg }; });
    update(msgs);
  });

function update(tab) {
  let message_list = document.getElementById("message-list");

  message_list.innerHTML = "";

  for (msg of tab) {
    let message = document.createElement("li");
    message.innerText = msg["msg"];
    message_list.appendChild(message);
  }
}

function send_message(tab) {
  const new_message = document.getElementById("message-text").value;
  console.log(new_message);

  if (new_message.length > 0) {
    fetch(`${baseUrl}/post/${new_message}`)
      .then((response) => {
        if (response.status == 200) {
          tab.push({ "msg": new_message });
        }
      }).then(() => {
        update(tab);
      })
  } else {
    update(tab);
  }
}

document.getElementById("update-button").addEventListener("click", () => send_message(msgs), false)

