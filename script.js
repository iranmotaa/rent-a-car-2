const URL = "http://192.168.56.1:4000/carros";

async function chamarApi() {
  const resp = await fetch(URL);
  const obj = await resp.json();
  console.log(obj);
}
chamarApi()