import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';
import Lobby from './components/Lobby';
import Topbar from './components/static/Topbar';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import Board from './components/Board';
import Error from './components/static/Error';

test('renders the App component', () => {
  const { app } = render(<App />);;
  expect({app}).toExist
});

test('renders the Lobby component', () => {
  const { lobby } = render(<Lobby />);;
  expect({lobby}).toExist
});

test('renders the Topbar component', () => {
  const { topbar } = render(<Topbar />);;
  expect({topbar}).toExist
});

test('renders the CreateGame component', () => {
  const { createGame } = render(<CreateGame />);;
  expect({createGame}).toExist
});

test('renders the JoinGame component', () => {
  const { joinGame } = render(<JoinGame />);;
  expect({joinGame}).toExist
});

test('renders the Board component', () => {
  const { board } = render(<Board />);;
  expect({board}).toExist
});

test('renders the Error component', () => {
  const { error } = render(<Error />);;
  expect({error}).toExist
});