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

function update(tab) {
  let message_list = document.getElementById("message-list");

  while (message_list.children.length > 0) {
    message_list.children[0].remove();
  }

  for (msg of tab) {
    let message = document.createElement("li");
    message.innerText = msg["msg"];
    message_list.appendChild(message);
  }
}

document.getElementById("update-button").addEventListener("click", () => update(msgs), false)
