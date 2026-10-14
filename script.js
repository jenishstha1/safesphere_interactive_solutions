// Global SafeShift Demo Controller
window.__safesphere_initialized = true;

// Mobile Nav Toggle
(function() {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Tab switcher
window.switchTab = function (targetTab) {
  if (!targetTab) return;
  var allBtns = document.querySelectorAll(".demo-tab-btn");
  for (var i = 0; i < allBtns.length; i++) {
    var b = allBtns[i];
    var isTarget = b.getAttribute("data-tab") === targetTab;
    if (isTarget) {
      b.classList.add("active");
      b.setAttribute("aria-selected", "true");
      b.style.background = "var(--accent)";
      b.style.color = "var(--on-accent)";
      b.style.borderColor = "var(--accent)";
    } else {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
      b.style.background = "transparent";
      b.style.color = "var(--muted)";
      b.style.borderColor = "var(--line)";
    }
  }

  var simView = document.getElementById("demo-sim-view");
  var dashView = document.getElementById("demo-dash-view");
  var quizView = document.getElementById("demo-quiz-view");

  if (simView) {
    simView.style.display = targetTab === "sim" ? "block" : "none";
    simView.classList.toggle("active", targetTab === "sim");
  }
  if (dashView) {
    dashView.style.display = targetTab === "dash" ? "block" : "none";
    dashView.classList.toggle("active", targetTab === "dash");
  }
  if (quizView) {
    quizView.style.display = targetTab === "quiz" ? "block" : "none";
    quizView.classList.toggle("active", targetTab === "quiz");
  }

  var rStatus = document.getElementById("demo-role-status");
  var rLabels = {
    sim: "Live Simulation • Role: Trainee",
    dash: "Live Analytics • Role: Supervisor / Trainer",
    quiz: "Assessment Module • Role: Operator"
  };
  if (rStatus && rLabels[targetTab]) {
    rStatus.textContent = rLabels[targetTab];
  }
};

window.hazardsData = {
  1: {
    title: "Hazard 1: Unstable Pallet & Falling Load",
    regulation: "HSE Warehousing HSG76 & PUWER 1998",
    desc: "Top tier storage has unbanded, leaning crates protruding past rack shelf safety limits, presenting a critical crush injury risk below.",
    options: [
      { text: "Leave it until end-of-shift when reach trucks finish unloading", correct: false, note: "Incorrect. Leaving unsecured overhead loads creates ongoing crush and fatality risks." },
      { text: "Cordon off the lower aisle, lower pallet using a reach truck, re-stack and shrink-wrap securely", correct: true, note: "Correct! The area is immediately isolated, and the load safely lowered, restacked and secured before further transit." },
      { text: "Attempt to push the crate back from a ladder using a broom handle", correct: false, note: "Incorrect. Working at height without fall protection and pushing unstable loads is extremely hazardous." }
    ]
  },
  2: {
    title: "Hazard 2: Obstructed Emergency Fire Exit",
    regulation: "Regulatory Reform (Fire Safety) Order 2005",
    desc: "Stacked wooden pallets are positioned directly across the secondary warehouse emergency fire escape doors.",
    options: [
      { text: "Stack pallets higher against one door leaf to leave a 30cm crawl gap", correct: false, note: "Incorrect. Fire egress routes must maintain full unobstructed door width at all times." },
      { text: "Relocate pallets immediately to the designated pallet bay and verify unhindered door clearance", correct: true, note: "Correct! Emergency exits must be kept completely clear of all stock and equipment 24/7." },
      { text: "Place a high-visibility warning cone on top of the pallets", correct: false, note: "Incorrect. A warning marker does not resolve the fatal obstruction of an evacuation escape path." }
    ]
  },
  3: {
    title: "Hazard 3: Hazardous Manual Handling Posture",
    regulation: "Manual Handling Operations Regulations 1992",
    desc: "Operative is lifting a 35 kg heavy crate with locked knees and a severely curved lumbar spine.",
    options: [
      { text: "Lift as quickly as possible using momentum to reduce total strain duration", correct: false, note: "Incorrect. Jerking or lifting quickly under high spinal curvature can cause acute disc herniation." },
      { text: "Adopt a stable wide stance, bend knees, keep back neutral, hold close to chest, and request team-lift for 35kg load", correct: true, note: "Correct! Safe posture reduces lumbar torque, and loads exceeding standard thresholds (25kg) require team or mechanical assistance." },
      { text: "Twist upper torso mid-lift to deposit crate onto pallet without repositioning feet", correct: false, note: "Incorrect. Twisting while loaded is a leading cause of severe spinal workplace injuries." }
    ]
  },
  4: {
    title: "Hazard 4: Chemical Spill in Forklift Transit Path",
    regulation: "Health and Safety at Work etc. Act 1974 & COSHH",
    desc: "An unidentified liquid spill covers the shared pedestrian-forklift pathway with no warning barriers.",
    options: [
      { text: "Step carefully around the spill and notify cleaning at next shift hand-over", correct: false, note: "Incorrect. Leaving liquid unattended invites pedestrian slip injuries and forklift skidding." },
      { text: "Walk through with rubber-soled safety boots to test traction", correct: false, note: "Incorrect. Chemical exposure can degrade footwear and spread hazardous residue." },
      { text: "Barricade the area with warning signs, deploy absorbent spill kit, and report to supervisor", correct: true, note: "Correct! Immediate physical isolation prevents slip and vehicle skids, followed by proper spill containment." }
    ]
  }
};

window.resolvedHazards = {};
window.score = 0;

window.openHazardDrawer = function (hazardId) {
  var data = window.hazardsData[hazardId];
  if (!data) return;

  var drawer = document.getElementById("sim-drawer");
  var drawerBadge = document.getElementById("drawer-badge");
  var drawerTitle = document.getElementById("drawer-title");
  var drawerReg = document.getElementById("drawer-reg");
  var drawerDesc = document.getElementById("drawer-desc");
  var drawerOptions = document.getElementById("drawer-options");
  var drawerFeedback = document.getElementById("drawer-feedback");

  if (!drawer || !drawerTitle || !drawerOptions) return;

  // Highlight active hazard card
  for (var i = 1; i <= 4; i++) {
    var c = document.getElementById("quick-btn-" + i);
    if (c) c.classList.toggle("active", String(i) === String(hazardId));
  }

  if (drawerBadge) drawerBadge.textContent = "Hazard Inspection • " + hazardId + " of 4";
  drawerTitle.textContent = data.title;
  if (drawerReg) drawerReg.textContent = data.regulation;
  if (drawerDesc) drawerDesc.textContent = data.desc;
  drawerOptions.innerHTML = "";
  if (drawerFeedback) {
    drawerFeedback.className = "drawer-feedback";
    drawerFeedback.style.display = "none";
    drawerFeedback.innerHTML = "";
  }

  var isResolved = !!window.resolvedHazards[hazardId];

  data.options.forEach(function (opt, optIdx) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "drawer-opt-btn";
    var letter = String.fromCharCode(65 + optIdx);
    b.innerHTML = '<span class="opt-letter">' + letter + '</span><span class="opt-text">' + opt.text + '</span>';

    if (isResolved) {
      b.disabled = true;
      if (opt.correct) {
        b.classList.add("opt-correct");
      }
    } else {
      b.addEventListener("click", function () {
        if (opt.correct) {
          if (drawerFeedback) {
            drawerFeedback.className = "drawer-feedback correct";
            drawerFeedback.innerHTML = "<strong>✓ Correct Decision! (+25 pts)</strong><br>" + opt.note;
            drawerFeedback.style.display = "block";
          }

          window.resolvedHazards[hazardId] = true;
          window.score += 25;
          window.updateSimHUD();

          // Mark hotspot resolved on SVG, HTML button, and card
          var hsEl = document.getElementById("hotspot-" + hazardId);
          if (hsEl) {
            hsEl.classList.add("resolved");
            var iconText = hsEl.querySelector(".hotspot-icon");
            if (iconText) iconText.textContent = "✓";
          }
          var hsBtn = document.getElementById("hotspot-btn-" + hazardId);
          if (hsBtn) {
            hsBtn.classList.add("resolved");
            hsBtn.innerHTML = "✓";
          }

          Array.from(drawerOptions.children).forEach(function (child) {
            child.disabled = true;
            if (child === b) {
              child.classList.add("opt-correct");
            }
          });

          if (Object.keys(window.resolvedHazards).length === 4) {
            var completeBanner = document.getElementById("sim-complete-banner");
            if (completeBanner) {
              completeBanner.classList.add("show");
              completeBanner.style.display = "block";
            }
          }
        } else {
          if (drawerFeedback) {
            drawerFeedback.className = "drawer-feedback incorrect";
            drawerFeedback.innerHTML = "<strong>✗ Incorrect Procedure:</strong> " + opt.note;
            drawerFeedback.style.display = "block";
          }
          b.classList.add("opt-incorrect");
        }
      });
    }
    drawerOptions.appendChild(b);
  });

  if (isResolved && drawerFeedback) {
    drawerFeedback.className = "drawer-feedback correct";
    drawerFeedback.innerHTML = "<strong>✓ Hazard Already Resolved</strong><br>Compliance standard verified for this sector.";
    drawerFeedback.style.display = "block";
  }

  drawer.classList.add("open");

  // Ensure simulator viewport is smoothly brought into view
  var vp = document.getElementById("demo-sim-view");
  if (vp) {
    vp.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

window.closeHazardDrawer = function () {
  var d = document.getElementById("sim-drawer");
  if (d) {
    d.classList.remove("open");
  }
  for (var i = 1; i <= 4; i++) {
    var c = document.getElementById("quick-btn-" + i);
    if (c) c.classList.remove("active");
  }
};

window.updateSimHUD = function () {
  var solvedCount = Object.keys(window.resolvedHazards).length;
  var countEl = document.getElementById("hazard-count");
  var scoreEl = document.getElementById("hazard-score");
  if (countEl) countEl.textContent = solvedCount + " / 4";
  if (scoreEl) scoreEl.textContent = window.score + " pts";

  for (var i = 1; i <= 4; i++) {
    var qb = document.getElementById("quick-btn-" + i);
    if (qb) {
      if (window.resolvedHazards[i]) {
        qb.classList.add("resolved");
        var icon = qb.querySelector(".hazard-icon");
        if (icon) icon.textContent = "✓ Resolved";
        var badge = qb.querySelector(".hazard-badge");
        if (badge) badge.textContent = "Safe";
        var hint = qb.querySelector(".hazard-action-hint");
        if (hint) hint.textContent = "✓ Verified Safe";
      } else {
        qb.classList.remove("resolved");
        var icon = qb.querySelector(".hazard-icon");
        if (icon) icon.textContent = "⚠️ Hazard " + i;
        var badge = qb.querySelector(".hazard-badge");
        if (badge) badge.textContent = "Inspect";
        var hint = qb.querySelector(".hazard-action-hint");
        if (hint) hint.textContent = "Click to inspect →";
      }
    }
    var hsBtn = document.getElementById("hotspot-btn-" + i);
    if (hsBtn) {
      if (window.resolvedHazards[i]) {
        hsBtn.classList.add("resolved");
        hsBtn.innerHTML = "✓";
      } else {
        hsBtn.classList.remove("resolved");
        hsBtn.innerHTML = '<span class="hotspot-pulse-ring"></span><span>' + i + '</span>';
      }
    }
  }
};

window.resetSim = function () {
  window.resolvedHazards = {};
  window.score = 0;
  window.updateSimHUD();
  window.closeHazardDrawer();

  for (var i = 1; i <= 4; i++) {
    var c = document.getElementById("quick-btn-" + i);
    if (c) {
      c.classList.remove("active");
      c.classList.remove("resolved");
      var icon = c.querySelector(".hazard-icon");
      if (icon) icon.textContent = "⚠️ Hazard " + i;
      var badge = c.querySelector(".hazard-badge");
      if (badge) badge.textContent = "Inspect";
      var hint = c.querySelector(".hazard-action-hint");
      if (hint) hint.textContent = "Click to inspect →";
    }
    var hsBtn = document.getElementById("hotspot-btn-" + i);
    if (hsBtn) {
      hsBtn.classList.remove("resolved");
      hsBtn.innerHTML = '<span class="hotspot-pulse-ring"></span><span>' + i + '</span>';
    }
    var hs = document.getElementById("hotspot-" + i);
    if (hs) {
      hs.classList.remove("resolved");
      var iconText = hs.querySelector(".hotspot-icon");
      if (iconText) iconText.textContent = String(i);
    }
  }

  var completeBanner = document.getElementById("sim-complete-banner");
  if (completeBanner) {
    completeBanner.classList.remove("show");
    completeBanner.style.display = "none";
  }
};

// Keyboard listener for Escape key to close modal
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    window.closeHazardDrawer();
  }
});

window.quizQuestions = [
  {
    q: "Under UK HSE guidance for manual handling, what is the maximum guideline weight for lifting close to the waist by an adult male?",
    options: ["10 kg", "25 kg", "40 kg", "55 kg"],
    correct: 1,
    explanation: "HSE Manual Handling Guidance specifies 25 kg as the maximum guideline limit at waist height under ideal conditions."
  },
  {
    q: "When walking near active forklift operation lanes in a warehouse, what is required?",
    options: [
      "Assume forklift drivers can always brake immediately",
      "Wear high-visibility PPE, stay within marked walkways, and maintain eye contact",
      "Wave arms continuously when crossing intersections",
      "Step directly behind reversing vehicles to check clearance"
    ],
    correct: 1,
    explanation: "High-visibility gear, dedicated pedestrian routes and verified eye contact prevent blind-spot collisions."
  },
  {
    q: "How frequently must designated fire exit routes and doors be inspected for obstructions?",
    options: [
      "Once a year during the fire drill",
      "Every month during inventory count",
      "Daily before and throughout operational shifts",
      "Only when notified by local fire service"
    ],
    correct: 2,
    explanation: "Under the Fire Safety Order, emergency escape routes must be monitored daily to ensure 100% unobstructed egress at all times."
  }
];

window.currQ = 0;
window.quizScore = 0;

window.selectQuizOpt = function (idx) {
  var qData = window.quizQuestions[window.currQ];
  var qOptsEl = document.getElementById("quiz-options-container");
  var qExplEl = document.getElementById("quiz-explanation");
  var qScoreEl = document.getElementById("quiz-score-indicator");
  var qNextBtn = document.getElementById("quiz-next-btn");
  if (!qOptsEl) return;

  Array.from(qOptsEl.children).forEach(function (c) { c.disabled = true; });

  var selectedBtn = qOptsEl.children[idx];
  var correctBtn = qOptsEl.children[qData.correct];

  if (idx === qData.correct) {
    if (selectedBtn) {
      selectedBtn.classList.add("correct");
      var ind = selectedBtn.querySelector(".quiz-opt-indicator");
      if (ind) ind.textContent = "✓ Correct";
    }
    window.quizScore++;
    if (qExplEl) {
      qExplEl.className = "drawer-feedback correct";
      qExplEl.innerHTML = "<strong>✓ Correct Decision!</strong> " + qData.explanation;
      qExplEl.style.display = "block";
    }
  } else {
    if (selectedBtn) {
      selectedBtn.classList.add("incorrect");
      var ind = selectedBtn.querySelector(".quiz-opt-indicator");
      if (ind) ind.textContent = "✗ Incorrect";
    }
    if (correctBtn) {
      correctBtn.classList.add("correct");
      var cInd = correctBtn.querySelector(".quiz-opt-indicator");
      if (cInd) cInd.textContent = "✓ Correct Procedure";
    }
    if (qExplEl) {
      qExplEl.className = "drawer-feedback incorrect";
      qExplEl.innerHTML = "<strong>✗ Incorrect Procedure:</strong> " + qData.explanation;
      qExplEl.style.display = "block";
    }
  }

  if (qScoreEl) qScoreEl.textContent = "Score: " + window.quizScore + " / " + window.quizQuestions.length;
  if (qNextBtn) {
    qNextBtn.disabled = false;
    qNextBtn.style.opacity = "1";
    qNextBtn.style.cursor = "pointer";
  }
};

window.nextQuizQuestion = function () {
  var qTextEl = document.getElementById("quiz-question-text");
  var qOptsEl = document.getElementById("quiz-options-container");
  var qExplEl = document.getElementById("quiz-explanation");
  var qNextBtn = document.getElementById("quiz-next-btn");

  if (window.currQ < window.quizQuestions.length - 1) {
    window.currQ++;
    window.renderQuizQuestion();
  } else {
    if (qTextEl) {
      qTextEl.innerHTML = "Assessment Complete! 🎉<br><span style='font-size:1rem;color:var(--muted);'>Final Score: " + window.quizScore + " / " + window.quizQuestions.length + " (" + Math.round((window.quizScore / window.quizQuestions.length) * 100) + "%)</span>";
    }
    if (qOptsEl) {
      qOptsEl.innerHTML = "<div class='card' style='text-align:center;padding:1.5rem;'>" +
        "<p style='color:var(--accent);font-weight:700;font-size:1.1rem;'>" + (window.quizScore >= 2 ? "Pass Mark Achieved: Module Certified" : "Refresher Training Recommended") + "</p>" +
        "<p style='color:var(--muted);font-size:.9rem;'>SafeShift automatically logs this certification timestamp to trainee records for audit evidence.</p>" +
        "<button id='quiz-restart-btn' class='btn btn-sm' type='button' style='margin-top:.8rem;' onclick='window.restartQuiz()'>Retake Assessment</button>" +
        "</div>";
    }
    if (qExplEl) qExplEl.style.display = "none";
    if (qNextBtn) qNextBtn.style.display = "none";
  }
};

window.restartQuiz = function () {
  window.currQ = 0;
  window.quizScore = 0;
  var scoreIndicator = document.getElementById("quiz-score-indicator");
  if (scoreIndicator) scoreIndicator.textContent = "Score: 0 / 3";
  window.renderQuizQuestion();
};

window.renderQuizQuestion = function () {
  var qNumEl = document.getElementById("quiz-curr");
  var qTextEl = document.getElementById("quiz-question-text");
  var qOptsEl = document.getElementById("quiz-options-container");
  var qExplEl = document.getElementById("quiz-explanation");
  var qNextBtn = document.getElementById("quiz-next-btn");

  if (!qTextEl || !qOptsEl) return;
  var qData = window.quizQuestions[window.currQ];
  if (qNumEl) qNumEl.textContent = window.currQ + 1;
  qTextEl.textContent = qData.q;
  qOptsEl.innerHTML = "";
  if (qExplEl) {
    qExplEl.style.display = "none";
    qExplEl.textContent = "";
  }
  if (qNextBtn) {
    qNextBtn.disabled = true;
    qNextBtn.textContent = window.currQ === window.quizQuestions.length - 1 ? "Finish Assessment" : "Next Question →";
    qNextBtn.style.display = "inline-block";
    qNextBtn.style.opacity = "0.5";
    qNextBtn.style.cursor = "default";
  }

  qData.options.forEach(function (optText, idx) {
    var optBtn = document.createElement("button");
    optBtn.type = "button";
    optBtn.className = "quiz-opt";
    optBtn.setAttribute("onclick", "window.selectQuizOpt(" + idx + ")");
    var letter = String.fromCharCode(65 + idx);
    optBtn.innerHTML = '<span class="quiz-opt-badge">' + letter + '</span>' +
                       '<span class="quiz-opt-text">' + optText + '</span>' +
                       '<span class="quiz-opt-indicator"></span>';
    qOptsEl.appendChild(optBtn);
  });
};

function initSafeShiftDemo() {
  window.renderQuizQuestion();
  window.updateSimHUD();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSafeShiftDemo);
} else {
  initSafeShiftDemo();
}
