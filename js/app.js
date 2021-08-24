const rodOne = []
const rodTwo = []
const rodThree = []

let numberOfDisks = 0

//create class to easily generate disks that are trackeable and manageable
class Disk {
    constructor(priorNumberOfDisks) {
        //establish some keys with default values that will need to be changed by functions and relationships with outside variables (number of disks)
        this.rank = 0;
        //create a width key that can be used as a reference for the visual width
        this.width =  0;
    }
    //set the rank according to the number of discs
    setRank (diskRank) {
        this.rank = diskRank
    }
    //set the width according to the ranking among disks
    setWidth (diskRank) {
        this.width = TEMPORARY
    }
    diskInitialization () {
        numberOfDisks += 1
        this.setRank(numberOfDisks)
        this.setWidth(numberOfDisks)
    }


    //add the disk to the page as an element
    conjureDisk () {
        let thisDisk = document.createElement(`div`)
        thisDisk.setAttribute(`class`, `disk`)
        thisDisk.setAttribute(`id`, `disk${this.rank}`)
        thisDisk.style.width = TEMPORARY
        thisDisk.style.height = TEMPORARY
        thisDisk.style.left = TEMPORARY
        thisDisk.style.bottom = TEMPORARY
    }
}

//temporary object for testing
let testDiskElement = document.createElement(`div`)
testDiskElement.setAttribute(`class`, `disk`)
testDiskElement.style.width = `90%`
testDiskElement.style.height = `10%`
testDiskElement.style.left = `5%`
testDiskElement.style.bottom = `0`
testDiskElement.style.backgroundColor = `crimson`
testDiskElement.style.position = `absolute`
testDiskElement.style.zIndex = `9`
document.querySelector(`#rod1-container`).appendChild(testDiskElement)

