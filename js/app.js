let numberOfDisks = 3
let diskObjects = 0
let firstClick = true
let firstTargetedDisk = null
let movesMade = 0
let optimalMoves = 7
let numberOfDisks2 = numberOfDisks

const gameFunctions = {
    diskContainerClicked: (ev) => {
        // console.log(`click `)
        //check if this is the first, disk selecting click
        if (firstClick === true) {
            //mark the selected disk so the user knows something happened
            ev.currentTarget.lastChild.classList.toggle(`selected`)
            //mark the selection in the code, so that the next click can actually perform the movement
            firstTargetedDisk = ev.currentTarget.lastChild
            //tell the code that the first click has now been made
            firstClick = false
            // console.log(`first click`)
        }
        else if (firstClick === false) {
            //regardless of the outcome here, the selected disk should no longer be selected
            firstTargetedDisk.classList.toggle(`selected`)
            //check for disk in new container
            if (ev.currentTarget.hasChildNodes() == true) {
                // console.log(`there is a disk here`)
                //check to make sure the disk being moved is smaller than the one its being put on top of
                if (ev.currentTarget.lastChild.innerHTML > firstTargetedDisk.innerHTML) {
                    ev.currentTarget.appendChild(firstTargetedDisk)
                    gameFunctions.updateMoves()
                }
                else if (ev.currentTarget.lastChild.innerHTML === firstTargetedDisk.innerHTML) {}
                else {
                    alert(`That is not a legal move.`)
                }
            }
            //if no disk, send it
            else {
                ev.currentTarget.appendChild(firstTargetedDisk)
                gameFunctions.updateMoves()
            }
            gameFunctions.checkWin()
            firstClick = true
        }
    },
    diskSelection: (ev) => {
        //prevent default
        ev.preventDefault()
        //take input from form and coerce into a number
        const numberOfDisksSelected = parseInt(document.querySelector(`#number-of-disks-text-box`).value, 10)
        //check if the input was not a valid input (a non-integer)
        if (isNaN(numberOfDisksSelected) === true) {
            alert(`Please enter a valid number. Must be an integer.`)
        }
        //check for absurd numbers that make the game whack and also impossible in a human life-time
        else if (numberOfDisksSelected > 64) {
            alert(`Requests to make more than 64 disks will not be entertained for they cannot be completed by a human within the time span of universe's existance. Up to 64 is only allowed for historical significance.`)
        }
        //if input is valid, use it and restart game.
        else {
            numberOfDisks = numberOfDisksSelected
            optimalMoves = (Math.pow(2, numberOfDisks) - 1)
            document.querySelector(`#moves-goal`).innerHTML = `Goal: ${optimalMoves}`
            gameFunctions.restartGame()
        }
    },
    restartGame: () => {
        //rather than moving and reordering disks, just delete them all and remake them using already made functions
        document.querySelectorAll(`.disk`).forEach((disk) => {
            disk.remove()
        })
        //reset starting conditions
        diskObjects = 0
        firstClick = true
        firstTargetedDisk = null
        movesMade = 0
        document.querySelector(`#moves-made`).innerHTML = `Your moves: 0`
        numberOfDisks2 = numberOfDisks
        //remake disks
        gameFunctions.startPuzzle()
    },
    //function that checks if win condition is met
    checkWin: () => {
        if (document.querySelector(`#disk-container-3`).childElementCount === numberOfDisks2) {
            alert(`You have successfully completed the puzzle. You took ${movesMade} moves to do so, ${movesMade - optimalMoves} more than necessary. Feel free to keep moving the disks around.`)
            // add to the number of disks so that the check win wont pop off more than once if they keep playgin around with the disks.
            numberOfDisks2 += 1
        }
    },
    //function that does work necessary to get the game going at first
    startPuzzle: () => {
        for (let i = 0; i < numberOfDisks; i++) {
            const aDisk = new Disk()
            aDisk.diskInitialization()
            aDisk.conjureDisk()
        }
    },
    //function that updates the counter
    updateMoves: () => {
        movesMade += 1
        document.querySelector(`#moves-made`).innerHTML = `Your moves: ${movesMade}`
    },
    //show potential move. append disk early, but not permanently
    diskContainerHovered: (ev) => {
        if (firstClick === false) {
        ev.currentTarget.appendChild(firstTargetedDisk)
        }
    },
}

//create class to easily generate disks that are trackeable and manageable
class Disk {
    constructor() {
        //establish some keys with default values that will need to be changed by functions and relationships with outside variables (number of disks)
        this.rank = 0;
        //create a width key that can be used as a reference for the visual width
        this.width =  0;
    }
    //set the rank according to the number of discs
    setRank () {
        //by subtracting disks on page (which is equal to current disk number) from number of disks, we get distance from the top. Add one to make the top rank equal to 1, instead of 0
        this.rank = numberOfDisks - diskObjects + 1
    }
    //set the width according to the ranking among disks
    setWidth () {
        //I dont want it to fully extend out, only 90%. I also want it to not ever be smaller than the rod itself, so i subtract rod width (and a little extra for improved visual) from 90 and add it as a baseline.
        this.width = ((this.rank / numberOfDisks) * 86) + 4
    }
    //one functione that initializes the disk and registers it with the known disk objects
    diskInitialization () {
        diskObjects += 1
        this.setRank()
        this.setWidth()
    }
    //add the disk to the page as an element, in proper starting position
    conjureDisk () {
        //create the document object/element
        let thisDisk = document.createElement(`div`)
        //make it similar to all other disks
        thisDisk.setAttribute(`class`, `disk`)
        //make it unique also
        thisDisk.setAttribute(`id`, `disk${this.rank}`)
        //set some inner text so that i can identify rank based on element selections
        thisDisk.innerHTML = `<p>${this.rank}</p>`
        //set the width for appearance
        thisDisk.style.width = `${this.width}%`
        //set the height. I dont want it looking too tall when we dont have a lot of disks, so i set a conditional. this could backfire if someones view-port is extremely limited vertically, but i dont care right now
        if (numberOfDisks < 10) {
            thisDisk.style.height = `10%`
        }
        else {
            thisDisk.style.height = `${90 / numberOfDisks}%`
        }
        // thisDisk.style.left = `${(100 - this.width) / 2}%` 
        //^^^ originally this is how i centered it before flexbox
        document.querySelector(`#disk-container-1`).appendChild(thisDisk)
    }
}

//generate the desired number of disks
gameFunctions.startPuzzle()

//add event listeners to each disk container. doesnt need to target disks, because they can only move the topmost disk anyway
document.querySelectorAll(`.disk-container`).forEach((diskContainer) => {
    diskContainer.addEventListener(`click`, gameFunctions.diskContainerClicked)
})

//restart puzzle attached to the button
document.querySelector(`#restart-puzzle`).addEventListener(`click`, gameFunctions.restartGame)

//let user decide how many disks with this form
const numberOfDisksSelector = document.querySelector(`#number-of-disks`)
numberOfDisksSelector.onsubmit = gameFunctions.diskSelection

document.querySelectorAll(`.disk-container`).forEach((diskContainer) => {
    diskContainer.addEventListener(`mouseenter`, gameFunctions.diskContainerHovered)
})