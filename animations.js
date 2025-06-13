gsap.from(".heading", {
  scale: 0,
  opacity: 0,
  duration: 2.5,
});

gsap.from("#dice1", {
  x: -800,
  delay: 1,
  duration: 1.5,
  rotate: 360,
});

gsap.from("#dice2", {
  x: 800,
  delay: 1,
  duration: 1.5,
  rotate: 360,
});

gsap.from(".text", {
  y: 400,
  delay: 2,
  duration: 1.5,
});

gsap.from(".anim", {
  y: 400,
  delay: 2,
  duration: 1.5,
});

// Game.html

gsap.from(".logo", {
  scale: 5,
  y: 300,
  duration: 1,
  delay: 0.5,
});

gsap.from(".card1", {
  x: -600,
  duration: 1,
  delay: 2,
});

gsap.from(".card2", {
  x: 600,
  duration: 1,
  delay: 2,
});

gsap.from(".target", {
  y: 400,
  delay: 2,
  duration: 1,
});

gsap.from(".bottomButtons", {
  y: 400,
  delay: 2,
  duration: 1,
});
