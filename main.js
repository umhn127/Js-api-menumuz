//*diğer dosyalardan alınan veriler
import { renderMenuItems, renderButtons } from "./scripts/ui.js";

//htmlden buton alanını js e çağırdık
const buttonsArea = document.getElementById("buttons");

//*datayı global scope'da tanımla
let data; //dataya dışarıdan da erişebilmemiz için fetchMenu func dışında tanımladık

//*menü verilerini json dosyasından çeken fonksiyon
async function fetchMenu() {
  //*api den verileri al
  const res = await fetch("./db.json");

  //*json verisini js e çevir
  data = await res.json();

  //console.log(data);
}

//!sayfa yükleme olayını izle (addEventListener)
/* olay izleyicisi iki parametre alır.1 olayın ismi,2 olay gerçekleşince tetiklenecek func */
window.addEventListener("DOMContentLoaded", () => {
  //ekrana butonları bas
    renderButtons("Hepsi")

  //verileri çeken fonksiyonu çalıştır
  fetchMenu()

    //fonksiyon başarılı olursa ekrana kartları basan fonksiyonu çalıştır
    .then(() =>
      renderMenuItems(data.menu)
    ); /* ui da tanımladığımız fonksiynu çağırdık parametre olarak datayı gönderdik ui a,böylelikle ui da verilere erişebildik */
  //console.log(data);
});
/* olay izleyicisinde dataya ulaşmak istersek console.log ile async await kullanmalıyız.eğer ulaşmayacaksak async await e gerek yoktur */

//!butonlara tıklanma olayını izle
//event paramı olay hakkındaki bilgileri edinmemizi sağlar
//target butonları filtreliyor
buttonsArea.addEventListener("click", (event) => {
  //butona tıklanmadıysa fonksiyonu durdur
  if (event.target.id == "buttons") return; //return 1.fonksiyonda değer döndürür 2.fonksiyonu durdurur

  //active olan butonu belirlemek için butonları ekrana tekrar bas
  renderButtons(event.target.innerText)

  //*filtrenecek kategori ismini belirle(hepsi kahvaltı vs. bunların ing.olarak hangi kategotiye tekabül ettiğini belirldik....)
  const selectedCategory = event.target.dataset.id; //console.log yerine => console.dir = html elementinin detaylı bilgisini verir

  if (selectedCategory === "all") {
    //?eğer hepsi seçeneği seçildiyse
    //bütün menü elemanlarını filtrelemeden ekrana bas
    renderMenuItems(data.menu);
  } else {
    //?eğer hepsi seçeneği seçilmediyse
    //ürünlerin arasından kategori ismi bizim seçtiğimize eşit olanları al
    const filtered = data.menu.filter(
      (item) => item.category === selectedCategory
    );

    //filtrelenen menüyü ekrana bas
    renderMenuItems(filtered);
  }
});
