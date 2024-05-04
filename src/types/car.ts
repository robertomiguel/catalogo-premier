export interface Photos {
url: string
}

export interface Car {
  [key: string]: any
  photos: Photos[]
}