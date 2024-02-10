/* 
*url deki arama parametrsine (search-params) erişme (window nesnesi ile)
*js te tarayıcı ile alakalı verilere erişmek istiyorsak window kullanırız
*içindeki location değeri url detayı verir

*js de url deki arama parametrelerini yönetmeye yarayan yerleşik bi class vardır
*adı (URLSearchParams)
*/

//urldeki parametreleri yönetmemizi sağlayacak bir nesne oluşturduk
const params = new URLSearchParams(window.location.search);

/* 
yukarıdaki classtan örnek almamız sayesinde parametrelere erişmeye ve güncellemeye yarayan metodları kullanabileceğimiz bir nesne oluştu.bizde bu nesnenin içerisindeki get metodu ile parametreler arasındaan isteğimizi çağırdık
*/
const paramId = params.get("id");

//console.log(paramId);

document.addEventListener("DOMContentLoaded", async () => {
  //1 api den verileri al
  const res = await fetch("../db.json");
  const data = await res.json();
  console.log(paramId, data.menu);

  //2 veriler arasından url deki id e denk gelen veriyi al
  //find diziden tek eleman alır
  const product = data.menu.find((item) => item.id == paramId);

  console.log(product);

  //3 sayfa içeriğini elimizdeki veriye göre değiştireceğiz
  renderPage(product);
});

const outlet = document.getElementById("outlet");
function renderPage(product) {
  console.log(product);

  outlet.innerHTML = `
    <!-- ÜST KISIM -->
      <div class="d-flex justify-content-between fs-5">
        <a href="/">
          <img width="40px" src="/images/home.png" />
        </a>
        <p>anasayfa / ${product.category} / ${product.title.toLowerCase()}</p>
      </div>

      <!-- İÇERİK KISMI -->
      <h1 class="text-center my-3 shadow">${product.title}</h1>

      <img
        class="rounded object-fit-cover shadow"
        src="${product.img}"
        alt="oreo"
      />

      <!-- DETAY KISMI -->

      <h3 class="mt-4">
        <span>Ürünün Kategorisi</span>
        <span class="text-success">${product.category}</span>
      </h3>

      <h3 class="mt-4">
        <span>Ürünün Fiyatı</span>
        <span class="text-success">${(product.price *30).toFixed(2)}&#8378</span>
      </h3>

      <p class="lead">${product.desc}</p> 
    `;
}
