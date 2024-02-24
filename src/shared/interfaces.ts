export interface IUser {
    _id:string
    name: string
    email: string
    password:string
    active: string
    priority:string
    lastLogin: string
}

export interface IProject {
    _id:string
    mainType: string
    subType: string
    customType:string
    title: string
    description:string
    funding: number
    startDate:string
    endDate:string
    reward:string
    location:string
    collaborators:string
    story:string
    minimumValue:number
    active:string
    images:Array<string>
    videos:Array<string>
}

export interface ISubmission {
value: ISubmission
    _id:string
    firstName:string
    lastName:string
    email:string
    country:string
    description: string
    createdAt:string
}