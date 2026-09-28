import { initialize } from "next/dist/server/lib/render-server"
import { act } from "react"

export class Activity {
    actName: string
    description: string
    assignedReporter: Reporter | undefined
    canBeAssigned: boolean 
    canBeRemoved: boolean 
    canBePromoted: boolean

    constructor(actName: string, description: string){
        this.actName = actName
        this.description = description
        this.canBeAssigned = true
        this.canBeRemoved = true
        this.canBePromoted = true
    }

}
export class Reporter {
    name: string
    assignedActivity: Activity | undefined
    canBeAssigned: boolean
    canBeRemoved: boolean

    constructor(name: string){
        this.name = name
        this.canBeAssigned = true
        this.canBeRemoved = true
    }
}


export class Model {
    reporters: Array<Reporter> 
    activities: Array<Activity>

    // empty lists at first
    constructor(){
        this.activities = []
        this.reporters = []
    }

    // add reporter use case
    addReporter(reporter: Reporter): Array<Reporter>{
        // only add if name provided
        if (!reporter.name){
           throw new Error("Reporter name must be provided to add an activity!") 
        }
        // only add if doesn't exist already
        if (this.reporters.some(r => r.name === reporter.name)){
            throw new Error("This reporter already exists")
        }
        this.reporters.push(reporter)

        return this.reporters
    }

    // remove reporter use case
    removeReporter(reporter: Reporter): Array<Reporter>{
        // shouldn't reach this block
        if (!reporter.canBeRemoved){
            throw new Error ("This reporter cannot be removed!")
        }
        // makes new array without reporter
        this.reporters = this.reporters.filter(r=>r.name !== reporter.name)
        return this.reporters
    }

    // add activity use case
    addActivity(activity: Activity): Array<Activity>{
        // only add if name AND description provided
        if (!activity.actName || !activity.description){
           throw new Error("Activity name and description must be provided to add an activity!") 
        }
        // only add if doesnt already exist
        if (this.activities.some(a => a.actName === activity.actName)){
           throw new Error("This activity already exists") 
        }
        // only add if name AND description provided
        this.activities.push(activity)
        return this.activities
    }

    // promote activity use case
    promoteActivity(activity: Activity): Array<Activity>{
        // shouldn't reach this block
        if (!activity.canBePromoted){
            throw new Error("This activity cannot be promoted!")
        }
        // finds activity to promote
        const toPromote = this.activities.find(a => a.actName == activity.actName)
        // creates new array without activity to promote
        const otherActivities = this.activities.filter(a => a.actName !== activity.actName)

        // guard for null
        // adds activity to front of array
        if (toPromote){
            otherActivities.unshift(toPromote)
        }

        this.activities = otherActivities
    
        return this.activities
    }

    // remove activity use case
    removeActivity(activity: Activity): Array<Activity>{
        // shouldn't reach this block
        if (!activity.canBeRemoved){
            throw new Error ("This activity cannot be removed!")
        }
        // creates new array without activity
        this.activities = this.activities.filter(a=>a.actName !== activity.actName)
        return this.activities
    }

    // assign reporter use case
    assignReporter(activity: Activity, reporter: Reporter): void{
        // shouldn't reach these blocks
        if (!activity.canBeAssigned){
            throw new Error ("This activity cannot be assigned to!")
        }
        if (!reporter.canBeAssigned){
            throw new Error ("This reporter cannot be assigned!")
        }

        // keeps track of assignments, to be used during rendering in lists of reporters/activities
        activity.assignedReporter = reporter
        reporter.assignedActivity = activity

        // useful states during renderng
        activity.canBeAssigned = false
        reporter.canBeAssigned = false
        activity.canBeRemoved = false
        reporter.canBeRemoved = false
    }

    // getter for available activities for when editor wants to assign an activity to a reporter
    // used during rendering
    getAvailableActivities(){
        // creates new array where activity is available (can be assigned)
        const available = this.activities.filter(a=>a.canBeAssigned)
        return available
    }
}

