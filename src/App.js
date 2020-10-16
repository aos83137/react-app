import React from 'react';
import './App.css';
import Hello from './Hello';
import Profile  from './Profile';
import ListEx from './ListEx';

function App() {
  const taro = {
    name:'Taro',
    age:'26',
    love:'yume',
  };

  const yume = {
    name:'Yume',
    age:'26',
    love:'yong',
  };
  const listData = ['foo','bar','baz'];
  return (
    <div>
      <p>Component</p>
      <ListEx data={listData}></ListEx>
      <Hello name='Taro'></Hello>
      <Profile data={taro}></Profile>
      <Profile data={yume}></Profile>
    </div>
  );
}

export default App;
