// Quiz questions. The FIRST option in each list is the correct answer;
// the order of questions and answers is shuffled every time someone plays.
const QUESTIONS = [
  { q: "Which country won the very first FIFA World Cup in 1930?", options: ["Uruguay", "Brazil", "Argentina", "Italy"], fact: "Uruguay hosted the first tournament and beat Argentina 4–2 in the final." },
  { q: "How many men's World Cups has Brazil won, more than any other country?", options: ["5", "3", "4", "6"], fact: "Brazil won in 1958, 1962, 1970, 1994 and 2002." },
  { q: "Which country won the 2022 World Cup in Qatar?", options: ["Argentina", "France", "Croatia", "Morocco"], fact: "Argentina beat France on penalties after a thrilling 3–3 draw." },
  { q: "Who scored the famous 'Hand of God' goal against England in 1986?", options: ["Diego Maradona", "Pelé", "Johan Cruyff", "Zinedine Zidane"], fact: "Minutes later he scored the 'Goal of the Century', dribbling past five England players." },
  { q: "Which player has won the most Ballon d'Or awards?", options: ["Lionel Messi", "Cristiano Ronaldo", "Michel Platini", "Johan Cruyff"], fact: "Messi has won the Ballon d'Or eight times. Cristiano Ronaldo has won it five times." },
  { q: "Which country hosted the 2018 World Cup?", options: ["Russia", "Qatar", "Germany", "Brazil"], fact: "France beat Croatia 4–2 in the final in Moscow." },
  { q: "How many players does each team have on the pitch during a match?", options: ["11", "10", "9", "12"], fact: "That includes the goalkeeper, so ten outfield players and one keeper." },
  { q: "What colour card means a player is sent off the pitch?", options: ["Red", "Yellow", "Blue", "Green"], fact: "Two yellow cards in one match also add up to a red." },
  { q: "Which club is nicknamed 'The Red Devils'?", options: ["Manchester United", "Liverpool", "Arsenal", "Bayern Munich"], fact: "Manchester United play at Old Trafford, nicknamed the 'Theatre of Dreams'." },
  { q: "Which Brazilian legend is known as 'The King' of football?", options: ["Pelé", "Ronaldinho", "Romário", "Neymar"], fact: "Pelé won three World Cups, the first when he was just 17 years old." },
  { q: "Which country won Euro 2024?", options: ["Spain", "England", "France", "Germany"], fact: "Spain beat England 2–1 in the final, and Lamine Yamal became a star at only 16." },
  { q: "Who scored the winning goal in the 2010 World Cup final?", options: ["Andrés Iniesta", "David Villa", "Xavi", "Fernando Torres"], fact: "Iniesta scored in extra time as Spain beat the Netherlands 1–0." },
  { q: "How long is a normal football match, not counting extra time?", options: ["90 minutes", "80 minutes", "100 minutes", "120 minutes"], fact: "Two halves of 45 minutes, plus any added time the referee decides." },
  { q: "Which club has won the Champions League (European Cup) more times than any other?", options: ["Real Madrid", "AC Milan", "Liverpool", "Bayern Munich"], fact: "Real Madrid won the first five European Cups in a row, from 1956 to 1960." },
  { q: "What is the name of Barcelona's famous home stadium?", options: ["Camp Nou", "Santiago Bernabéu", "Anfield", "San Siro"], fact: "Camp Nou means 'new field' in Catalan and is the largest stadium in Europe." },
  { q: "Which English club plays its home games at Anfield?", options: ["Liverpool", "Everton", "Manchester United", "Leeds United"], fact: "Liverpool fans sing 'You'll Never Walk Alone' before every match." },
  { q: "Which country does striker Erling Haaland play for?", options: ["Norway", "Sweden", "Denmark", "Finland"], fact: "Haaland scored a record 36 Premier League goals in his first season at Manchester City." },
  { q: "What does 'VAR' stand for in football?", options: ["Video Assistant Referee", "Very Accurate Referee", "Visual Action Replay", "Video Action Review"], fact: "VAR helps referees check goals, penalties and red cards using video." },
  { q: "Which country won the 2014 World Cup in Brazil?", options: ["Germany", "Argentina", "Netherlands", "Brazil"], fact: "Mario Götze scored in extra time to beat Argentina 1–0 in the final." },
  { q: "Which Liverpool star is nicknamed 'The Egyptian King'?", options: ["Mohamed Salah", "Riyad Mahrez", "Sadio Mané", "Pierre-Emerick Aubameyang"], fact: "Salah has won the Premier League Golden Boot several times." },
  { q: "What is it called when one player scores three goals in a single match?", options: ["A hat-trick", "A treble", "A triple-shot", "A triangle"], fact: "The term comes from cricket, where a bowler taking three wickets in a row earned a new hat." },
  { q: "Who scored a hat-trick in the 2022 World Cup final, even though his team lost?", options: ["Kylian Mbappé", "Lionel Messi", "Olivier Giroud", "Antoine Griezmann"], fact: "Mbappé's three goals made him only the second player ever to score a hat-trick in a World Cup final." },
  { q: "Who is Arsenal's all-time top goalscorer?", options: ["Thierry Henry", "Ian Wright", "Dennis Bergkamp", "Robin van Persie"], fact: "Henry scored 228 goals for Arsenal and has a statue outside the Emirates Stadium." },
  { q: "Which team went through the whole 2003–04 Premier League season unbeaten?", options: ["Arsenal", "Chelsea", "Manchester United", "Liverpool"], fact: "They were nicknamed 'The Invincibles' and won the league without losing a single game." },
  { q: "Which club did Paolo Maldini play for during his entire 25-year career?", options: ["AC Milan", "Juventus", "Inter Milan", "Roma"], fact: "Maldini won the Champions League five times with AC Milan." },
  { q: "Which rule stops an attacker from waiting near the goal ahead of the last defender?", options: ["Offside", "Handball", "Advantage", "Dropped ball"], fact: "A player is offside if they are nearer the goal line than the ball and the second-last defender when the pass is played." },
  { q: "Which country has won the most Women's World Cups?", options: ["United States", "Germany", "Japan", "Norway"], fact: "The USA has won four, in 1991, 1999, 2015 and 2019." },
  { q: "Which English club won the treble (league, FA Cup and Champions League) in 2022–23?", options: ["Manchester City", "Arsenal", "Chelsea", "Liverpool"], fact: "Pep Guardiola's side were the second English team ever to win all three in a single season." },
  { q: "Which country did Zinedine Zidane help win the World Cup in 1998?", options: ["France", "Algeria", "Italy", "Spain"], fact: "Zidane scored two headers in the final as France beat Brazil 3–0." },
  { q: "Which country did Johan Cruyff, inventor of the 'Cruyff Turn', play for?", options: ["Netherlands", "Belgium", "Germany", "Denmark"], fact: "He unveiled the famous turn at the 1974 World Cup against Sweden." },
];

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const BEST_KEY = "ppfc-quiz-best";
  const LABELS = ["A", "B", "C", "D"];
  const RATINGS = [
    { min: 0, emoji: "🌱", title: "Rookie", text: "Everyone starts somewhere. Have another go and watch your score grow!" },
    { min: 10, emoji: "🔄", title: "Substitute", text: "You're warming up on the bench. A few more games and you'll be in the team." },
    { min: 18, emoji: "👕", title: "Starting XI", text: "Solid! You know your football and you've earned your place in the team." },
    { min: 24, emoji: "🧢", title: "Team Captain", text: "Brilliant! You really know your stuff. Almost a perfect game." },
    { min: 30, emoji: "🏆", title: "Football Legend", text: "PERFECT SCORE! You answered every single question correctly. Ballon d'Or material!" },
  ];

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  let order, index, score, locked, current;

  function getBest() {
    try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch (_) { return 0; }
  }
  function saveBest(n) {
    try { localStorage.setItem(BEST_KEY, String(n)); } catch (_) { /* storage unavailable */ }
  }

  function show(name) {
    ["start", "quiz", "result"].forEach((s) => { $("screen-" + s).hidden = s !== name; });
    window.scrollTo({ top: $("quiz-top").offsetTop - 80, behavior: "smooth" });
  }

  function updateBestLabel() {
    const best = getBest();
    $("best-score").textContent = best ? `Your best score: ${best} / ${QUESTIONS.length}` : "";
  }

  function start() {
    order = shuffle(QUESTIONS);
    index = 0;
    score = 0;
    show("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    locked = false;
    const item = order[index];
    current = {
      correct: item.options[0],
      options: shuffle(item.options),
      fact: item.fact,
    };
    $("q-count").textContent = `Question ${index + 1} of ${order.length}`;
    $("q-score").textContent = `⚽ ${score}`;
    $("q-bar").style.width = (index / order.length) * 100 + "%";
    $("q-text").textContent = item.q;

    const box = $("q-options");
    box.innerHTML = "";
    current.options.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.innerHTML = '<span class="quiz-key"></span><span class="quiz-text"></span>';
      btn.firstChild.textContent = LABELS[i];
      btn.lastChild.textContent = text;
      btn.addEventListener("click", () => answer(btn, text));
      box.appendChild(btn);
    });

    const fb = $("q-feedback");
    fb.hidden = true;
    fb.className = "quiz-feedback";
    $("q-next").hidden = true;
    $("q-next").textContent = index === order.length - 1 ? "See my score 🏁" : "Next question →";
  }

  function answer(btn, text) {
    if (locked) return;
    locked = true;
    const right = text === current.correct;
    if (right) score++;

    [...$("q-options").children].forEach((b) => {
      b.disabled = true;
      const t = b.querySelector(".quiz-text").textContent;
      if (t === current.correct) b.classList.add("correct");
      else if (b === btn) b.classList.add("wrong");
    });

    const fb = $("q-feedback");
    fb.hidden = false;
    fb.classList.add(right ? "is-right" : "is-wrong");
    $("fb-title").textContent = right ? "✅ Correct!" : "❌ Not quite";
    $("fb-text").textContent = (right ? "" : `The answer is ${current.correct}. `) + current.fact;
    $("q-score").textContent = `⚽ ${score}`;
    $("q-bar").style.width = ((index + 1) / order.length) * 100 + "%";
    $("q-next").hidden = false;
    $("q-next").focus();
  }

  function next() {
    index++;
    if (index >= order.length) return finish();
    renderQuestion();
  }

  function finish() {
    const total = order.length;
    const rating = [...RATINGS].reverse().find((r) => score >= r.min);
    const previousBest = getBest();
    const isBest = score > previousBest;
    if (isBest) saveBest(score);

    $("r-emoji").textContent = rating.emoji;
    $("r-score").textContent = `${score} / ${total}`;
    $("r-title").textContent = rating.title;
    $("r-text").textContent = rating.text;
    $("r-best").textContent = isBest ? "🎉 New personal best!" : `Your best score: ${Math.max(score, previousBest)} / ${total}`;
    updateBestLabel();
    show("result");
  }

  $("btn-start").addEventListener("click", start);
  $("q-next").addEventListener("click", next);
  $("btn-again").addEventListener("click", start);

  document.addEventListener("keydown", (e) => {
    if ($("screen-quiz").hidden || locked) return;
    const i = ["1", "2", "3", "4"].indexOf(e.key);
    if (i > -1 && $("q-options").children[i]) $("q-options").children[i].click();
  });

  $("total-questions").textContent = QUESTIONS.length;
  updateBestLabel();
})();
