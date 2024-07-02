
// this is a class to map the details of the Time Entries of a Employee to be displayed as a list to the Employee 
export class TimeEntryDetail {

        TimeEntryId : number
        ProjectName: string
        ActivityName: string
        TimeSpend: number
        ProjectId:number
        ActivityId:number
        Description:string

        // these are the Properties which belong to the List instace of the Employee
        constructor(TimeEntryId: number, ProjectName: string, ActivityName: string, TimeSpend: number,ProjectId:number,ActivityId:number,Description:string) {
                this.TimeEntryId = TimeEntryId;
                this.ProjectName = ProjectName;
                this.ActivityName = ActivityName;
                this.TimeSpend = TimeSpend;
                this.ProjectId=ProjectId;
                this.ActivityId=ActivityId;
                this.Description=Description;
              }
}
