import React from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
  {
    'id': 1,
    'image' : 'https://placeimg.com/64/64/1',
    'name': '전용석',
    'birthday' : '951211',
    'gender':'남자',
    'job': '엔지니어'
  },
  {
    'id': 2,
    'image' : 'https://placeimg.com/64/64/2',
    'name': '유메농',
    'birthday' : '950328',
    'gender':'여자',
    'job': '학생'
  },
  {
    'id': 3,
    'image' : 'https://placeimg.com/64/64/3',
    'name': '코지마',
    'birthday' : '950222',
    'gender':'여자',
    'job': '백수'
  }

]

function App() {
  return (
    <div>
      <p>Component</p>
      {
        customers.map( 
          (text, index)=>
              <Customer key={text.id} customers={text}></Customer>            
        )
      }
    </div>
  );
}

export default App;
