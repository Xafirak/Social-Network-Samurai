
import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import { postDataType, profileType } from '../../types/types';


type propsType = {
    status: string | undefined
    profile: profileType | undefined
    isOwner: boolean
    isEditProfileWasSuccesfull: boolean
    error: Array<string> | boolean
    postData: Array<postDataType>
    savePhoto: (photos: File) => void
    addMessage: (messageBody: string) => void
    saveProfile: (profile: profileType) => void
    updateStatus: (status: string) => void
}

const Profile: React.FC<propsType> = (props) => {

    // установка условия для рендеринга страницы для избежания ненужных ререндеров
    //при обновлении страницы F5, компонент рендерится 1 раз, но если перейти на
    // другую страницу и вернутся обратно - компонент ререндерится 3 раза - почему?

    // Установка прелоадера в ProfileFUNC не помогла, т.к. он ререндерится всего 3 раза 
    // и если за 3 ререндера условие не выполняется, показывается вечная крутилка
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                error={props.error}
                isEditProfileWasSuccesfull={props.isEditProfileWasSuccesfull}
                savePhoto={props.savePhoto}
                updateStatus={props.updateStatus}
                saveProfile={props.saveProfile}
            />
            <MyPosts
                postData={props.postData}
                addMessage={props.addMessage}
            />
        </div>
    );
};

export default Profile;
