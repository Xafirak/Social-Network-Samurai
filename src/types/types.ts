export type postDataType = {
    id: number
    message: string
    likes: number
}
export type profileType = {
    data(data: any): any
    userId: number
    lookingForAJob: string
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
    aboutMe: string
}

export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}

export type userType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}


// ДЗ типизация компонентов, попробовать сделать