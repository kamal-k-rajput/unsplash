import {navbar} from "/components/sidebar.js";

let access_key = "K962ej_SvQjkMaFXxQ4q70ty-nqlwcQ2sGQ5V-VvuA8";

let parent = document.getElementById("main");
let sidebar = document.getElementById("sidebar");
sidebar.innerHTML = navbar();

let search = document.getElementById("search_term");
search.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    forResult();
  }
});

let forResult = async () => {
  let value = search.value;
  let final_url = `https://api.unsplash.com/search/photos/?query=${value}&per_page=40&client_id=${access_key}`;
  // console.log(final_url);
  let result = await getdata(final_url);
  parent.innerHTML = "";
  showdata(result.results, parent);
  // console.log(result);
};
let getdata = async (final_url) => {
  let res = await fetch(final_url);

  let data = await res.json();
  return data;
};

let showdata = async (data, parent) => {
  data.forEach(function (el) {
    console.log(el.urls.full);

    let div = document.createElement("div");
    div.addEventListener("click", () => {
      sendData(el);
      console.log("clicked");
    });
    let img = document.createElement("img");
    img.src = el.urls.small;
    let p = document.createElement("p");
    p.textContent = el.user.name;
    div.append(img, p);
    parent.append(div);
  });
  console.log(data);
};
let sendData = (data) => {
  window.location.href = "search.html";
  localStorage.setItem("img_data", JSON.stringify(data));
};
// forResult();
