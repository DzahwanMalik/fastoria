# Product Requirements Document (PRD): Competition Event Landing Page

**Status:** Draft
**Target Platform:** Web (Responsive: Desktop, Tablet, Mobile)
**Primary Objective:** To provide a central information hub and registration portal for competition event participants, facilitating quick access to registration forms and competition guidebooks.

## 1. Page Architecture (Layout Structure)

The landing page will utilize a *single-page* approach (one long scrolling page) with navigation links acting as anchors pointing to specific sections.

**Section Order:**

1. Navbar (Sticky)
2. Hero Banner with Countdown
3. Competition List (Grouped by Level/Category)
4. Contact Information
5. Sponsors (Infinite Carousel)
6. Footer

## 2. Functional Requirements

### 2.1. Navbar

* **Event Logo:** Placed on the left side (or centered on mobile). Clicking the logo will scroll the user back to the very top (Hero section).
* **Navigation Menu:** Anchor links to main sections (Home, Competitions, Contact, Sponsors).
* **Behavior:**
  * *Sticky/Fixed top:* Remains visible at the top of the screen as the user scrolls down.
  * *Mobile:* Transforms into a collapsible *hamburger menu*.

### 2.2. Hero Banner

* **Background Visual:** Uses a background image or looped video representative of the event.
* **Main Text:** Event name and tagline or the date of the event.
* **Countdown Timer:** Counts down to "D-Day" (the event date) or the registration deadline. Displays indicators for: Days, Hours, Minutes, and Seconds.
* **Primary CTA:** A "View Competitions" button that, when clicked, automatically scrolls down to the Competition section.

### 2.3. Competition Section (By Level)

* **Grouping (Tabs/Filters/Sections):** Competitions are separated based on education level or category (e.g., Elementary, Middle School, High School, University, or General Public).
* **Competition Card (Component for each competition):**
  * **Photo/Thumbnail:** Illustration or mini-poster of the competition.
  * **Competition Name:** Title of the competition in bold text.
  * **Level:** Participant level indicator (e.g., "High School Level").
  * **Competition Type:** Label indicating the participant format (e.g., Individual, Team - 3 People, Open Group).
  * **Registration Fee:** The cost to register (e.g., "$10 / Team" or "Free").
  * **CTA 1 - "Register Now":** Primary button that directly opens the Google Form URL in a new tab (`target="_blank"`).
  * **CTA 2 - "Download Guidebook":** Secondary button that links to a Google Drive folder or directly triggers a PDF file download of the competition guidelines.

### 2.4. Contact Information Section

* **Contact Person (CP):** Displays committee members' names along with their WhatsApp numbers (integrated with `wa.me/` links to open the WhatsApp app directly).
* **Official Email:** A `mailto` link for business inquiries or partnerships.
* **Operating Hours:** (Optional) Information regarding the committee's active hours for replying to messages.

### 2.5. Sponsor Section (Unlimited Carousel)

* **Design:** A horizontal ribbon/row displaying the logos of sponsors and media partners.
* **Animation Behavior:** *Auto-scrolling* (moves horizontally on its own) and forms an *infinite loop* (seamless continuous scrolling).
* **Interaction:** The animation will pause when the user's cursor hovers over the carousel area.

### 2.6. Footer

* **Logo & Tagline:** Placed at the top or left side of the footer.
* **Address:** Physical address of the event location or committee secretariat.
* **Social Media:** Icons (Instagram, TikTok, Twitter, etc.) linked to the event's official accounts.
* **Copyright:** Standard copyright text (e.g., "© 2026 [Event Name]. All rights reserved.").

## 3. Non-Functional Requirements

* **Responsiveness (Responsive Design):**
  * **Mobile (max-width: 768px):** The competition grid collapses into 1 column. The navbar becomes a hamburger menu. Text sizes and padding are adjusted for touch-friendly tapping.
  * **Tablet (768px - 1024px):** The competition grid displays 2 columns.
  * **Desktop (min-width: 1024px):** The competition grid displays 3 or 4 columns. The navbar shows all links horizontally.
* **Performance:**
  * Image assets (especially card thumbnails and sponsor logos) must be size-optimized (e.g., using WebP format) to prevent slow page load times.
  * The countdown script and sponsor carousel animation must be lightweight and not overload the browser's CPU.
* **Accessibility:** All images and logos must have clear descriptive `alt` attributes. Text contrast on the hero banner must be sufficient against the background image.

## 4. Tech Stack Suggestion

*(This section can be adjusted based on the development team's preferences)*

* **Frontend Framework:** React, Vue 3, or Next.js / Nuxt (for speed optimization and SEO if needed).
* **Styling:** Tailwind CSS (highly recommended for speeding up responsive design and Card component creation).
* **Carousel Animation:** Pure CSS Keyframes or lightweight libraries like Swiper.js or Framer Motion.
* **Hosting:** Vercel, Netlify, or Firebase Hosting.