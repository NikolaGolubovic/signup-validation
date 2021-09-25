const inputs = document.querySelectorAll("input");
const nodeMsgsContainer = document.querySelectorAll(".valid-msgs");
const btn = document.querySelector("button");

const validMsgs = {
  "first-name": [
    {
      empty: "Please tell us what is your first Name?",
    },
    { min2: "Your name must be longer than one character and shorter than 20" },
  ],
  "second-name": [
    { empty: "Please tell us what is your second name?" },
    { min2: "Your name must be longer than one character and shorter than 20" },
    { "invalid-name": "Your name must contain only alphabet letters" },
  ],
  email: [
    { empty: "You need to provide valid email to move further" },
    { "invalid-email": "Please provide us your vallid e-mail" },
  ],
  password: [
    { empty: "Please tell us what is your second name?" },
    {
      min5: "Your password must be longer than five character and shorter than 20",
    },
  ],
};

function hasNumber(myString) {
  return /\d/.test(myString);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkFirst(val) {
  const msgs = [];
  if (!val) {
    msgs.push("empty");
  }
  if (val.length < 2 || val.length >= 20) {
    msgs.push("min2");
  }
  if (val && hasNumber(val)) {
    msgs.push("invalid-name");
  }
  return msgs;
}

function checkSecond(val) {
  console.log(val);
  const msgs = [];
  if (!val) {
    msgs.push("empty");
  }
  if (val.length < 2 || val.length >= 20) {
    msgs.push("min2");
  }
  if (hasNumber(val)) {
    msgs.push("invalid-name");
  }
  return msgs;
}

function checkEmail(val) {
  const msgs = [];
  if (!val) {
    msgs.push("empty");
  }
  if (!validateEmail(val)) {
    msgs.push("invalid-email");
  }
  return msgs;
}

function checkPassword(val) {
  const msgs = [];
  if (!val) {
    msgs.push("empty");
  }
  if (val.length < 5 || val.length >= 20) {
    msgs.push("min5");
  }
  return msgs;
}

function appendInvalidMsgs() {
  const firstMsgs = checkFirst(inputs[0].value);
  const secondMsgs = checkSecond(inputs[1].value);
  const emailMsgs = checkEmail(inputs[2].value);
  const passwordMsgs = checkPassword(inputs[3].value);
  const arrMsgs = [firstMsgs, secondMsgs, emailMsgs, passwordMsgs];
  nodeMsgsContainer.forEach((node, index) => {
    node.innerHTML = "";
    if (arrMsgs[index]?.length > 0) {
      validMsgs[node.dataset.id].forEach((msg) => {
        const values = [];
        for (let key in msg) {
          if (arrMsgs[index].includes(key)) {
            values.push(msg[key]);
          }
        }
        values.forEach((value) => {
          node.previousElementSibling.classList.add("invalid");
          const p = document.createElement("p");
          p.textContent = value;
          node.appendChild(p);
        });
      });
    }
  });
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  appendInvalidMsgs();
});

inputs.forEach((input) =>
  input.addEventListener("keydown", function (e) {
    if (this.classList.contains("invalid")) {
      this.classList.remove("invalid");
      appendInvalidMsgs();
    }
  })
);
