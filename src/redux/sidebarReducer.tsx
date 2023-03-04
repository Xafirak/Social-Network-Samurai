import { baseThunkType, InferActionsTypes } from "./reduxStore"

type friendsType = {
    id: Number
    name: string
    avatar: string
}
type initialStateType = typeof initialState
type sidebarActionsType = InferActionsTypes<typeof sidebarActions>
type ThunkAction = baseThunkType<sidebarActionsType>


let initialState = {
    friends: [
        {
            id: 1,
            name: "Frodo",
            avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fobservatoriodocinema.uol.com.br%2Fwp-content%2Fuploads%2F2021%2F02%2FFrodo-Undying-Lands.png&f=1&nofb=1&ipt=e4d0f09286406da290974db11f212096cf6e89a4dfaef1f70b83f54320a76b93&ipo=images",
        },
        {
            id: 2,
            name: "Iron Arnie",
            avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theplace2.ru%2Farchive%2Farnold_schwarzenegger%2Fimg%2F007-16.jpg&f=1&nofb=1&ipt=fd0428ab3c5120f744816d9b9dae6742c228c6db8756eda706a61e9bfed5619b&ipo=images",
        },
        {
            id: 3,
            name: "Totoro",
            avatar: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8935f23e-e9ee-4184-8a71-6012451f47f1/d9219ws-60e7e82d-b34d-4c57-94ce-35b2f34a19a2.jpg/v1/fill/w_1024,h_1365,q_75,strp/totoro_by_amandam55-d9219ws.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi84OTM1ZjIzZS1lOWVlLTQxODQtOGE3MS02MDEyNDUxZjQ3ZjEvZDkyMTl3cy02MGU3ZTgyZC1iMzRkLTRjNTctOTRjZS0zNWIyZjM0YTE5YTIuanBnIiwid2lkdGgiOiI8PTEwMjQiLCJoZWlnaHQiOiI8PTEzNjUifV1dfQ.KvUBw5Xx7UpZy0Bsi3HoEyZvKPAVfWKTrMGB1TkK3h0",
        },
    ] as Array<friendsType>,
}

const sidebarActions = {
    action: () => ({type:'NOTHING HERE'})
}

const sidebarReducer = (state = initialState, action: sidebarActionsType): initialStateType => {

    return state;
}

export default sidebarReducer;