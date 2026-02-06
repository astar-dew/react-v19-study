import { faker } from '@faker-js/faker'

export type Person = {
  checkbox: boolean
  firstName: string
  lastName: string | undefined
  age: number
  visits: number | undefined
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  rank: number
  createdAt: Date
  subRows?: Person[]
}


export type QuizList = {
    id: number,
    created: string,
    name: string,
    email: string,
    company: string
}


const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    checkbox: false,
    firstName: faker.person.firstName(),
    lastName: Math.random() < 0.1 ? undefined : faker.person.lastName(),
    age: faker.number.int(40),
    visits: Math.random() < 0.1 ? undefined : faker.number.int(1000),
    progress: faker.number.int(100),
    createdAt: faker.date.anytime(),
    status : 'single',
    // status: faker.helpers.shuffle([
    //   'relationship',
    //   'complicated',
    //   'single',
    // ])[0]! as Person['status'],
    rank: faker.number.int(100),
  }
}



export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((_d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }
  return makeDataLevel()
}


// claud 참고
export function makeDatafrom<T>(
  factory: () => T,
  ...lens: number[]
): T[] {
  const makeDataLevel = (depth = 0): T[] => {
    const len = lens[depth]!
    return range(len).map((_d): T => {
      const item = factory()
      
      // subRows가 있는 경우에만 추가
      if (lens[depth + 1]) {
        return {
          ...item,
          subRows: makeDataLevel(depth + 1),
        }
      }
      
      return item
    })
  }
  
  return makeDataLevel()
}

// export function makeData<T>( factory:()=>void  ,...lens: number[]) {
//   const makeDataLevel = (depth = 0): T[] => {
//     const len = lens[depth]!
//     return range(len).map((_d): T => {
//       return {
//         ...factory(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       }
//     })
//   }
//   return makeDataLevel()
// }