import { initialize } from "next/dist/server/lib/render-server"

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

    // empty at first
    constructor(){
        this.activities = []
        this.reporters = []
    }

    // is this even necessary if we are adding through use cases later?
    // initialize(reporters: Array<Reporter>, activities:Array<Activity>){
    //     this.activities = activities
    //     this.reporters = reporters
    // }


    // do i need return values? idk if ill use them
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


    removeReporter(reporter: Reporter): Array<Reporter>{
        return this.reporters

    }


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

    promoteActivity(activity: Activity): Array<Activity>{
        return this.activities
    }

    removeActivity(activity: Activity): Array<Activity>{
        return this.activities
    }

    assignReporter(activity: Activity, reporter: Reporter): void{

    }

    // getAvailableReporters(){
    // }

    // getAvailableActivities(){

    // }





}

