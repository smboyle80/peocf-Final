"use strict";

/* ================================================
   CHAPTER PASSWORD
   To change the password, edit the value below.
   ================================================ */
const CHAPTER_PASSWORD = "peo2026";

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
        <div class="dash-card">
            <h3>📣 Chapter Announcements</h3>
            <ul class="announce-list">
                <li>
                    <strong>April Meeting Reminder</strong> – Our chapter meeting is April 17 at 6:30 PM. Please RSVP by April 14.
                </li>
                <li>
                    <strong>Scholarship Nominations Open</strong> – Nominate a deserving woman for our P.E.O. STAR Scholarship by April 30.
                </li>
                <li>
                    <strong>New Member Welcome</strong> – Please join us in welcoming our newest sister, Jane Monroe, to Chapter CF!
                </li>
                <li>
                    <strong>Trivia Night High Score</strong> – Congratulations to Team &ldquo;Quiz Queens&rdquo; for topping last month's scoreboard! 🏆
                </li>
            </ul>
        </div>

        <!-- Member Directory -->
        <div class="dash-card">
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
                    <tr><td>Susan Davis</td><td>susan@example.com</td><td>(480) 555-0101</td></tr>
                    <tr><td>Carol Hammond</td><td>carol@example.com</td><td>(480) 555-0132</td></tr>
                    <tr><td>Diane Torres</td><td>diane@example.com</td><td>(602) 555-0178</td></tr>
                    <tr><td>Jane Monroe</td><td>jane@example.com</td><td>(480) 555-0199</td></tr>
                    <tr><td>Patricia Wells</td><td>pat@example.com</td><td>(623) 555-0211</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Resources -->
        <div class="dash-card">
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
                    <a href="#" class="resource-link">View</a>
                </li>
                <li>
                    <span class="resource-icon">📄</span>
                    <span>P.E.O. STAR Scholarship Application</span>
                    <a href="#" class="resource-link">Download</a>
                </li>
                <li>
                    <span class="resource-icon">📄</span>
                    <span>Chapter CF Fun Committee Calendar 2026</span>
                    <a href="#" class="resource-link">Download</a>
                </li>
                <li>
                    <span class="resource-icon">🔗</span>
                    <span>P.E.O. International Website</span>
                    <a href="https://www.peointernational.org" target="_blank" rel="noopener" class="resource-link">Visit</a>
                </li>
            </ul>
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

        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        loginError.hidden = false;
        pwInput.value = "";
        pwInput.focus();
    }
});

/* ================================================
   SIGN OUT — clears dashboard from DOM entirely
   ================================================ */
function signOut() {
    // Remove the dashboard HTML from the page completely
    dashboardContainer.innerHTML = "";
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
