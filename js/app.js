const rodOne = []
const rodTwo = []
const rodThree = []

let numberOfDisks = 3
let diskObjects = 0

//create class to easily generate disks that are trackeable and manageable
class Disk {
    constructor() {
        //establish some keys with default values that will need to be changed by functions and relationships with outside variables (number of disks)
        this.rank = 0;
        //create a width key that can be used as a reference for the visual width
        this.width =  0;
        this.rod = `One`
    }
    //set the rank according to the number of discs
    setRank () {
        //by subtracting disks on page (which is equal to current disk number) from number of disks, we get distance from the top. Add one to make the top rank equal to 1, instead of 0
        this.rank = numberOfDisks - diskObjects + 1
    }
    //set the width according to the ranking among disks
    setWidth () {
        //
        this.width = ((this.rank / numberOfDisks) * 90)
    }
    //one functione that initializes the disk and registers it with the known disk objects
    diskInitialization () {
        diskObjects += 1
        this.setRank()
        this.setWidth()
    }
    //add the disk to the page as an element, in propoer starting position
    conjureDisk () {
        let thisDisk = document.createElement(`div`)
        thisDisk.setAttribute(`class`, `disk`)
        thisDisk.setAttribute(`id`, `disk${this.rank}`)
        thisDisk.style.width = `${this.width}%`
        if (numberOfDisks < 10) {
            thisDisk.style.height = `10%`
        }
        else {
            thisDisk.style.height = `${90 / numberOfDisks}%`
        }
        thisDisk.style.left = `${(100 - this.width) / 2}%`
        rodOne.push(this)
    }
}

//temporary object for testing
let testDiskElement = document.createElement(`div`)
testDiskElement.setAttribute(`class`, `disk`)
testDiskElement.style.width = `90%`
testDiskElement.style.height = `10%`
// testDiskElement.style.left = `4.5%`
// testDiskElement.style.bottom = `0`
// testDiskElement.style.backgroundColor = `crimson`
// testDiskElement.style.position = `absolute`
// testDiskElement.style.zIndex = `9`
document.querySelector(`#disk-container-1`).appendChild(testDiskElement)

