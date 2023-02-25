
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
type profilePageType ={
    newPostText: String
    postData:[{
        id: Number,
        message: String,
        likes: number
    }]
}
/// мат, только мат и ничего кроме мата...

// type dialogPageType ={
//     newDialogText: String
//     messagesData:[{
//         id: Number
//         message:string

//     }]
//     usersData: [{
//         id:number
//         name: string
//         avatar: string
//     }]
// }
// type sidebar = {
//     friends: [{
//         id:number
//         name:string
//         avatar: string

//     }]
// }

// type storeType ={
//    _state:  {
//     profilePageType: any
//     dialogPageType: any
//     sidebar: { friends: { id: number; name: string; avatar: string; }[]; } | undefined
//    }
// }
// let store: storeType = {
//     _state: {
//         profilePage :   {
//             newPostText: "KAWABANGA!",

//             postData: [
//                 { id: 1, message: "HOWDY partner!", likes: 2 },
//                 { id: 2, message: "It's my first post", likes: 7 },
//                 { id: 3, message: "Hahahhaha", likes: 1 },
//                 { id: 4, message: "l2p nub", likes: 420 },
//             ],
//         },

//         dialogPage: {
//             newDialogText: "",
//             messagesData: [
//                 { id: 1, message: "Sup bro" },
//                 { id: 2, message: "Howdy partner =)" },
//                 { id: 3, message: "Hehe we gucci" },
//                 { id: 4, message: "One hundred billion dollars!" },
//                 { id: 5, message: "Raawwr!" },
//                 { id: 6, message: "Did I support right?" },
//             ],
//             usersData: [
//                 {
//                     id: 1,
//                     name: "GigaChad",
//                     avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F64%2Ff5%2F01%2F64f501db467c44445285591ab8ca8512.jpg&f=1&nofb=1&ipt=acea1ecb526b5f9a889236e64219e655f7a704576ffb99c225b3a786ccf9374f&ipo=images",
//                 },
//                 {
//                     id: 2,
//                     name: "Merilin",
//                     avatar: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.caracteres.mx%2Fwp-content%2Fuploads%2F2014%2F06%2F03%2F93739%2Felle-10-marilyn-monroe-xln.jpg&f=1&nofb=1&ipt=74f02b41466c514ab86dbfd29d053abe61896356db61557bbc81889bd207a564&ipo=images",
//                 },
//                 {
//                     id: 3,
//                     name: "Cat",
//                     avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F789741942200941403%2F73233B8C431FCB5C86FF5F1A3E708E62355E6C5B%2F%3Fimw%3D637%26imh%3D358%26ima%3Dfit%26impolicy%3DLetterbox%26imcolor%3D%2523000000%26letterbox%3Dtrue&f=1&nofb=1&ipt=9bd66ea8a3ce27436f2233755b6f342b8888d2ceb8b9ea3b79176fabc1ae7422&ipo=images",
//                 },
//                 {
//                     id: 4,
//                     name: "Dr. Evil",
//                     avatar: "https://t-fs-swush-com.s3.amazonaws.com/users_holdet/d/dr_evil_minime/huge.jpg",
//                 },
//                 {
//                     id: 5,
//                     name: "Rex",
//                     avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Flogopedia%2Fimages%2F9%2F96%2FJurassic_Park_logo.jpg%2Frevision%2Flatest%3Fcb%3D20170612175227&f=1&nofb=1&ipt=317457a4c2030a222014860ad3a259682677aa3b1425b54102c1b759fc37957b&ipo=images",
//                 },
//                 {
//                     id: 6,
//                     name: "Pyke",
//                     avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.polscygracze.pl%2Fuploads%2F2018%2F05%2Fpyke_the_bloodharbor_ripper_yt_thumbnail_phase_1_base_180504_final-1024x576.jpg&f=1&nofb=1&ipt=30cc48af65466efb071fff116b6e5dcb8f675924e26056e8c6443c1170974742&ipo=images",
//                 },
//             ],
//         },

//         sidebar: {
//             friends: [
//                 {
//                     id: 1,
//                     name: "Frodo",
//                     avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fobservatoriodocinema.uol.com.br%2Fwp-content%2Fuploads%2F2021%2F02%2FFrodo-Undying-Lands.png&f=1&nofb=1&ipt=e4d0f09286406da290974db11f212096cf6e89a4dfaef1f70b83f54320a76b93&ipo=images",
//                 },
//                 {
//                     id: 2,
//                     name: "Iron Arnie",
//                     avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theplace2.ru%2Farchive%2Farnold_schwarzenegger%2Fimg%2F007-16.jpg&f=1&nofb=1&ipt=fd0428ab3c5120f744816d9b9dae6742c228c6db8756eda706a61e9bfed5619b&ipo=images",
//                 },
//                 {
//                     id: 3,
//                     name: "Totoro",
//                     avatar: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8935f23e-e9ee-4184-8a71-6012451f47f1/d9219ws-60e7e82d-b34d-4c57-94ce-35b2f34a19a2.jpg/v1/fill/w_1024,h_1365,q_75,strp/totoro_by_amandam55-d9219ws.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi84OTM1ZjIzZS1lOWVlLTQxODQtOGE3MS02MDEyNDUxZjQ3ZjEvZDkyMTl3cy02MGU3ZTgyZC1iMzRkLTRjNTctOTRjZS0zNWIyZjM0YTE5YTIuanBnIiwid2lkdGgiOiI8PTEwMjQiLCJoZWlnaHQiOiI8PTEzNjUifV1dfQ.KvUBw5Xx7UpZy0Bsi3HoEyZvKPAVfWKTrMGB1TkK3h0",
//                 },
//             ],
//         },
//         messageHistory: {
//             Gigachad: [{ id: 1 }],
//         },
//     },
//     _callSub() {
//         console.log("State is changed");
//     },
//     getState() {
//         return this._state;
//     },

//     subscribe(observer: any) {
//         this._callSub = observer;
//     },

//     dispatch(action: any) {
//         this._state.profilePage = profileReducer(
//             this._state.profilePage,
//             action
//         );
//         this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action);
//         this._callSub(this._state);
//     },
// };

// export default store;
// let window.store = store;
