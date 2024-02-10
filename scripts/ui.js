import { buttonData } from "./constants.js";

//html den buton divini çağırdık(button func ta kullanabilmek için)
const buttonsArea = document.getElementById("buttons");

//html den menu list divini çağırdık
const menuList = document.getElementById("menu-list");

//arayüz değişikliği yapan bütün fonksiyonları bu dosyada tutacağız

//*menu ögelerini ekrana basan fonksiyon
export const renderMenuItems = (data) => {
  //data dizisindeki her bir obje için bi tane kart html i oluştur
  //.join('') methodu diziyi metine çevirmemizi sağladı
  const cardsHTML = data
    .map(
      (item) => `<a
  id="card"
  href="/detail.html?id=${item.id}"
  class="d-flex flex-column flex-md-row text-decoration-none text-dark gap-3"
>
  <img
    class="rounded shadow img-fluid"
    src="${item.img}"
    alt=""
  />

  <div>
    <div class="d-flex justify-content-between">
      <h5>${item.title}</h5>
      <p class="text-success fw-bold">${(item.price * 30).toFixed(2)}&#8378; 

      </p>
    </div>
    <p class="lead">
      ${item.desc}
    </p>
  </div>
</a>
  `
    )
    .join("");

  //oluşturulan kartları #menuList divinin içine aktar
  menuList.innerHTML = cardsHTML;

  //``alt satırda da metin yazmamıa izin verir
};
/* forEach geriye dizi döndürmez o yüzden dizi döndüren map i kullandık. !!arrow functa {} parantez kullanmadığımızda otomatik olarak arrow func bunu tamamlar ve temiz kod elde etmiş oluruz */

//dizideki her bir eleman için ekrana buton basan func
export const renderButtons = (activeText) => {
  //eskiden oluşturulan butonları kaldır
  buttonsArea.innerHTML = '';

  //butonların her biri için aşağıdaki adımları izle
  buttonData.forEach((btn) => {
    //1) buton elementi oluştur
    const buttonEle = document.createElement("button");

    //2) class belirle
    buttonEle.className = "btn btn-outline-dark";

    //3) data-id değerlini tanımla //setAttribute (data-id ,class,id,src vs..)
    buttonEle.setAttribute("data-id", btn.value);

    //4)içindeki yazıyı belirle
    buttonEle.innerText = btn.text;

    //5)eğerki butonunyazısı aktif yazı ile eşleşirse bg yi siyah yap
    if(btn.text === activeText){
      buttonEle.classList.add('btn-dark', 'text-white')
    }

    //6)butonu dom (HTML) e gönder
    buttonsArea.appendChild(buttonEle);
   
  });
};
