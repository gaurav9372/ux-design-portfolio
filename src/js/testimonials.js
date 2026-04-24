const PLACEHOLDER = "/images/image-missing.png";
const AUTO_INTERVAL = 12000;

const TESTIMONIALS = [
  // Client 1 : D2C skincare brand founder
  {
    quote: "\"We came to Shreyansh with a website that was trying to do too many things at once. Our buyers had become three very different groups, and the old site was not serving any of them well. He spent the first two weeks just asking questions, which we thought was slow, but the decisions that came after were solid. By launch, our retail buyers were finding products faster and our bulk inquiries went up. He pushed back on some of our ideas in a polite way, and in the end he was usually right.\"",
    name: "Ankit Agarwal",
    role: "Founder, D2C Skincare Brand",
    avatar: PLACEHOLDER
  },
  // Ex-CEO
  {
    quote: "\"When Shreyansh joined us as a junior, I did not expect him to be pushing back on my product decisions within six months. That is exactly what happened. He grew into a designer who could defend his choices with research and also admit when he was wrong. Our product quality jumped in the period he was owning the design. We were sorry to see him leave for his own practice, but it was the right move for him.\"",
    name: "Aman Malhotra",
    role: "Founder & CEO, Previous Company",
    avatar: PLACEHOLDER
  },
  // Client 2 : B2B manufacturing
  {
    quote: "\"Our dealer portal had been sitting in the same broken state for years. Nobody on my team wanted to touch it because the problem was big and nobody knew where to start. Shreyansh broke it into parts that we could actually discuss, and then into a plan we could build. What I appreciated most was that he spoke to my sales team before suggesting anything. The new portal is now something our dealers actually use without calling us for help every time.\"",
    name: "Vinod Kumar",
    role: "Managing Director, Rubber Manufacturing",
    avatar: PLACEHOLDER
  },
  // Junior designer 1
  {
    quote: "\"I joined as an intern when Shreyansh was already a senior on the team. What I learnt from him in six months was more than a year of coursework. He does not explain things in a rush. He would sit with my wireframes and ask questions that made me rethink the whole flow, instead of just fixing my screens for me. He also shared his notes and Figma files openly, which is not always common. I still message him when I am stuck on something tough.\"",
    name: "Meher Jain",
    role: "Junior UX Designer",
    avatar: PLACEHOLDER
  },
  // Client 3 : fintech founder
  {
    quote: "\"Shreyansh joined us when we were still figuring out what the product should even be. A lot of designers would have asked for a brief and disappeared for a month. He stayed close to the product conversations, suggested things we had not thought of, and was honest when he felt a direction was weak. The final app is clean in a way that makes users think there was nothing to design, which I think is the highest compliment a UX designer can get. We are on our third project with him now.\"",
    name: "Priya Mishra",
    role: "Co-founder, Fintech Startup",
    avatar: PLACEHOLDER
  },
  // Ex-manager
  {
    quote: "\"Shreyansh was in my design team for about two years. He is one of the very few designers I have worked with who gets equally excited about a user interview and a pixel-perfect handoff. He asks uncomfortable questions in the right meetings and keeps his ego out of the work when feedback comes his way. He also does not need a lot of hand-holding on new projects, which as a manager was a relief. Whoever gets to work with him next is lucky.\"",
    name: "Sneha Kapoor",
    role: "Senior Design Manager, Previous Company",
    avatar: PLACEHOLDER
  },
  // Client 4 : healthcare SaaS
  {
    quote: "\"We were switching from an old dashboard that doctors hated to something we could actually sell to new clinics. Shreyansh did not just redesign the screens. He sat with two of our customer clinics for a full day each, watched how they used the old dashboard, and came back with a rework that addressed things we had stopped noticing. He cares as much about the research phase as the final visuals, which is rare. We shipped the new dashboard in ten weeks and the support ticket volume has dropped noticeably.\"",
    name: "Dr. Rakesh Verma",
    role: "Head of Product, Healthcare SaaS",
    avatar: PLACEHOLDER
  },
  // Junior designer 2
  {
    quote: "\"Shreyansh mentored me for about eight months at my first design job. The biggest thing I picked up from him was how to think before you open Figma. He taught me to stop rushing into visuals and spend more time on the actual problem. He is also very patient when you do not get something the first time. If he recommends a book, buy it. If he suggests a plugin, use it. Most of his suggestions have saved me a lot of time.\"",
    name: "Rohan Desai",
    role: "UI/UX Designer",
    avatar: PLACEHOLDER
  },
  // Elder sister
  {
    quote: "\"I do not understand half of what my brother does for a living, but I know his designs look beautiful. Every time he shows me a new project, I find myself saying wow without planning to. He has been like this since he was a kid, always opening and closing apps and asking me why some buttons did not work the way he wanted. I am biased, obviously. But if the users like his work even half as much as I do, he is doing his job perfectly.\"",
    name: "Neha Gaurav",
    role: "Proud elder sister",
    avatar: PLACEHOLDER
  }
];

export const initTestimonials = () => {
  const quoteEl = document.getElementById("testimonialQuote");
  const nameEl = document.getElementById("testimonialName");
  const roleEl = document.getElementById("testimonialRole");
  const avatarEl = document.getElementById("testimonialAvatar");
  const dotsEl = document.getElementById("tDots");
  const prevBtn = document.getElementById("tPrev");
  const nextBtn = document.getElementById("tNext");
  const card = document.querySelector(".testimonial-card");

  if (!quoteEl || !nameEl || !roleEl || !avatarEl || !dotsEl || !prevBtn || !nextBtn) return;

  let index = 0;
  let autoTimer = null;
  let fadeTimer = null;

  const render = (i, animate = true) => {
    const apply = () => {
      const item = TESTIMONIALS[i];
      quoteEl.textContent = item.quote;
      nameEl.textContent = item.name;
      roleEl.textContent = item.role;
      avatarEl.src = item.avatar;
      dotsEl.querySelectorAll(".t-dot").forEach((dot, j) => {
        dot.classList.toggle("active", j === i);
        dot.setAttribute("aria-current", j === i ? "true" : "false");
      });
    };

    if (!card || !animate) { apply(); return; }
    card.classList.add("is-fading");
    if (fadeTimer) clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => {
      apply();
      card.classList.remove("is-fading");
    }, 260);
  };

  TESTIMONIALS.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "t-dot";
    dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
    dot.addEventListener("click", () => { index = i; render(index); startAuto(); });
    dotsEl.appendChild(dot);
  });

  const goPrev = () => { index = (index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length; render(index); startAuto(); };
  const goNext = () => { index = (index + 1) % TESTIMONIALS.length; render(index); startAuto(); };

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  const startAuto = () => {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      index = (index + 1) % TESTIMONIALS.length;
      render(index);
    }, AUTO_INTERVAL);
  };

  render(index, false);
  startAuto();
};
