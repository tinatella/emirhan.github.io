const flame = document.getElementById("flame");

let audioContext,
  analyser,
  micStream,
  dataArray,
  blowing = false,
  micStarted = false,
  blowCount = 0,
  candleExtinguished = false;

function waveFlame() {
  if (flame.classList.contains("wave") || candleExtinguished) return;
  
  flame.classList.add("wave");
  
  // İkinci üfleyişte dalgalandıktan sonra söndür
  if (blowCount === 2) {
    setTimeout(() => {
      flame.classList.remove("wave");
      extinguishCandle();
    }, 600);
  } else {
    setTimeout(() => {
      flame.classList.remove("wave");
    }, 600);
  }
}

function extinguishCandle() {
  candleExtinguished = true;
  flame.style.display = "none";
  
  // Tıkla butonu oluştur
  const button = document.createElement("button");
  button.innerHTML = "Tıkla 💌";
  button.className = "click-button";
  
  // Butona tıklama eventi ekle
  button.addEventListener('click', function() {
    // message.html sayfasına yönlendir
    window.location.href = 'message.html';
  });
  
  // Butonu başlık bölümünün altına ekle
  const container = document.querySelector(".container");
  const h1Element = container.querySelector("h1");
  
  // Butonu h1'in hemen sonrasına ekle
  h1Element.insertAdjacentElement('afterend', button);
}

function startMic() {
  if (micStarted) return;
  micStarted = true;

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    micStream = audioContext.createMediaStreamSource(stream);
    micStream.connect(analyser);
    analyser.fftSize = 1024;
    dataArray = new Uint8Array(analyser.fftSize);

    function detectBlow() {
      if (candleExtinguished) {
        requestAnimationFrame(detectBlow);
        return;
      }
      
      analyser.getByteTimeDomainData(dataArray);
      let maxAmp = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const amp = Math.abs(dataArray[i] - 128);
        if (amp > maxAmp) maxAmp = amp;
      }

      if (maxAmp > 44 && !blowing) {
        blowing = true;
        blowCount++;
        waveFlame();
        
        setTimeout(() => (blowing = false), 1000);
      }

      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  }).catch((error) => {
    console.log("Mikrofon erişimi reddedildi veya mevcut değil:", error);
    // Mikrofon erişimi yoksa direkt butonu göster
    setTimeout(() => {
      extinguishCandle();
    }, 3000);
  });
}

window.addEventListener("DOMContentLoaded", startMic);