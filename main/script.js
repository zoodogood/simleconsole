const
  active  = document.getElementById("active"),
  letters = "/\\()\"':,.;<>~!@#$%^&*|+=[]{}`?-…0123456789 _бБхХъЪ".split("");
let messages = [], currentMode, awaitSend = false;


function delay(ms) {
  return new Promise((response) => setTimeout(response, ms));
}

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

async function begin(){
  await delay(300)
  send("MiniConsole")
  send("use help")
  send("")
  await delay(250)
  active.childNodes[1].textContent = ".";
  await delay(250)
  active.childNodes[1].textContent += ".";
  await delay(250)
  active.childNodes[1].textContent += ".";
  await delay(250)
  clear();
  await delay(750)
  active.childNodes[1].textContent = "y...";
  await delay(100)
  active.childNodes[1].textContent = "dy...";
  await delay(95)
  active.childNodes[1].textContent = "ady...";
  await delay(90)
  active.childNodes[1].textContent = "eady...";
  await delay(85)
  active.childNodes[1].textContent = "Ready...";
  await delay(80)
  active.childNodes[1].textContent = "ᅠReady...";
  active.childNodes[1].textContent = "";
  send("ᅠReady...")
  await delay(350)
  active.insertAdjacentHTML('beforeend', "<b id = 'cursor'>▃</b>");

  document.addEventListener("keydown", (e) => {
    if ((e.key == "Escape" || (e.code == "KeyC" && e.ctrlKey)) && currentMode) return send("^C"), currentMode = undefined, active.childNodes[0].textContent = " > ";
    if (e.key == "Backspace") return active.childNodes[1].textContent = active.childNodes[1].textContent.substring(0, active.childNodes[1].textContent.length - 1);
    if (e.key == "Enter") return send(active.childNodes[1].textContent), active.childNodes[1].textContent = "";
    if (e.code[0] == "K" || letters.includes(e.key)) active.childNodes[1].textContent += e.key;
  });
  document.body.focus();
  console.clear();
}

function send(msg, system){
  //if (msg.includes("\n")) msg = "\n" + msg;
  msg = String(msg).replace(/\n/g, "\n > ")
  active.insertAdjacentHTML("beforebegin", `<div>${currentMode ? " < " + currentMode : ""} > ${msg} </div>`);
  messages.push(active.previousSibling);
  if (msg === undefined || system || (currentMode && currentMode.includes("system"))) return;
  try {
    code = eval(msg);
    if (code instanceof Function) throw "is func"
  }
  catch(e){
    try {
      let spl = msg.match(/".+?"|(\w|\S)+/g);
      code = eval(spl[0] + "(" + spl.slice(1).map(el => (el.includes("\"")) ? el : "'" + el + "'").join(",") + ")")
    }
    catch(e){
      return console.log(e);
    }
  }
  finally{
    active.childNodes[0].textContent = (currentMode ? " < " + currentMode : "") + " > ";
    awaitSend = false;
  }
  if (code === undefined) return;
  active.insertAdjacentHTML("beforebegin", `<div>// ${code} </div>`);
  messages.push(active.previousSibling);
}


function clear() {
  messages.forEach((el, i) => {
    el.remove();
    el.delete = true;
  });
  //messages.filter(el => !el.delete)
}
begin();

function mode(mod){
  if (!mod) return send("Список режимов \n1. formula \n2. b\n3. c");
  currentMode = mod;
}
//реализовать через "режимы" не вышло, но сами по себе они прикольные

function formula(a, b){
  if (!(a - 3*b)) return "Ошибка: деление на 0 или отсуствующие аргументы"
  return (a + 2*b) / (a - 3*b)
}

function strange (x){
  //if (x < 5 && x > -3) return x * 2 - 12;никогда не будет истиной
  return 7 - x * 8;
}

function biggest (a, b){
  if (a == b) return "Числа равны"
  if (a < b) return "Второе число больше!"
  return "Первое число больше!"
}

function help(){
  return send("Я даже не помню что значит `formula 3 1`...");
}

function getCoin(coinsPerO, timeout, time){
  let thisMode = currentMode;
  let oreo = Number(0), coins = Number(0);
  for (var i = 0; i < time; i++) {
    if (i % timeout == 0) send(++oreo);
    coins += coinsPerO * oreo;
    send("$" + coins);
  }
  send(`
    CPO: ${coinsPerO}
    Timeout: ${timeout}
    AllTime: ${time}
    Input: ${coins}
    `)
    currentMode = thisMode
}
