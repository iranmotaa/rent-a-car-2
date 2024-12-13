const URL = "http://10.1.1.245:4000/carros";

async function chamarApi() {
  const resp = await fetch(URL);
  const obj = await resp.json();
  console.log(obj);
}
chamarApi()