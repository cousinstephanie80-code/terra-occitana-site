/* ==========================
       SIMULATION — LOGIQUE SIMPLE
       ========================== */

    const inPrice = document.getElementById('inPrice');
    const inDuration = document.getElementById('inDuration');
    const lblPrice = document.getElementById('lblPrice');
    const lblDuration = document.getElementById('lblDuration');

    const btnSerenite = document.getElementById('btnSerenite');
    const btnLiberte = document.getElementById('btnLiberte');
    const btnIntendance = document.getElementById('btnIntendance');

    const btnModeNight = document.getElementById('btnModeNight');
    const btnModeWeek  = document.getElementById('btnModeWeek');
    const labelPriceText = document.getElementById('labelPriceText');

    const txtDuration = document.getElementById('txtDuration');
    const resRent = document.getElementById('resRent');
    const resTotalClient = document.getElementById('resTotalClient');
    const resCom = document.getElementById('resCom');
    const resNetOwner = document.getElementById('resNetOwner');

    const state = {
      pack: "Sérénité",
      mode: "night" // night | week
    };

    function setActivePack(btn){
      [btnSerenite, btnLiberte, btnIntendance].forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    }
    function setActiveMode(btn){
      [btnModeNight, btnModeWeek].forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    }

    btnSerenite.addEventListener('click', () => { state.pack = "Sérénité"; setActivePack(btnSerenite); updateCalc(); });
    btnLiberte.addEventListener('click', () => { state.pack = "Liberté"; setActivePack(btnLiberte); updateCalc(); });
    btnIntendance.addEventListener('click', () => { state.pack = "Intendance"; setActivePack(btnIntendance); updateCalc(); });

    btnModeNight.addEventListener('click', () => {
      state.mode = "night";
      setActiveMode(btnModeNight);
      labelPriceText.textContent = "Prix par nuit";
      inDuration.min = 1; inDuration.max = 21;
      if (+inDuration.value < 1) inDuration.value = 1;
      updateCalc();
    });

    btnModeWeek.addEventListener('click', () => {
      state.mode = "week";
      setActiveMode(btnModeWeek);
      labelPriceText.textContent = "Prix semaine";
      inDuration.min = 7; inDuration.max = 21;
      if (+inDuration.value < 7) inDuration.value = 7;
      updateCalc();
    });

    function commissionRate(){
      // indicatif : Sérénité > Liberté > Intendance (plus léger)
      if (state.pack === "Sérénité") return 0.25;
      if (state.pack === "Liberté") return 0.20;
      return 0.15;
    }

    function updateCalc(){
      const price = +inPrice.value;
      const nights = +inDuration.value;

      lblPrice.textContent = price;
      lblDuration.textContent = nights;

      // base séjour : si "week", on considère un prix semaine et on prorate selon la durée
      let rent = price;
      if (state.mode === "week") {
        rent = (price / 7) * nights;
      } else {
        rent = price * nights;
      }

      const rate = commissionRate();
      const totalClient = rent;
      const commission = totalClient * rate;
      const netOwner = totalClient - commission;

      txtDuration.innerText = nights;

      resRent.innerText = Math.round(rent) + " €";
      resTotalClient.innerText = Math.round(totalClient) + " €";
      resCom.innerText = "- " + Math.round(commission) + " €";
      resNetOwner.innerText = Math.round(netOwner) + " €";
    }

    inPrice.addEventListener('input', updateCalc);
    inDuration.addEventListener('input', updateCalc);
    updateCalc();
