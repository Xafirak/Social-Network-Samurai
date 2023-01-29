// @ts-nocheck


const ADD_DIALOG = "ADD-DIALOG";
const UPDATE_DIALOG_TEXT = "UPDATE-DIALOG-TEXT";
export const addDialogCreator = () => ({ type: ADD_DIALOG });
export const updateDialogText = (text) => ({
    type: UPDATE_DIALOG_TEXT,
    newText: text,
});

let initialState = {
    newDialogText: "",
    messagesData: [
        { id: 1, message: "Sup bro" },
        { id: 2, message: "Howdy partner =)" },
        { id: 3, message: "Hehe we gucci" },
        { id: 4, message: "One hundred billion dollars!" },
        { id: 5, message: "Raawwr!" },
        { id: 6, message: "Did I support right?" },
    ],
    usersData: [
        {
            id: 1,
            name: "GigaChad",
            avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F64%2Ff5%2F01%2F64f501db467c44445285591ab8ca8512.jpg&f=1&nofb=1&ipt=acea1ecb526b5f9a889236e64219e655f7a704576ffb99c225b3a786ccf9374f&ipo=images",
        },
        {
            id: 2,
            name: "Merilin",
            avatar: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.caracteres.mx%2Fwp-content%2Fuploads%2F2014%2F06%2F03%2F93739%2Felle-10-marilyn-monroe-xln.jpg&f=1&nofb=1&ipt=74f02b41466c514ab86dbfd29d053abe61896356db61557bbc81889bd207a564&ipo=images",
        },
        {
            id: 3,
            name: "Cat",
            avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F789741942200941403%2F73233B8C431FCB5C86FF5F1A3E708E62355E6C5B%2F%3Fimw%3D637%26imh%3D358%26ima%3Dfit%26impolicy%3DLetterbox%26imcolor%3D%2523000000%26letterbox%3Dtrue&f=1&nofb=1&ipt=9bd66ea8a3ce27436f2233755b6f342b8888d2ceb8b9ea3b79176fabc1ae7422&ipo=images",
        },
        {
            id: 4,
            name: "Dr. Evil",
            avatar: "https://t-fs-swush-com.s3.amazonaws.com/users_holdet/d/dr_evil_minime/huge.jpg",
        },
        {
            id: 5,
            name: "Rex",
            avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Flogopedia%2Fimages%2F9%2F96%2FJurassic_Park_logo.jpg%2Frevision%2Flatest%3Fcb%3D20170612175227&f=1&nofb=1&ipt=317457a4c2030a222014860ad3a259682677aa3b1425b54102c1b759fc37957b&ipo=images",
        },
        {
            id: 6,
            name: "Pyke",
            avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.polscygracze.pl%2Fuploads%2F2018%2F05%2Fpyke_the_bloodharbor_ripper_yt_thumbnail_phase_1_base_180504_final-1024x576.jpg&f=1&nofb=1&ipt=30cc48af65466efb071fff116b6e5dcb8f675924e26056e8c6443c1170974742&ipo=images",
        },
    ],
}
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD-DIALOG": {
            let newDialog = {
                id: state.messagesData.length + 1,
                message: state.newDialogText,
            };
            let stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.messagesData.push(newDialog);
            stateCopy.newDialogText = "";
            return stateCopy;
        }
        case "UPDATE-DIALOG-TEXT": {
            let stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.newDialogText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
};

export default dialogsReducer;