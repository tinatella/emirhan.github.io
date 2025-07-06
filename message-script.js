const messageText = `Doğum Günün Kutlu Olsun! 🎂

"İyi ki doğdun.

Bugün senin doğum günün ve her şeyden önce sana iyi ki varsın demek istedim. Hayatımda geçirdiğim en güzel, en öğretici yedi aydan biri seninleydi. Çok değerli, çok gerçekti... Her şey için teşekkür ederim. Oyunlar, geceler boyu konuşmalar, birlikte geçirdiğimiz anlar... Valorant’ta senin sinirlendiğin o anları bile özlüyorum çünkü ben seni orada bile anlamaya çalıştım. Ve biliyor musun, bir süre sonra gerçekten sakinleşmeye başlamıştın. O küçük değişimi görmek bile içimi ısıtmıştı.

RDR2’yi birlikte oynarız diye almıştım. Harçlığımı bekledim, planlar kurdum... Oyun hala açılmadı. Sanırım hala içinde sen olmayan bir dünyaya girmeye hazır değilim.
Sigarayı bırakmaya çalıştığın günleri hatırlıyorum. Seni ne kadar düşündüğümü şimdi daha iyi anlıyorum. Senin yanında sigarayı sevmememe rağmen otururdum, sen de hep dumanı benden uzak tutardın. Küçük bir hareket ama içimde iz bırakanlardan.

Bugün senin doğum günün ve biliyorum, belki de artık bazı şeyler eskisi gibi olmayacak. Belki de hiçbir şey aynı kalmayacak. Ama bilmeni isterim ki... O zamanlar farkında olmadan seni çok sıktım, hatalar yaptım, daha çok sevmeyi sandığım şey aslında seni kısıtlamaktı. Özür dilerim. Gerçekten.

Bugün artık aynı ben değilim. Yaşadıklarımız bana çok şey öğretti. Eğer bir gün yolu tekrar kesişirse iki kere düşünmeden geçmeyeceğim bir sokak varsa, o da senin kalbin olurdu. Ama bugün sadece doğum günün. Gülümsemeni ve en azından bir anlığına eski güzel şeyleri hatırlamanı isterim.

Nice mutlu yaşlara…"

💌`;

let displayed = "";
let skip = false;
let done = false;
let currentIndex = 0;
let animationInterval;

function startAnimation() {
  const messageElement = document.getElementById('messageText');
  const skipContainer = document.getElementById('skipContainer');
  
  displayed = "";
  done = false;
  currentIndex = 0;
  messageElement.textContent = "";
  
  if (skip) {
    messageElement.textContent = messageText;
    done = true;
    skipContainer.classList.add('hidden');
    return;
  }
  
  animationInterval = setInterval(() => {
    if (currentIndex < messageText.length) {
      displayed += messageText.charAt(currentIndex);
      messageElement.textContent = displayed;
      currentIndex++;
    } else {
      clearInterval(animationInterval);
      done = true;
      skipContainer.classList.add('hidden');
    }
  }, 35);
}

function skipAnimation() {
  skip = true;
  if (animationInterval) {
    clearInterval(animationInterval);
  }
  
  const messageElement = document.getElementById('messageText');
  const skipContainer = document.getElementById('skipContainer');
  
  messageElement.textContent = messageText;
  done = true;
  skipContainer.classList.add('hidden');
}

function goToGallery() {
  // Galeri sayfasına yönlendirme - şimdilik alert gösterelim
  alert('Galeri sayfası henüz hazır değil! 📸');
}

function goBack() {
  // Ana sayfaya geri dön
  window.location.href = 'index.html';
}

// Sayfa yüklendiğinde animasyonu başlat
window.addEventListener('DOMContentLoaded', startAnimation);