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

interface Answer {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct: number;
}

interface Quiz {
  quizid: number;
  title: string;
  answer: Answer;
}

interface QuizPack {
  id: string;
  created: string;
  name: string;
  email: string;
  company: string;
  quiz: Quiz[];  // ← 빈 객체 불가능하도록 명시
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

    const mockQuizList: QuizPack[] = [
        {id: '1', created: 'jin1', name: '구구단', email:'1@sweatch.ai', company: 'com1', quiz: [
            { quizid: 1, title : '1 x 2 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:2}}, 
            { quizid: 2, title : '1 x 3 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:3}},
            { quizid: 3, title : '1 x 4 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:4}}
        ]},
        {id: '2', created: 'chaechae', name: '영화보고 제목 맞추기', email:'2@sweatch.ai', company: 'com2', quiz: [
            { quizid: 1, title : '1 x 2 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:2}}
        ]},
        {id: '3', created: 'henry', name: '토익 단어집', email:'3@sweatch.ai', company: 'com3', quiz: [
            { quizid: 1, title : '1 x 2 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:2}}
        ]},
        {id: '4', created: 'david',name: '나루토 명언집', email:'4@sweatch.ai', company: 'com4', quiz: [
            { quizid: 1, title : '1 x 2 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:2}}]},
        ]

    //  const mockQuizList = [
    //     {packid: '1', name: '구구단', 
    //         quiz: [{ title : '1 x 2 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4' , correct:2}}, 
    //                 { title : '1 x 3 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:3}},
    //                 { title : '1 x 4 = ?', answer : {answer1 : '1', answer2 :'2' , answer3 : '3', answer4 : '4', correct:4}}
    //     ]},
    //  ]

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