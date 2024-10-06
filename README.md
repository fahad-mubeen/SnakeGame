# Snake Game

This repository contains a simple implementation of the classic Snake game using HTML, CSS, and JavaScript. **Note**: The game is designed to work on larger screens like PCs and iPads. It is not optimized for smaller mobile devices.

## Project Structure

- `index.html`: Main HTML file that structures the game layout.
- `style.css`: CSS file for styling the Snake game.
- `script.js`: JavaScript file that contains the game logic, including snake movement, food generation, and score management.

## How to Play

1. Clone or download the repository.
2. Open the `index.html` file in a modern browser (preferably on a PC or iPad for the best experience).
3. Click the "Start Game" button to begin playing.

### Controls

- **Arrow keys**: Control the snake's movement:
  - **Up Arrow**: Move up.
  - **Down Arrow**: Move down.
  - **Left Arrow**: Move left.
  - **Right Arrow**: Move right.

### Objective

- Move the snake to eat the food and grow in size.
- Avoid running into the walls or the snake's own body.
- The game ends if the snake collides with the wall or itself.

## Limitations

- **Not Mobile-Friendly**: The game layout is not responsive and may not display correctly on small screens (e.g., mobile phones).
  
## File Overview

- **`index.html`**: 
  - Defines the game layout and links to the necessary CSS and JavaScript files.
  
- **`style.css`**:
  - Styles the game elements, including the game grid, snake, food, and buttons.

- **`script.js`**:
  - Manages the core game logic, including:
    - Snake movement and direction changes.
    - Food placement and collision detection.
    - Score updates and tracking the top score via local storage.
    - Increasing the snake's speed as the score rises.

## Future Enhancements

- **Mobile Responsiveness**: Add media queries and dynamic resizing of the game board to make it work on mobile devices.
- **Customization Options**: Add settings for users to control difficulty or snake speed.
- **Improved Visuals**: Implement enhanced animations and better graphics.
