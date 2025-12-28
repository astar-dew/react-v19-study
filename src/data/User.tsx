import { useState } from 'react';
// import Chance from 'chance';

// const chance = new Chance();

type UserProps = {
    id: string,
    name: string,
    email: string,
    age: number,
    phone: string,
    address: string,
    birthday : string | Date,
}

type UsersProps = {
    id: string,
    name: string,
    email: string,
    company: string,
    salary: number,
}

export default function ChanceUser(){

    // const [dummyList, setDummyList] = useState([] as UsersProps[]);

    //1. 랜덤 사용자 데이터 생성
    const mockUser = {
        id: 'testUser',
        name: 'tester',
        email: 'tester@sweatch.ai'
    }


    const mockUserList = [
        {id: '1', userId:'jin1',pass: '1q2w3e4r!', name: 'tester1', email:'1@sweatch.ai', company: 'com1',authority:''},
        {id: '2', userId:'jin2',pass: '1q2w3e4r!', name: 'tester2', email:'2@sweatch.ai', company: 'com2',authority:''},
        {id: '3', userId:'jin3',pass: '1q2w3e4r!', name: 'tester3', email:'3@sweatch.ai', company: 'com3',authority:''},
        {id: '4', userId:'jin4',pass: '1q2w3e4r!', name: 'tester4', email:'4@sweatch.ai', company: 'com4',authority:''},
        {id: '5', userId:'jin5',pass: '1q2w3e4r!', name: 'tester4', email:'4@sweatch.ai', company: 'com4',authority:''},

    ]

     const mockQuizList = [
        {id: '1', created: 'jin1', name: '구구단', email:'1@sweatch.ai', company: 'com1'},
        {id: '2', created: 'chaechae', name: '영화보고 제목 맞추기', email:'2@sweatch.ai', company: 'com2'},
        {id: '3', created: 'henry', name: '토익 단어집', email:'3@sweatch.ai', company: 'com3'},
        {id: '4', created: 'david',name: '나루토 명언집', email:'4@sweatch.ai', company: 'com4'},
    ]

    // const generateUser = () => {
    //     const user:UserProps = {
    //         id: chance.guid(),
    //         name: chance.name(),
    //         email: chance.email(),
    //         age: chance.age(),
    //         phone: chance.phone(),
    //         address: chance.address(),
    //         birthday: chance.birthday({ string: true}),
    //     };
    //     return user;
    // }

    // // 2. 더미 데이터 리스트 생성
    // const generateUsers = () => {
    //     const userlist:UsersProps[] = Array.from({ length:10 }, () => ({
    //         id: chance.guid(),
    //         name: chance.name(),
    //         email: chance.email(),
    //         company: chance.company(),
    //         salary: chance.integer({min:3000, max: 150000}),

    //     }));
    //     return userlist;
    // }
    
    return {
        // generateUser,generateUsers,
        mockUser,mockUserList,mockQuizList
    }
}