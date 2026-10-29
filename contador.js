(function () {
  let $ = function (id) {
    return document.getElementById(id);
  };
  let count = 0,
    limit = 45,
    done = false,
    audio = null;

  // Recupera el límite guardado (si existe)
  try {
    let s = parseInt(localStorage.getItem("limite"), 10);
    if (s > 0) limit = s;
  } catch (e) {}
  $("lim").value = limit;

  function render() {
    $("count").textContent = count;
    $("fill").style.width = Math.min(100, (count / limit) * 100) + "%";
    $("rest").textContent = "Faltan " + Math.max(0, limit - count);
  }

  function getAudio() {
    try {
      if (!audio)
        audio = new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === "suspended") audio.resume();
    } catch (e) {
      audio = null;
    }
    return audio;
  }

  // Tono de finalización: cuatro notas ascendentes
  function tone() {
    let ctx = getAudio();
    if (!ctx) return;
    let notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach(function (f, i) {
      let o = ctx.createOscillator(),
        g = ctx.createGain();
      let t = ctx.currentTime + i * 0.16;
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.4, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.3);
    });
  }

  function vibrate(pattern) {
    try {
      if (navigator.vibrate) navigator.vibrate(pattern);
    } catch (e) {}
  }

  function finish() {
    done = true;
    vibrate([300, 120, 300, 120, 600]);
    tone();
    $("msg").textContent =
      "Llegaste a " + limit + (limit === 1 ? " toque." : " toques.");
    $("over").classList.add("show");
  }

  function tap() {
    if (done) return;
    getAudio();
    count++;
    render();
    let p = $("pad");
    p.classList.add("hit");
    setTimeout(function () {
      p.classList.remove("hit");
    }, 70);
    if (count >= limit) finish();
    else vibrate(12);
  }

  function reset() {
    count = 0;
    done = false;
    $("over").classList.remove("show");
    render();
  }

  function setLimit(n) {
    n = parseInt(n, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 9999) n = 9999;
    limit = n;
    $("lim").value = n;
    try {
      localStorage.setItem("limite", String(n));
    } catch (e) {}
    reset();
  }

  $("pad").addEventListener("pointerdown", function (e) {
    e.preventDefault();
    tap();
  });
  $("pad").addEventListener("click", function (e) {
    if (e.detail === 0) tap();
  });
  $("reset").addEventListener("click", reset);
  $("again").addEventListener("click", reset);
  $("minus").addEventListener("click", function () {
    setLimit(limit - 1);
  });
  $("plus").addEventListener("click", function () {
    setLimit(limit + 1);
  });
  $("lim").addEventListener("change", function () {
    setLimit(this.value);
  });

  render();
})();
