# Pentago
 the game of pentago replicated in javascript using p5.js

## How to play:
The board is a 6x6 grid divided up into 4 quadrants

WWWXXX
WWWXXX
WWWXXX
YYYZZZ
YYYZZZ
YYYZZZ

These quadrants are given the names

WX
YZ

### Each turn
Every turn there are two stages: placement and rotation.
In placement, a ball is placed in any of the empty spots
In rotation, any one of the 3x3 quadrants can be rotated once.

### Winning conditions
To win, a player must form a vertical, horizontal or diagonal line of their colour 5 balls long

### Notation
An example of a move would be:

a3Y'

a3: this means that a ball has been placed at the position a3
Y' : this means that the bottom-left quadrant has been rotated anti-clockwise

## Note:
- Anticlockwise rotation is not yet implemented
- Win detection does not detect diagonals yet
- Some Bots not yet implemented

## Bots:
I created some bots to play the game. None of them are any good. Yet

### Random:
Self explanatory name. Does a random valid move
### First Move:
Picks the most top-left corner coordinate and always rotates the W quadrant
### Last Move:
Picks the most bottom-right corner coordinate and always rotates the Z quadrant
### Huddle:
Looks through every empty square and gives it a score based on how many balls surround that square
It picks the most
### Introvert:
Using the same algorithm as Huddle, it picks the least.
### F_Huddle, O_Huddle, F_Introvert, O_Introvert:
An F variant only counts friendly balls when it runs its heuristic, so it can only evaluate the squares around its own pieces with no regard for the opponents pieces
An O variant only counts the opponents balls.
