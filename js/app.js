const rodOne = []
let numberOfDisks = 0

//create class to easily generate disks that are trackeable and manageable
class Disk {
    constructor(priorNumberOfDisks) {
        this.diskNumber = priorNumberOfDisks + 1;
        //create a width key that can be used as a reference for the visual width
        //Needs to adapt to both total number of disks and its rank among them.  I couldnt think of a fluid way to do that, so i decided to create a function that refreshes the value which will default to 0
        this.width =  0;
    }
    refreshwidth () {}
}

//CREATE A BASE OBJECT TO FIGURE out how the class should be. wasting too much time with early onset optimization or whatever
// const testDisk = {
//     diskNumber: 1,
//     width = 
// }

//i guess step one would be jsut create the htmlk elememt first
let testDiskElement = document.createElement(`div`)
testDiskElement.setAttribute(`class`, `disk`)
document.querySelector(`#rod1-container`).appendChild(testDiskElement)