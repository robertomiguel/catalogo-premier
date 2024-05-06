import { Firestore } from "firebase/firestore"
import { Photos } from "./types/car"

interface IAppContext {
    db: Firestore | undefined
    isAdmin?: boolean
}

interface YupLocaleConfig {
    mixed: {
        default: string,
        required: string,
    },
    number: {
        min: string,
        max: string,
    },
    string: {
        min: string,
        max: string,
        email: string,
    },
    
}
  
interface Segment {
    id: string
    label: string
}
  
interface Brand {
    id: string
    label: string
    segment: string
}
  
interface Model {
    id: string
    label: string
    brand: string
    segment: string
}
  
interface Version {
    id: string
    label: string
    model: string
    brand: string
    segment: string
    index: number
    photos: Photos[]
}
  
interface Loading {
    segment: boolean
    brand: boolean
    model: boolean
    version: boolean
}

export type { IAppContext, Segment, Brand, Model, Version, Loading, YupLocaleConfig }