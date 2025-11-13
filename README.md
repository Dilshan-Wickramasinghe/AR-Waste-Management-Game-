# AR Waste Management Game

An Augmented Reality (AR)-based game aimed at educating and engaging users in waste management and recycling practices through interactive gameplay.

## Project Overview

This project aims to create a game using Augmented Reality to raise awareness about waste segregation, recycling, and sustainable behaviour. Players use their device cameras (or AR markers) to interact with virtual waste items, sort them into the correct bins, perhaps earn points or complete levels thereby turning environmental education into engaging gameplay.

## Features

Key features could include:

* AR detection of virtual waste items or real-world markers
* Waste categories (e.g., biodegradable, recyclable, hazardous) and sorting interaction
* Points or reward system for correct sorting
* Feedback for incorrect sorting (educational explanation)
* Level progression, time or resource constraints to increase challenge
* Possibly a leaderboard, user profiles, or achievement badges
* Mobile (and/or tablet) support for AR experience

## Technology Stack

* AR Framework: (e.g., ARCore, ARKit, Vuforia)
* Game engine / platform: (e.g., Unity3D, Unreal Engine, or native mobile)
* Programming Languages: (e.g., C#, Java, Swift)
* UI/UX: HTML/CSS/JS if Web AR, or native mobile UI components
* Version Control: Git (hosted on GitHub)
* Optional: Backend services for user data, scores, analytics

## Architecture & Folder Structure

Example structure (adjust according to actual project):

```
/Assets              – game assets: 3D models, textures, audio  
/Scripts             – game logic, AR interactions, sorting mechanics  
/Scenes              – AR scenes / levels  
/Prefabs             – reusable game objects  
/Resources           – config files, data files  
/Builds              – compiled builds for platforms (Android, iOS)  
/Docs                – documentation, design specs  
```

The architecture separates AR detection & tracking logic, waste-item generation, sorting logic (bin matching), UI/UX, and scoring/feedback modules.

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Dilshan-Wickramasinghe/AR-Waste-Management-Game-.git  
   ```

   (Replace with actual repo URL if different.)
2. Open the project in your chosen game engine/IDE (e.g., Unity).
3. Configure AR support:

   * Install AR plugin (ARCore/ARKit/Vuforia) as needed.
   * Ensure the scene uses correct AR camera and marker/tracker setup.
4. (If backend is used) Configure any server or database for user data/scores.
5. Build and deploy:

   * For Android: select Android platform, install on device, grant camera permission.
   * For iOS: configure provisioning profile, deploy to device.
6. Run the game: start the AR scene, point the camera at the marker/environment, interact with waste items.

## Usage

* Launch the game and allow camera access for AR mode.
* Aim the device camera at the AR marker or ground plane.
* Waste items will appear virtually — drag or tap them and drop into the correct waste bin (recycle, compost, hazardous, etc.).
* Earn points for correct sorting; receive feedback and explanation when sorting is incorrect (educational).
* Progress through levels: increasing number of items, reduced time, more waste categories.
* View your score, achievements, leaderboards (if implemented).
* Optionally: share your results, invite friends, or track real-world waste behaviour.

## Contributing

Contributions are welcome! If you’d like to improve the game:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Make your changes with clear commit messages.
4. Submit a pull request describing your changes.
5. Ensure any new features are tested on supported devices and maintain code quality.

## License

This project is developed as an educational/personal project and is currently **unlicensed** / for educational use only. If you wish to reuse or adapt the code commercially, please contact the author for permission.

## Contact

Author: Dilshan Wickramasinghe
GitHub: [https://github.com/Dilshan-Wickramasinghe](https://github.com/Dilshan-Wickramasinghe)
Feel free to open an issue for bug reports or feature requests.

