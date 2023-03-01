type userType = {
    firstName: string
    lastName: string
    age: number
}

type photoType = {
    large: string
    small: string
}

type serverResponseType<D> = {
    errorCode: number
    message: Array<string>
    data: D
}

const response1: serverResponseType<userType> = {
    errorCode: 1,
    message: ['fuck', 'TS'],
    data: {
        firstName: ' Baba',
        lastName: 'is You',
        age: 2019
    }
}

const response2: serverResponseType<photoType> = {
    errorCode: 1,
    message: ['fuck', 'TS'],
    data: {
        small: '',
        large: '',
    }
}

type Nullable<T> = null | T

const initial = {
    age: 10,
    name: 'Stix',
    user: null as Nullable<userType>,
    photo: null as Nullable<photoType>,
}

type stateType = typeof initial

const reducer = (state: stateType = initial, action: currentActionTypes) => {
    switch (action.type) {
        case "SET_AGE":
            return { ...state, age: action.age }
        case "SET_NAMES":
            return { ...state, name: action.firstName + '' + action.lastName }
    }


    return state
}

// type myReturnType<T> = T extends (...args: any[]) => infer R ? R : never

const obj = {
    a: { name: 'dima' },
    b: { age: 33 },
    c: { site: { title: ' youtube' } },
}


// type someType = typeof obj.a | typeof obj.b | typeof obj.c
type propsType<T> = T extends { [key: string]: infer U } ? U : never;

let Rock: ReturnType<propsType<typeof actions>> = { type: "SET_AGE", age: 12 }

const actions = {
    AC1: (age: number) => ({ type: 'SET_AGE', age } as const),
    AC2: (firstName: string, lastName: string) => ({ type: "SET_NAMES", firstName, lastName } as const)

}


type currentActionTypes = getActionsTypeZ<typeof actions>

type getActionsTypeZ<X
    extends { [key: string]: (...args: any[]) => any }>
    = ReturnType<propsType<X>>

// можно не создавать типы а сразу передават их куда надо
// type AC1Type = ReturnType<typeof AC1>
// type AC2Type = ReturnType<typeof AC2>

// const action: AC1Type = { type: 'SET_AGE', age: 12 }

type Rock<T> = T extends 'user' ? userType :
    T extends 'photo' ? photoType : number

let a: Rock<'user' | 'photo'> = {
    firstName: ' Baba',
    lastName: 'is You',
    age: 2019
}
a = {
    small: '',
    large: '',

}
let b: Rock<'photo'> = {
    small: '',
    large: '',
}