"use strict";

/* ================================================
   CHAPTER PASSWORD
   To change the password, edit the value below.
   ================================================ */
const CHAPTER_PASSWORD = "peoCF1979";

/* ================================================
   DASHBOARD CONTENT
   All member content lives here in JavaScript.
   It is never sent to the browser until the correct
   password is entered — it cannot be seen in
   the page source or browser developer tools.
   ================================================ */
function buildDashboard() {
    return `
    <section class="dashboard-section" aria-label="Member Dashboard">

        <div class="dashboard-header">
            <h2>Welcome, Sister! <span class="welcome-sub">Chapter CF Members Area</span></h2>
            <button id="signOutBtn" class="signout-btn">Sign Out</button>
        </div>

        <!-- Announcements -->
        <div class="dash-card" id="announcements">
            <h3>📣 Chapter Announcements</h3>
            <ul class="announce-list">
                <li>
                    <strong>April Meeting Reminder</strong> – Our chapter meeting is April 20 at 12:00 PM. Please RSVP by April 14.
                </li>
                <li>
                    <strong>Scholarship Nominations Open</strong> – Nominate a deserving woman for our P.E.O. STAR Scholarship.
                </li>
                <li>
                    <strong>Happy Birthday</strong> – Please join us in sending birthday wishes to Harriett Agius on March 31st!
                </li>
                <li>
                    <strong>Monthly Breakfast</strong> – Breakfast will be held April 4th at Kiss the Cook, 4915 W. Glendale Ave. Please remember to RSVP and bring a friend! 
                </li>
            </ul>
        </div>

        <!-- Member Directory -->
        <div class="dash-card" id="memberDirectory">
            <h3>👥 Member Directory</h3>
            <p class="dash-note">Visible to members only — please keep this information confidential.</p>
            <table class="event-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Harriett Agius</td><td>capeleka4@gmail.com</td><td>(602) 439-1399</td></tr>
                    <tr><td>Marilyn Ashworth</td><td>mareashworth@cox.net</td><td>(602) 369-2525</td></tr>
                    <tr><td>Susan Davis</td><td>smboyle80@gmail.com</td><td>(480) 209-5651</td></tr>
                    <tr><td>Mary Ellen Edwards</td><td>maryellenedwards@cox.net</td><td>(602) 370-0852</td></tr>
                    <tr><td>Dixy Iglesias</td><td>dixyiglesias@gmail.com</td><td>(206) 356-4110</td></tr>
                    <tr><td>Juneal Lipscomb</td><td>junealsl@gmail.com</td><td>(602) 885-2742</td></tr>
                    <tr><td>Tracy Milanese</td><td>tracygmilanese@gmail.com</td><td>(703) 987-8332</td></tr>
                    <tr><td>Malyssa Paul</td><td>malyssadunson@gmail.com</td><td>(623) 570-3603</td></tr>
                    <tr><td>Julie Rill</td><td>rilljulie@gmail.com</td><td>(505) 660-1777</td></tr>
                    <tr><td>Ann Schaar</td><td>aschaar@cox.net</td><td>(623) 979-3953</td></tr>
                    <tr><td>Myrna Stephens</td><td>myrna.stephens@gmail.com</td><td>(480) 577-2533</td></tr>
                    <tr><td>Kelly Swicher</td><td>swicherk@gmail.com</td><td>(623) 755-4585</td></tr>
                    <tr><td>Mylla Edwards</td><td>milenabaraujo@gmail.com</td><td>(623) 302-2058</td></tr>
                    <tr><td>Erica Eggen</td><td>erica.eggen@gmail.com</td><td>(602) 321-1063</td></tr>
                    <tr><td>Danille Willars</td><td>danwill458@gmail.com</td><td>(480) 000-0000</td></tr>
                    <tr><td>Jamie King</td><td>jamieking@kingdirectemail.com</td><td>(602) 000-0000</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Resources -->
        <div class="dash-card" id="resources">
            <h3>📁 Chapter Resources</h3>
            <ul class="resource-list">
                <li>
                    <span class="resource-icon">📄</span>
                    <span>Chapter CF Bylaws (2025)</span>
                    <a href="#" class="resource-link">View</a>
                </li>
                <li>
                    <span class="resource-icon">📄</span>
                    <span>Meeting Minutes – March 2026</span>
                    <a href="https://drive.google.com/file/d/18X-iN5THjmay11xToQhxM47ilSVxJ_KS/view?usp=drive_link" target="_blank" rel="noopener" class="resource-link">View</a>
                </li>
                <li>
                    <span class="resource-icon">📄</span>
                    <span>Meeting Minutes Archive</span>
                    <a href="https://drive.google.com/drive/folders/1_6kNK-p9-A7d8wwArqJQMKt4Q6-0VjMz?usp=sharing" target="_blank" rel="noopener" class="resource-link">View</a>
                </li>
                <li>
                    <span class="resource-icon">📄</span>
                    <span>Chapter CF Fun Committee Calendar 2026</span>
                    <a href="https://calendar.google.com/calendar/u/0?cid=cGVvY2hhcHRlcmNmQGdtYWlsLmNvbQ" target="_blank" rel="noopener" class="resource-link">View</a>
                </li>
                <li>
                    <span class="resource-icon">🔗</span>
                    <span>P.E.O. International Website</span>
                    <a href="https://www.peointernational.org" target="_blank" rel="noopener" class="resource-link">Visit</a>
                <li>
                    <span class="resource-icon">🔗</span>
                    <span>P.E.O. Arizona Website</span>
                    <a href="https://azpeo.org/" target="_blank" rel="noopener" class="resource-link">Visit</a>
                </li>
            </ul>
        </div>

        <!-- Prayer Requests -->
        <div class="dash-card" id="prayerRequests">
            <h3>🙏 Prayer Requests</h3>
            <p class="dash-note">Share a prayer request with your sisters. You may include your name or submit anonymously.</p>

            <form id="prayerForm" class="prayer-form">
                <div class="prayer-input-row">
                    <label for="prayerName">Your Name</label>
                    <div class="prayer-anon-row">
                        <input type="text" id="prayerName" placeholder="First name or leave blank">
                        <label class="anon-label">
                            <input type="checkbox" id="prayerAnon"> Submit anonymously
                        </label>
                    </div>
                </div>
                <div class="prayer-input-row">
                    <label for="prayerText">Prayer Request*</label>
                    <textarea id="prayerText" placeholder="Share your prayer request here..." required></textarea>
                </div>
                <button type="submit" class="prayer-submit-btn">Add Request</button>
            </form>

            <div id="prayerList" class="prayer-list">
                <p class="prayer-empty" id="prayerEmpty">No prayer requests yet — be the first to share one.</p>
            </div>
        </div>

    </section>`;
}

/* ================================================
   DOM REFERENCES
   ================================================ */
const signInForm        = document.getElementById("signInForm");
const loginError        = document.getElementById("loginError");
const signinSection     = document.getElementById("memberArea");
const dashboardContainer = document.getElementById("dashboardContainer");
const togglePwBtn       = document.getElementById("togglePw");
const pwInput           = document.getElementById("password");
const forgotMsg         = document.getElementById("forgotMsg");

/* ================================================
   SIGN IN
   ================================================ */
signInForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const entered = pwInput.value;

    if (entered === CHAPTER_PASSWORD) {
        // Hide the sign-in panel
        signinSection.hidden = true;
        loginError.hidden = true;

        // Build and inject the dashboard — only happens now, after correct password
        dashboardContainer.innerHTML = buildDashboard();

        // Wire up the sign-out button that now exists in the DOM
        document.getElementById("signOutBtn").addEventListener("click", signOut);

        // Wire up prayer request form
        document.getElementById("prayerForm").addEventListener("submit", submitPrayer);

        // Restore any saved prayer requests for this session
        renderPrayers();

        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        loginError.hidden = false;
        pwInput.value = "";
        pwInput.focus();
    }
});

/* ================================================
   PRAYER REQUESTS
   ================================================ */
let prayerRequests = [];

function submitPrayer(e) {
    e.preventDefault();
    const nameInput = document.getElementById("prayerName");
    const anonCheck = document.getElementById("prayerAnon");
    const textInput = document.getElementById("prayerText");

    const text = textInput.value.trim();
    if (!text) return;

    const isAnon = anonCheck.checked;
    const name = isAnon || !nameInput.value.trim() ? "Anonymous" : nameInput.value.trim();

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    prayerRequests.unshift({ name, text, date: dateStr });

    // Reset form
    textInput.value = "";
    nameInput.value = "";
    anonCheck.checked = false;

    renderPrayers();
}

function renderPrayers() {
    const list = document.getElementById("prayerList");
    const empty = document.getElementById("prayerEmpty");
    if (!list) return;

    // Remove existing prayer items (keep the empty message)
    list.querySelectorAll(".prayer-item").forEach(el => el.remove());

    if (prayerRequests.length === 0) {
        if (empty) empty.style.display = "";
        return;
    }

    if (empty) empty.style.display = "none";

    prayerRequests.forEach(function(req, i) {
        const item = document.createElement("div");
        item.className = "prayer-item";
        item.innerHTML = `
            <div class="prayer-meta">
                <span class="prayer-author">${req.name === "Anonymous" ? "🕊️ Anonymous" : "🙏 " + req.name}</span>
                <span class="prayer-date">${req.date}</span>
                <button class="prayer-delete" data-index="${i}" aria-label="Remove request">✕</button>
            </div>
            <p class="prayer-text">${req.text}</p>
        `;
        list.appendChild(item);
    });

    // Wire up delete buttons
    list.querySelectorAll(".prayer-delete").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const idx = parseInt(btn.getAttribute("data-index"));
            prayerRequests.splice(idx, 1);
            renderPrayers();
        });
    });
}

/* ================================================
   SIGN OUT — clears dashboard from DOM entirely
   ================================================ */
function signOut() {
    // Remove the dashboard HTML from the page completely
    dashboardContainer.innerHTML = "";
    prayerRequests = [];
    signinSection.hidden = false;
    signInForm.reset();
    loginError.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ================================================
   SHOW / HIDE PASSWORD
   ================================================ */
togglePwBtn.addEventListener("click", function() {
    if (pwInput.type === "password") {
        pwInput.type = "text";
        togglePwBtn.setAttribute("aria-label", "Hide password");
        togglePwBtn.textContent = "🙈";
    } else {
        pwInput.type = "password";
        togglePwBtn.setAttribute("aria-label", "Show password");
        togglePwBtn.textContent = "👁";
    }
});

/* ================================================
   FORGOT PASSWORD
   ================================================ */
function showForgotMsg() {
    forgotMsg.hidden = false;
}
