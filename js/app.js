let numberOfDisks = 3
let diskObjects = 0
let firstClick = true
let targetedContainer = null
let movesMade = 0
let optimalMoves = (Math.pow(2, numberOfDisks) - 1)

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
function startPuzzle() {
    for (let i = 0; i < numberOfDisks; i++) {
        const aDisk = new Disk()
        aDisk.diskInitialization()
        aDisk.conjureDisk()
    }
}
startPuzzle()

//add event listeners to each disk container. doesnt need to target disks, because they can only move the topmost disk anyway
document.querySelectorAll(`.disk-container`).forEach((diskContainer) => {
    diskContainer.addEventListener(`click`, (ev) => {
        // console.log(`click `)
        //check if this is the first, disk selecting click
        if (firstClick === true) {
            //mark the selected disk so the user knows something happened
            ev.currentTarget.lastChild.classList.toggle(`selected`)
            //mark the selection in the code, so that the next click can actually perform the movement
            firstTargetedContainer = ev.currentTarget
            //tell the code that the first click has now been made
            firstClick = false
            // console.log(`first click`)
        }
        else if (firstClick === false) {
            //regardless of the outcome here, the selected disk should no longer be selected
            firstTargetedContainer.lastChild.classList.toggle(`selected`)
            //check for disk in new container
            if (ev.currentTarget.hasChildNodes() == true) {
                // console.log(`there is a disk here`)
                //check to make sure the disk being moved is smaller than the one its being put on top of
                if (ev.currentTarget.lastChild.innerHTML > firstTargetedContainer.lastChild.innerHTML) {
                    ev.currentTarget.appendChild(firstTargetedContainer.lastChild)
                    updateMoves()
                }
                else if (ev.currentTarget.lastChild.innerHTML === firstTargetedContainer.lastChild.innerHTML) {}
                else {
                    alert(`That is not a legal move.`)
                }
            }
            //if no disk, send it
            else {
                ev.currentTarget.appendChild(firstTargetedContainer.lastChild)
                updateMoves()
            }
            checkWin()
            firstClick = true
        }
    }
    )
}
)

function updateMoves() {
    movesMade += 1
    document.querySelector(`#moves-made`).innerHTML = `Your moves: ${movesMade}`
}

function checkWin () {
    if (document.querySelector(`#disk-container-3`).childElementCount === numberOfDisks) {
        alert(`You have successfully completed the puzzle. You took ${movesMade} moves to do so, ${movesMade - optimalMoves} more than necessary.`)
    }
}

// document.getElementById(`disk1`).addEventListener('click', () => {
//     console.log(`yeah   `)
// })

// document.querySelectorAll(`button`).forEach((button) => {
//     button.addEventListener(`click`, () => {
//         console.log(`click`)
//     })
// })

document.querySelector(`button`).addEventListener(`click`, restartGame)
function restartGame() {
    document.querySelectorAll(`.disk`).forEach((disk) => {
        disk.remove()
    })
    numberOfDisks = 3
    diskObjects = 0
    firstClick = true
    targetedContainer = null
    movesMade = 0
    startPuzzle()
}