// Daily tips. A new diet tip and skill drill are picked each day from these lists.
const DIET_TIPS = [
  { icon: "💧", title: "Drink before you're thirsty", text: "Sip water through the day, not just at training. By the time you feel thirsty, your body is already running low." },
  { icon: "🍌", title: "Bananas are a footballer's snack", text: "Easy to carry and quick to digest, a banana an hour before training gives you steady energy for the session." },
  { icon: "🍳", title: "Never skip breakfast", text: "Eggs, oats, wholegrain toast or yoghurt with fruit fuel your morning and help you concentrate at school and on the pitch." },
  { icon: "🍝", title: "Carbs are your fuel", text: "Pasta, rice, potatoes and bread give your muscles the energy they need to keep running hard until the final whistle." },
  { icon: "🍗", title: "Protein helps you recover", text: "Chicken, fish, eggs, beans, lentils and milk help your muscles repair and get stronger after training." },
  { icon: "🌈", title: "Eat the rainbow", text: "Try to get lots of different coloured fruit and vegetables each day. Every colour brings different vitamins." },
  { icon: "🥛", title: "Strong bones need calcium", text: "Milk, yoghurt and cheese help build strong bones, which is important for young players who are still growing." },
  { icon: "⏰", title: "Time your meals", text: "Have a main meal 2–3 hours before a match so you have energy without feeling heavy or full when you play." },
  { icon: "🥤", title: "Skip the fizzy drinks", text: "Sugary drinks give you a quick rush and then a crash. Water is the best drink for players." },
  { icon: "🍊", title: "Orange slices at half-time", text: "A classic for a reason: oranges give you water, natural sugar and vitamin C to refuel quickly." },
  { icon: "🥜", title: "Pack smart snacks", text: "Fruit, yoghurt, a handful of nuts (if you're not allergic) or a wholegrain sandwich beat crisps and sweets." },
  { icon: "🔄", title: "Refuel after training", text: "Eat a snack or meal within an hour after training, like a milky drink and a sandwich, to help your body recover." },
  { icon: "😴", title: "Sleep is part of your diet", text: "Your body uses the food you eat to repair while you sleep. Aim for 9–11 hours a night if you're a young player." },
  { icon: "🥦", title: "Greens for go-power", text: "Spinach, broccoli and peas contain iron, which helps carry oxygen to your muscles so you don't tire as quickly." },
  { icon: "🐟", title: "Fish for your brain", text: "Oily fish like salmon or sardines contain healthy fats that help your brain and heart. Try to eat it once a week." },
  { icon: "🧂", title: "Don't fear salt on hot days", text: "When you sweat a lot you lose salt as well as water. A normal meal after training puts it back." },
  { icon: "🥣", title: "Oats for long-lasting energy", text: "Porridge releases energy slowly, which keeps you going through long training sessions." },
  { icon: "🍓", title: "Swap sweets for fruit", text: "When you want something sweet, grab berries, grapes or a piece of fruit instead of chocolate or sweets." },
  { icon: "🍽️", title: "Fill your plate the pro way", text: "A good plate is about one third carbs, one third vegetables and one third protein." },
  { icon: "🚰", title: "Bring your own bottle", text: "Always take a filled water bottle to training and matches, and refill it whenever you can." },
  { icon: "🌯", title: "Wraps make great match-day lunches", text: "A wholegrain wrap with chicken or beans and salad is light, tasty and full of good energy." },
  { icon: "🥕", title: "Crunchy veg sticks", text: "Carrot, cucumber and pepper sticks with hummus make a great after-school snack before training." },
  { icon: "🍠", title: "Sweet potato power", text: "Sweet potatoes are full of carbs and vitamins. Try them baked or as wedges with dinner." },
  { icon: "🧃", title: "Read the label", text: "Many juices and 'sports drinks' are packed with sugar. Check the label, and if in doubt choose water or milk." },
  { icon: "🍚", title: "Big game tomorrow?", text: "Have a good portion of carbs like rice or pasta at dinner the night before a big match." },
  { icon: "🫐", title: "Berries help recovery", text: "Blueberries, strawberries and raspberries are packed with antioxidants that help your body recover." },
  { icon: "🥚", title: "Eggs are an all-rounder", text: "Eggs are cheap, quick to cook and full of protein. Boiled, scrambled or in an omelette, they're a great choice." },
  { icon: "🍞", title: "Choose wholegrain", text: "Wholegrain bread, pasta and rice keep you fuller for longer than white versions and give steadier energy." },
  { icon: "👨‍🍳", title: "Help cook dinner", text: "Learning to cook simple, healthy meals is a skill that will help you for your whole football life." },
  { icon: "🙂", title: "Enjoy your food", text: "Healthy eating isn't about being perfect. Eat mostly good food, enjoy treats sometimes, and listen to your body." },
];

const SKILL_TIPS = [
  { icon: "🦶", title: "Weak-foot wall passes", level: "Beginner", steps: ["Stand 3 metres from a wall.", "Pass and control using only your weaker foot.", "Do 50 touches, then step back a metre."], why: "Players who use both feet are much harder to defend against." },
  { icon: "🎯", title: "Toe taps", level: "Beginner", steps: ["Place the ball in front of you.", "Tap the top of the ball with the sole of one foot, then the other.", "Go as fast as you can for 30 seconds, rest, repeat 5 times."], why: "Builds quick feet and balance on the ball." },
  { icon: "🔁", title: "The Cruyff Turn", level: "Intermediate", steps: ["Pretend to pass or shoot.", "Instead, drag the ball behind your standing leg with the inside of your foot.", "Turn and accelerate away in the other direction."], why: "Named after Johan Cruyff, it's a simple way to lose a defender." },
  { icon: "🪀", title: "Keepy-uppy challenge", level: "Beginner", steps: ["Drop the ball onto your foot and kick it gently upward.", "Keep your ankle locked and toes pointed slightly up.", "Beat your record every day."], why: "Improves your touch, timing and concentration." },
  { icon: "🧲", title: "First touch out of your feet", level: "Intermediate", steps: ["Have a partner or wall pass the ball to you.", "Take your first touch into space, not under your body.", "Play your next pass or shot with your second touch."], why: "A good first touch buys you time and space." },
  { icon: "👀", title: "Scan before you receive", level: "All levels", steps: ["Before the ball comes to you, look over both shoulders.", "Know where teammates and opponents are.", "Decide what to do before the ball arrives."], why: "The best midfielders, like Iniesta and De Bruyne, scan constantly." },
  { icon: "⚡", title: "Inside-outside dribble", level: "Beginner", steps: ["Dribble slowly using the inside, then the outside, of the same foot.", "Keep the ball close, within one step.", "Switch feet every 10 metres."], why: "Keeps the ball glued to your feet in tight spaces." },
  { icon: "🌀", title: "The step-over", level: "Intermediate", steps: ["While dribbling, swing your foot around the outside of the ball without touching it.", "Drop your shoulder in that direction.", "Push the ball away with the outside of your other foot."], why: "Cristiano Ronaldo made this move famous for beating defenders." },
  { icon: "🥅", title: "Aim for the corners", level: "Beginner", steps: ["Place cones or bags inside each corner of the goal.", "Shoot from 10 metres, aiming to hit the targets.", "Use the side of your foot for accuracy, laces for power."], why: "Shots in the corners are the hardest for keepers to save." },
  { icon: "🏃", title: "Sprint and stop", level: "All levels", steps: ["Sprint 10 metres as fast as you can.", "Stop in 2 steps with your knees bent.", "Turn and sprint back. Repeat 6 times."], why: "Football is about changes of speed, not just running fast." },
  { icon: "🦵", title: "La Croqueta", level: "Intermediate", steps: ["With the ball between your feet, push it quickly from the inside of one foot to the inside of the other.", "Move sideways as you do it.", "Use it to slip past a defender who lunges in."], why: "A favourite of Andrés Iniesta in tight spaces." },
  { icon: "🎪", title: "Juggling with thighs", level: "Intermediate", steps: ["Toss the ball up and hit it with the middle of your thigh.", "Keep your thigh flat so the ball goes straight up.", "Alternate thighs and count your touches."], why: "Helps you control high balls in matches." },
  { icon: "🤾", title: "Chest control", level: "Intermediate", steps: ["Have someone throw the ball at your chest.", "Lean back slightly and relax as it arrives.", "Let it drop to your feet and play a pass."], why: "Lets you control long passes without losing the ball." },
  { icon: "🔄", title: "Drag-back turn", level: "Beginner", steps: ["While dribbling, put your sole on top of the ball.", "Pull it back toward you.", "Turn your body and go the other way."], why: "A quick and safe way to change direction under pressure." },
  { icon: "🎳", title: "Passing gates", level: "Beginner", steps: ["Set up small 'gates' with two cones a metre apart.", "Pass through each gate to a partner or wall.", "Move further away as you get more accurate."], why: "Accurate passing keeps your team in possession." },
  { icon: "🧠", title: "Watch a pro for 5 minutes", level: "All levels", steps: ["Pick one player in your position during a match.", "Watch only them, not the ball, for 5 minutes.", "Note where they move when their team has the ball."], why: "You learn a lot about movement and positioning off the ball." },
  { icon: "🪃", title: "Volleys against a wall", level: "Advanced", steps: ["Toss the ball onto a wall so it bounces back in the air.", "Strike it before it touches the ground.", "Keep your head over the ball and point your toe down."], why: "Clean volleys can produce spectacular goals." },
  { icon: "🌪️", title: "The roulette", level: "Advanced", steps: ["Drag the ball back with the sole of one foot while spinning.", "Continue the spin and drag it further with the other foot.", "Finish facing forward, past the defender."], why: "Made famous by Zidane, it protects the ball while you turn." },
  { icon: "🔂", title: "One-touch passing", level: "Intermediate", steps: ["Pass against a wall or with a partner.", "Return every pass with one touch.", "Count how many in a row you can do without a mistake."], why: "Fast passing moves the ball quicker than any player can run." },
  { icon: "🛡️", title: "Shield the ball", level: "Intermediate", steps: ["Keep your body between the defender and the ball.", "Bend your knees and stretch your arm out for balance.", "Keep the ball on the foot furthest away from them."], why: "Lets you keep the ball even against bigger players." },
  { icon: "🪜", title: "Fast-feet ladder", level: "All levels", steps: ["Lay out a ladder or chalk lines on the ground.", "Run through with one foot in each square, then two feet.", "Stay on the balls of your feet and pump your arms."], why: "Improves agility and footwork." },
  { icon: "🎩", title: "Elastico (flip-flap)", level: "Advanced", steps: ["Push the ball out with the outside of your foot.", "Quickly snap it back with the inside of the same foot.", "Practise slowly first, then speed up."], why: "Ronaldinho's trademark move for wrong-footing defenders." },
  { icon: "🎽", title: "Heading technique", level: "Intermediate", steps: ["Use your forehead, not the top of your head.", "Keep your eyes open and neck firm.", "Practise with a soft ball first and keep it gentle."], why: "Good technique makes headers more accurate and safer." },
  { icon: "🌙", title: "Weak-foot shooting", level: "Intermediate", steps: ["Place 10 balls on the edge of the box.", "Shoot every one with your weaker foot.", "Focus on accuracy over power."], why: "Being able to finish with both feet doubles your chances." },
  { icon: "⛹️", title: "Dribble round cones", level: "Beginner", steps: ["Set 6 cones in a line, a metre apart.", "Weave through using small touches.", "Time yourself and try to beat your best."], why: "Close control under speed is key for any attacker." },
  { icon: "🧘", title: "Stretch after you play", level: "All levels", steps: ["Hold each stretch for 20–30 seconds.", "Stretch calves, hamstrings, quads and hips.", "Breathe slowly and don't bounce."], why: "Helps your body recover and reduces the chance of injury." },
  { icon: "📣", title: "Talk to your teammates", level: "All levels", steps: ["Use short, clear words: 'Man on!', 'Time!', 'Turn!'", "Call for the ball when you're free.", "Encourage teammates after mistakes."], why: "Communication is a skill, and great captains use it all match." },
  { icon: "🪨", title: "Long passing", level: "Advanced", steps: ["Approach the ball at a slight angle.", "Strike the lower half with your laces.", "Follow through toward your target."], why: "Switching play quickly opens up space on the other side." },
  { icon: "🎢", title: "Outside-of-the-boot pass", level: "Advanced", steps: ["Point your toes down and in.", "Strike the ball with the outside of your foot.", "Start with short passes and build up."], why: "Luka Modrić and Ricardo Quaresma use this to bend passes around defenders." },
  { icon: "🏁", title: "Finish with a first-time shot", level: "Intermediate", steps: ["Have a partner roll the ball across you.", "Shoot without taking a touch first.", "Keep your body over the ball to keep it low."], why: "Strikers like Haaland score lots of goals with one touch." },
];

(() => {
  "use strict";

  // Same tips for everyone on the same day; changes at midnight local time.
  const now = new Date();
  const dayNumber = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
  const offsets = { diet: 0, skill: 0 };

  const dateText = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  document.getElementById("tips-date").textContent = dateText;

  function render(kind) {
    const list = kind === "diet" ? DIET_TIPS : SKILL_TIPS;
    const index = (dayNumber + offsets[kind]) % list.length;
    const tip = list[index];
    const card = document.getElementById(`tip-${kind}`);
    card.querySelector(".tip-icon").textContent = tip.icon;
    card.querySelector(".tip-title").textContent = tip.title;
    card.querySelector(".tip-label").textContent = offsets[kind] === 0 ? "Today's tip" : `Bonus tip #${offsets[kind]}`;
    const body = card.querySelector(".tip-body");
    body.innerHTML = "";
    if (kind === "diet") {
      const p = document.createElement("p");
      p.textContent = tip.text;
      body.appendChild(p);
    } else {
      const level = document.createElement("span");
      level.className = "tip-level";
      level.textContent = tip.level;
      const ol = document.createElement("ol");
      tip.steps.forEach((s) => { const li = document.createElement("li"); li.textContent = s; ol.appendChild(li); });
      const why = document.createElement("p");
      why.className = "tip-why";
      why.textContent = "Why it matters: " + tip.why;
      body.append(level, ol, why);
    }
    card.classList.remove("flip");
    void card.offsetWidth; // restart the animation
    card.classList.add("flip");
  }

  document.querySelectorAll("[data-next-tip]").forEach((btn) => btn.addEventListener("click", () => {
    const kind = btn.dataset.nextTip;
    offsets[kind]++;
    render(kind);
  }));

  render("diet");
  render("skill");
})();
