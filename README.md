Thinking process
STEP :
1. Set up board [8x8]
2. Random place - 'pathcharacter', 'hat', 'hole'
    - the hole must not block pathcharacter to hat
    - position of 'pathcharacter', 'hat', 'hole' do not overlap.
3. input movement 
    - moveRight [D]
    - moveLeft [A]
    - moveUp [W]
    - moveDown [S]
    - new random [R]
    - quit game [Q]
4. Check pathcharacter's positon
    - Wins by finding the hat. (Show a message like: “🎉 You found the hat! You win!”)
    - Loses by landing on a hole. (Show a message like: “💀 You fell into a hole! Game over.”)
    - Loses by moving outside the field. (Show a message like: “🚫 You went out of bounds! Game over.”)