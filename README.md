# 🏁 *RETRO RACERS* 🏁

<img width="947" alt="Screenshot 2024-08-19 at 11 41 59" src="https://github.com/user-attachments/assets/599a2c12-650f-46d2-954e-d7573aba32f6">

Retro Racers is a simple racing game developed during Code Institute's August Hackathon, themed "Pixel Pioneers". It is a laptop/desktop game, whereby the car is controlled using a keyboard.

The live deployed site can be found [here](https://alanjameschapman.github.io/2408-hackathon-team5/).

Please use GitHub's burger bun to navigate between sections.

# Agile Development

The project was developed using Agile principles throughout. Minutes [here](#minutes "Minutes"). User stories were prioritized using MoSCoW, and the Minimum Viable Product (MVP) was  identified for early deployment.

# User Experience

The five planes of User Experience were used to design the website. This is not a linear process - each plane was considered and developed throughout development.

<img src="https://github.com/alanjameschapman/whiteboard/raw/main/docs/screenshots/uxplanes.png" alt="ux5planes" width="500"/>

## Strategy

Based on the Code Institute Hackathon August 2024 Theme of "Pixel Pioneers", the goal of this platform is to:
- Make a retro game complete with 8 bit sound effects and music.
- Use HTML, CSS, JavaScript and JS game framework such as Three.js.

Following an initial brainstorm of possible games, a plan-view racing game concept was chosen, similar to the original Micro-Machines video game, developed by Codemasters for the NES.

Needs of users were defined as user stories and managed via [GitHub Issues/Projects](https://github.com/users/alanjameschapman/projects/7).

## Scope

Once the game was chosen, existing online games were researched to help identify what would be included in the scope of the project. Possible features were identified and converted to user stories within GitHub projects.

## Structure

[Lucidchart](https://www.lucidchart.com) was used to structure the site navigation as shown in the user flow diagram below. This was later developed into wireframes - see the Skeleton section.

![Retro Racer Flow](https://github.com/user-attachments/assets/80c282c7-0835-4cd0-9078-9fcbdd65d7df)

## Skeleton

### Interface Design

A laptop-first approach was used, with subsequent layouts for larger screens developed thereafter.

#### Wireframe

A concept design was created during the brainstorming phase, showing possible track layout and game features for development.

<img width="717" alt="Screenshot 2024-08-17 at 13 18 48" src="https://github.com/user-attachments/assets/b711f6e0-8002-4871-b0e6-c28f136c8da9">

It was not necessary to create wireframes for such simple page layouts.

### Navigation Design

To give a retro feel and simple site layout, the home screen uses a gearshift image and links to each page. Each page has a link to return to the main menu only. following links: home, race, settings and high scores.

## Surface

### Colour schemes

The colour scheme is based on the NES of greys and red.

![NES](https://github.com/user-attachments/assets/a3eaa306-a7e6-4f0b-b823-0a5a72f5ac3c)

### Fonts

Press Start 2P from [Google Fonts](https://fonts.google.com/specimen/Press+Start+2P/about) was chosen to create an 80's arcade game feel and a feeling of nostalgia.

# Features

## Implemented

### Main menu (index.html)

The home page allows the user to navigate around the site using a retro-looking image of a gearshift. Users are greeted by 8 bit music which can be muted if preferred. This mutable music is present on every page.

| Screenshot |
| :-: |
| <img width="506" alt="Screenshot 2024-08-19 at 12 27 48" src="https://github.com/user-attachments/assets/89a61568-928b-4d72-9ba2-2ce053507995"> |

### Help (help.html)

The help page gives helpful instructions on gameplay and scoring, as well as a link to return to the main menu.

| Screenshot |
| :-: |
| <img width="587" alt="Screenshot 2024-08-19 at 12 32 41" src="https://github.com/user-attachments/assets/6c56d412-17ab-4536-89c3-dfe5c3e4c08c"> |

### Settings (settings.html)

The settings page currently only gives users the ability to change the music, as well as a link to return to the main menu.

| Screenshot |
| :-: |
| <img width="526" alt="Screenshot 2024-08-19 at 12 38 17" src="https://github.com/user-attachments/assets/394a3b44-f31d-4a55-916f-c68dca2e6a4b"> |

### High Scores (highscores.html)

The high scores page gives the top 10 scores, as well as a link to return to the main menu.

| Screenshot |
| :-: |
| <img width="534" alt="Screenshot 2024-08-19 at 12 39 05" src="https://github.com/user-attachments/assets/33d88de4-3522-449e-b5a8-ee7b98a26e60"> |

### Race (race.html)

The race page gives helpful instructions on gameplay and scoring, as well as a link to return to the main menu.

| Screenshot |
| :-: |
| <img width="619" alt="Screenshot 2024-08-19 at 12 43 53" src="https://github.com/user-attachments/assets/53f2caee-82a8-4584-b498-766907d81620"> |

## Not implemented...yet

### Settings (settings.html)

The settings page will eventually gives users the ability to change the difficulty level and car colour.

| Screenshot |
| :-: |
| <img width="517" alt="Screenshot 2024-08-19 at 12 34 06" src="https://github.com/user-attachments/assets/11904477-ca55-4760-887c-ba1737778a73"> |

For other features not yet implemented, see the project's open issues [here](https://github.com/users/alanjameschapman/projects/7/views/1)

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
- [BeepBox](https://www.beepbox.co): Online tool for creating chiptune-music style, which is reminiscent of the sounds from retro video games.
- [Bosca Ceoil](https://yurisizov.itch.io/boscaceoil-blue) - Open-source music creation software to compose music with a retro or chiptune style.

## Deployment, Development & Version Control

Each software developer on the team used their own development environment and individual branch (using their initials for ID) divergent from main from the start and have communicated via Slack to collaborate, pitch ideas, fix bugs and talk about relevant Pull Requests. Regular commits and pushes to Github have been employed to be able to track and trace the development process of the web application.

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

### Responsiveness

The responsiveness to different screen sizes was checked throughout the project. Results for MVP and final site are shown below, the main visual difference being fonts.

<img width="947" alt="Screenshot 2024-08-19 at 11 41 59" src="https://github.com/user-attachments/assets/599a2c12-650f-46d2-954e-d7573aba32f6">

### Browser Compatibility

Browser compatibility was tested using this [MDN guide](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction) as a reference. The following was testing in each browser:
- Functionality, navigation and hyperlinks
- Responsiveness
- Aesthetics

| Chrome | Firefox | Safari
| :-: | :-: | :-: |
| &check; | &check; | &check; |

### Bugs

Bugs were tracked throughout the project as GitHub issues.

### Lighthouse

The WAVE Web Accessibility Evaluation Tool was used throughout the project to check for accessibility issues. Lighthouse was then used to test the performance, accessibility, best practices and SEO of the deployed site. The PWA score not showing is a [known feature](https://stackoverflow.com/questions/60603960/why-lighthouse-pwa-score-is-blank-even-though-the-page-is-audited).

Page | Laptop | Desktop | Comment |
| :-: | :-: | :-: | :-: |
| [register](https://whiteboard-app-742f545f1848.herokuapp.com/accounts/signup/) | ![register-mobile](/docs/testing/lighthouse/register-mobile.png) | ![register-desktop](/docs/testing/lighthouse/register-desktop.png) | None |

### Code Validation

#### HTML

[W3C Markup Validation Service](https://validator.w3.org/) was used to validate the HTML.

<img width="756" alt="Screenshot 2024-08-19 at 13 00 12" src="https://github.com/user-attachments/assets/14736afe-1fa3-491c-8d08-6589c1a1550f">

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

# Agile

## Minutes

| Meeting | Minutes | Actions
| - | - | - |
| Thu, 10AM | - EA shared concept ideas as discussed at KO meeting.<br/> - Agreed on micro-machines-style game i.e. bird's-eye view of racing car(s) around a track with obstacles and power-ups (oil-slicks, magnets etc.)<br/> - Three.js framework to be used.<br/> - MVP deployment Friday PM latest to include track and single car only. | - EA: cars.<br/>- MB: track.<br/>- TG: 8-bit music.<br/>- AC: issues for kanban, agile documentation, then helping elsewhere.
| Thu, 7PM | Discussed inital progress and obstacles. | - Mick to help Tamas on integrating 8-bit music.<br/>- Mark to develop track further.<br/>- AJC to develop site nav.|
| Fri, 10AM | - Code tweak could generate realistic 2D track.<br/>- Discussed how to generate realistic computer racers.<br/>- High scores page can be for points instead of timings (which wouldn’t be relevant for new tracks every time). User scores 5, 3 then 1 for 1st, 2nd and 3rd out of 6. Need to finish in top 3 to progress to next race. | - Efren to push car to repo then work on moving car around track with user input.<br/>- Mark to convert track from 3D to 2D to help realistic track rendering.<br/>- AJC to continue with overall site and styling. |
| Fri, 7PM | Worked through merge conflicts together as valuable learning exercise | As previous. |
| Sat, 10AM | Limited availability but EA and AJC discussed PRs | - EA working on car movement with user input.<br/>- AJC working on highscores.<br/>- MB working on track 3D to 2D and background.

# Credits

## Media

The favicon is courtesy of <a href="https://www.flaticon.com/free-icons/racer" title="racer icons">Freepik - Flaticon</a>.

## Acknowledgments

This project was created in collaboration by [Retro Racers](https://hackathon.codeinstitute.net/teams/379/): Alan Chapman, Efren Reyes, Mark Butler, Tamas Gavlider and Mick Kavanagh.
