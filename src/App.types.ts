import { Firestore } from "firebase/firestore"
import { Photos } from "./types/car"

interface AppProps {
    db: Firestore
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

export type { AppProps, Segment, Brand, Model, Version, Loading }