# Team Name goes here

Responsive Screenshot(s) here

Project Overview

Live deployment link can be found [here](TBC).

# Table of Contents

1. [Project Goals](#project-goals "ProjectGoals")

# Agile Development

The project was developed and [documented](docs/AGILE.md) using Agile principles throughout.

# User Experience

The five planes of User Experience were used to design the website. This is not a linear process - each plane was considered and developed throughout development.

<img src="https://github.com/alanjameschapman/whiteboard/raw/main/docs/screenshots/uxplanes.png" alt="ux5planes" width="500"/>

## Strategy

Based on the Code Institute Hackathon August 2024 Theme of "Pixel Pioneers", the goal of this platform is to create a retro game. We have chosen a Micro-Machines-style Javascript game.

Needs of users were defined as user stories and managed via [GitHub Issues/Projects](https://github.com/users/alanjameschapman/projects/5).

## Scope

Following an initial brainstorm of desired and possible functionality, user stories were tabulated. These were grouped into Epics and Themes for Agile purposes, categorized using MoSCoW, and allocated Story Points (representing amount of work required to implement). By assigning values 1, 2 and 3 to M, S and C respectively, and multiplying by the number of Story Points, functionality could be prioritized and the Minimum Viable Product (MVP) could be identified:

<img src="https://github.com/alanjameschapman/whiteboard/raw/main/docs/screenshots/mvp.png" alt="mvp" width="800"/>

A review of [edublogs](https://edublogs.org/) which appears to be the dominant platform in educational blogs revealed a few additional features, which were not included in the scope of this project:
- Archive section of older posts
- Superuser customisation of page theme, layout, colours, widgets etc.

## Structure

[Lucidchart](https://www.lucidchart.com) was used to structure the site navigation as shown in the user flow diagram below. This was later developed into wireframes - see the Skeleton section.

![user-flow](/docs/wireframes/user-flow.svg)

## Skeleton

### Interface Design

The user flow diagram helped to develop wireframes for each page using [Balsamiq](https://balsamiq.com/). A laptop-first approach was used, with subsequent layouts for larger screens developed thereafter.

#### Tablet wireframes

The main difference for the tablet layout is for the home page, where the posts are displayed in a 3x3 grid.

![wireframes](/docs/wireframes/wireframes-tablet.png)

#### Desktop wireframes

After assessing the wireframes, it was decided that the desktop would follow the same layouts for all pages as the tablet, but with more space between elements. Therefore, it was not necessary to create separate wireframes for the desktop.

### Navigation Design

Whilst developing these wireframes, it was concluded that site navigation would be best served by a navbar on each page, with the following links: home, logout and post creation.

## Surface

### Colour schemes

The colour scheme is based on...

<img src="https://github.com/alanjameschapman/whiteboard/raw/main/static/images/default.jpg" alt="default image" width="500"/>

The dominant colour is yellow, which promotes [positivity, attention and creativity](https://blog.hope-education.co.uk/classroom-psychology-which-colours-are-best-for-education/) in the classroom.

The [Coolors image picker](https://coolors.co/image-picker) was used to generate a colour pallette based on the primary colour yellow. The [consensus](https://whitesharkmedia.com/blog/web-tracking/choose-the-best-color-palette-for-your-website/) for website colour palettes is that in addition to white, three colours should be used - primary, seconday and accent - in a ratio of 60:30:10.

The colour combination was regenerated until the three colours generated a positive response in the author and provided suitable contrast, which was checked using [eightshapes](https://eightshapes.com/).

### Fonts

[iloveewp](https://www.ilovewp.com/resources/education/wordpress-for-schools/most-used-google-fonts-on-school-websites/) lists the "Most Used Google Fonts on School Websites". The top fonts were reviewed and Raleway was selected for its unique 'w' which would be used as the branding, navbar, footer and favicon to represent the 'w' in whiteboard:

[fontjoy](https://fontjoy.com/) was used to find suitable pairing fonts. Martel Sans was chosen because it has serif and sans-serif variants for headings and paragraphs respectively. Sans-serif was chosen for paragraph text because serifs can be difficult to read on screens.

<img src="https://github.com/alanjameschapman/whiteboard/raw/main/docs/screenshots/fonts.png" alt="fonts" width="400"/>

[favicon.io](https://favicon.io/favicon-generator/) was used to generate the favicon, based on the colour pallet.

![favicon](/docs/screenshots/favicon.png)

# Features

## Implemented

### Navbar and Footer (all pages)

The navbar and footer are present on all pages and are responsive to different screen sizes.

The navbar is not fixed to the top of the page because it is not necessary to be visible at all times. To minimise user clicks, a 'burger bun' is not used because there is enough space to display the logo and links, even for mobile devices.

| Screenshot |
| :-: |
| <img src="https://github.com/alanjameschapman/whiteboard/raw/main/docs/features/navbar-teacher.png" alt="navbar-teacher" width="400"/> |

| Element | Description |
| - | - |
| Logo | Link to the home page |

The footer is not fixed to the bottom of the page because it is not necessary to be visible at all times.

### Register (register.html)

The register screen allows the user to register for the site. The user can enter their username, email and password, and click the register button.

| Screenshot |
| :-: |
| <img src="https://github.com/alanjameschapman/whiteboard/raw/main/docs/features/register.png" alt="register" width="400"/> |

| Element | Description |
| - | - |
| Login link | Link to login |

## Not implemented...yet

| Issue# | User Story | Wireframe |
| :-: | :-: | :-: |
| [24](https://github.com/alanjameschapman/whiteboard/issues/24) | As a user I can search for content so that I can quickly find help on any given topic. | ![wireframe](/docs/features/search.png) |

## Technologies, Languages & Programs Used

- [HTML](https://www.w3schools.com/html/): Markup language for creating web pages.
- [CSS](https://www.w3schools.com/CSS/): Stylesheet language for styling the appearance of web pages.
- [JavaScript](https://www.javascript.com/): Programming language for adding interactivity to web pages.
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/): CSS framework for creating responsive and modern web designs.
- [GitHub](https://github.com/): Web-based platform for version control and collaboration on software projects.
- [GitHub Pages](https://pages.github.com/): Hosting service provided by GitHub for publishing static web pages.
- [Google Fonts](https://fonts.google.com/): Library of free and open-source web fonts.
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/): Automated tool for auditing and improving web page quality.
- [W3C Validator](https://validator.w3.org/): Tool for checking HTML and CSS code compliance with web standards.
- [JSHint](https://jshint.com/): Static code analysis tool for detecting errors and potential issues in JavaScript code.
- [VSCode](https://code.visualstudio.com/): Free and highly extensible source code editor with built-in features for editing, debugging, and version control integration. It supports various programming languages and is available for multiple platforms.

## Deployment, Development & Version Control

Each software developer on the team used their own development environment individual branch divergent from main from the start and have communicated via Slack to collaborate, pitch ideas, fix bugs and talk about relevant Pull Requests. Regular commits and pushes to Github have been employed to be able to track and trace the development process of the web application.

### Local Deployment

This repository can be cloned and run locally with the following steps:

- Login to GitHub.
- Select repository named: https://github.com/alanjameschapman/2408-hackathon-team5/
- Click code toggle button and copy the url (https://github.com/alanjameschapman/2408-hackathon-team5.git).
- In your IDE, open the terminal and run the git clone command (git clone https://github.com/alanjameschapman/2408-hackathon-team5.git). The repository will now be cloned in your workspace.

### Deployment to GitHub

The live version of the project is deployed at GitHub pages.

The procedure for deployment followed the "Creating your site" steps provided in GitHub Docs.

- Log into Github.
- Select desired GitHub Repository to be deployed live.
- Underneath the repository name, click the “Settings” option.
- In the sub-section list on the left, under “Code and automation”, click “Pages”.
- Within the ”Source” section choose ”main” as Branch and root as folder and click ”Save”.
- The page refreshes and a website shall then deploy via a link.
- The following is the live link deployed: https://github.com/alanjameschapman/2408-hackathon-team5/

# Testing

## Manual Testing

### User Stories

User Stories were tracked throughout the project as [GitHub issues](https://github.com/users/alanjameschapman/projects/5). Links are provided to see the development notes and screenshots for each.

#### Users 

| As a user I can... | ...so that I can... | Checked | Issue# |
| :- | :- | :-: | :-: |
| view all posts summarized | browse topics | &check; | [23](https://github.com/alanjameschapman/whiteboard/issues/23) |

### User Input Validation

User inputs were validated for various incorrect inputs throughout the project. Results for the final site are shown below.

| Page | Input | Test | Outcome | Screenshot | Pass |
| :-: | :-: | :-: | :-: | :-: | :-: |
| [register](https://whiteboard-app-742f545f1848.herokuapp.com/accounts/signup/) | username | no username | prompt to fill in field | ![register-nousername](/docs/testing/register-nousername.png) | &check; |

### Responsiveness

The responsiveness to different screen sizes was checked throughout the project. Results for MVP and final site are shown below, the main visual difference being fonts.

| Stage | iPhone 6/7/8 | iPad | Laptop
| :-: | :-: | :-: | :-: |
| MVP | ![mvpiphone678](/docs/testing/response/mvpiphone678.png) | ![mvpiad](/docs/testing/response/mvpipadair.png) | ![MVPMacBookAir](/docs/testing/response/mvpmacbookair.png)
| Final | ![finaliphone678](/docs/testing/response/finaliphone678.png) | ![finalipad](/docs/testing/response/finalipadair.png) | ![finalMacBookAir](/docs/testing/response/finalmacbookair.png)

### Browser Compatibility

Browser compatibility was tested throughout the project as shown below. Using this [MDN guide](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction) as a reference, the following was testing in each browser:
- Functionality, navigation and hyperlinks
- Responsiveness
- Aesthetics

| Stage | Chrome | Firefox | Safari
| :-: | :-: | :-: | :-: |
| MVP | &check; | &check; | &check; |
| Final | &check; | &check; | &check; |

### Bugs

Bugs were tracked throughout the project as GitHub issues. Links are provided to see the development notes and screenshots for each.

#### Resolved

| Issue | Problem | Screenshot | Solution | Screenshot |
| :-: | :-: | :-: | :-: | :-: |
| [#29](https://github.com/alanjameschapman/whiteboard/issues/29) | Edit button not populating comment box for editing | ![#29](/docs/issues/29-1.png) | Javascript amended from "id_body" to "id_content | ![#29](/docs/issues/29-2.png) |

#### Unresolved

The only unresolved bug is the password reset not working. This does not affect the website functionality because the admin can reset passwords manually.

| Issue# | Problem | Screenshot | Comment |
| :-: | :-: | :-: | :-: |
[36](https://github.com/alanjameschapman/whiteboard/issues/36) | password reset not working | ![#36](/docs/issues/36-1.png) | This bug and associated [Issue#7](https://github.com/alanjameschapman/whiteboard/issues/7) for password reset moved to backlog for future development. |

### Lighthouse

The WAVE Web Accessibility Evaluation Tool was used throughout the project to check for accessibility issues. Lighthouse was then used to test the performance, accessibility, best practices and SEO of the deployed site. The PWA score not showing is a [known feature](https://stackoverflow.com/questions/60603960/why-lighthouse-pwa-score-is-blank-even-though-the-page-is-audited).

Page | Mobile | Desktop | Comment |
| :-: | :-: | :-: | :-: |
| [register](https://whiteboard-app-742f545f1848.herokuapp.com/accounts/signup/) | ![register-mobile](/docs/testing/lighthouse/register-mobile.png) | ![register-desktop](/docs/testing/lighthouse/register-desktop.png) | None |

### Code Validation

#### HTML

[W3C Markup Validation Service](https://validator.w3.org/) was used to validate the HTML. The Django template language cannot be validated by URI using the W3C validator, so the rendered HTML was copied and pasted into the direct input form for each page.

| Page | W3C URL | Screenshot | Notes | Pass |
| :-: | :-: | :-: | :-: | :-: |
| [register](/registration/signup.html) | [W3C](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwhiteboard-app-742f545f1848.herokuapp.com%2Faccounts%2Fsignup%2F) | ![register](/docs/testing/register.png) | Errors relate to built-in Django form and don't affect UX or functionality. | &check; |

#### CSS

CSS was validated by direct input using [jigsaw W3C Validation Service](https://jigsaw.w3.org/css-validator/) and validates as CSS level 3 + SVG:

<p>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="https://jigsaw.w3.org/css-validator/images/vcss-blue"
            alt="Valid CSS!"/>
    </a>
</p>

#### JavaScript

[jshint](https://jshint.com/) was used to validate the only custom JavaScript file, [comments.js](/staticfiles/js/comments.js), used to edit, delete and approve comments.

| File | Screenshot | Description | Pass |
| :-: | :-: | :-: | :-: |
| [comments](/staticfiles/js/comments.js) | ![comments.js](/docs/testing/comments-js.png) | One warning about a function 'getCookie' declared in a loop referencing an outer scoped variable. Reviewed but syntax deemed not difficult to understand. | &check; |

## Credits

### Media

The favicon is courtesy of [Somebody via Flaticon or similar](link here).

### Acknowledgments

This project was created in collaboration by [Team Name](https://hackathon.codeinstitute.net/teams/379/): Alan Chapman, Efren Reyes, Mark Butler, Tamas Gavlider.
