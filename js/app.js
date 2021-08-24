const rodOne = []
const rodTwo = []
const rodThree = []

let numberOfDisks = 64
let diskObjects = 0

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
        rodOne.push(this)
        document.querySelector(`#disk-container-1`).appendChild(thisDisk)
    }
}

//temporary object for testing
// let testDiskElement = document.createElement(`div`)
// testDiskElement.setAttribute(`class`, `disk`)
// testDiskElement.style.width = `90%`
// testDiskElement.style.height = `10%`
// // testDiskElement.style.left = `4.5%`
// // testDiskElement.style.bottom = `0`
// // testDiskElement.style.backgroundColor = `crimson`
// // testDiskElement.style.position = `absolute`
// // testDiskElement.style.zIndex = `9`
// document.querySelector(`#disk-container-1`).appendChild(testDiskElement)

for (let i = 0; i < numberOfDisks; i++) {
    const aDisk = new Disk()
    aDisk.diskInitialization()
    aDisk.conjureDisk()
}