function addDynamicJS() {
  const dyn = document.createElement("p");
  const hr = document.createElement("hr");
  dyn.classList.add("dynamic-css");
  dyn.innerHTML = `Added by JS <b>file</b> on <b>click</b> with <b>class=dynamic-css</b> defined by <b>CSS file</b>`;
  document.body.appendChild(hr);
  document.body.appendChild(dyn);
}

window.addEventListener("load", () => {
  const timeout = setTimeout(() => {
    const hr = document.createElement("hr");
    const used = document.createElement("p");
    used.classList.add("used-css");
    used.innerHTML = `Added by JS  <b>file</b> on <b>load</b> + 10ms with <b>class=used-css</b> defined by <b>CSS file</b>`;

    const button = document.createElement("button");
    button.onclick = addDynamicJS;
    button.innerHTML = `Add Dynamic by JS file`;

    document.body.appendChild(hr);
    document.body.appendChild(used);
    document.body.appendChild(button);
    clearTimeout(timeout);
  }, 10);
});
