import { Component, OnInit } from '@angular/core';
import Utils from './../shared/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  player1Name = 'player1';
  player2Name = 'player2';
  player1 = {'name': this.player1Name, 'active': true, 'symbol': 'circle', 'boxes': []};
  player2 = {'name': this.player2Name, 'active': false, 'symbol': 'cross', 'boxes': []}
  currentPlayer = null;
  gameOver = false;

  boardSquaresStatus = {
    'row1': {
      'r1c1': {'blank': true, 'cross': false, 'circle': false, 'player': null},
      'r1c2': {'blank': true, 'cross': false, 'circle': false, 'player': null},
      'r1c3': {'blank': true, 'cross': false, 'circle': false, 'player': null}},
    'row2': {
      'r2c1': {'blank': true, 'cross': false, 'circle': false, 'player': null},
      'r2c2': {'blank': true, 'cross': false, 'circle': false, 'player': null},
      'r2c3': {'blank': true, 'cross': false, 'circle': false, 'player': null}},
    'row3': {
      'r3c1': {'blank': true, 'cross': false, 'circle': false, 'player': null},
      'r3c2': {'blank': true, 'cross': false, 'circle': false, 'player': null},
      'r3c3': {'blank': true, 'cross': false, 'circle': false, 'player': null}}
  };

  boardRows = Object.keys(this.boardSquaresStatus);
  boardComponents = Utils.componentFormat(this.boardSquaresStatus);

  winingCombos = {
    'row1': ['r1c1', 'r1c2', 'r1c3'],
    'row2': ['r2c1', 'r2c2', 'r2c3'],
    'row3': ['r3c1', 'r3c2', 'r3c3'],
    'col1': ['r1c1', 'r2c1', 'r3c1'],
    'col2': ['r1c2', 'r2c2', 'r3c2'],
    'col3': ['r1c3', 'r2c3', 'r3c3'],
    'diag1': ['r1c1', 'r2c2', 'r3c3'],
    'diag2': ['r1c3', 'r2c2', 'r3c1'],
  }

  winingCombosKeys = Object.keys(this.winingCombos)

  boxClicked(event) {
    const row = event.currentTarget.parentElement.id;
    const box = event.currentTarget.id;
    if (!this.gameOver) {
      if (this.boardSquaresStatus[row][box].player === null) {
        if (this.player1.active) {
          this.currentPlayer = this.player1;
        } else {
          this.currentPlayer = this.player2;
        }
        this.player1.active = !this.player1.active;
        this.player2.active = !this.player1.active;
        this.boardSquaresStatus[row][box].player = this.currentPlayer.name;
        this.boardSquaresStatus[row][box].blank = false;
        this.boardSquaresStatus[row][box][this.currentPlayer.symbol] = true;
        this.currentPlayer.boxes.push(box);
        this.checkWinner();
      } else {
        alert('This square is already played');
      }
    }else {
      alert('Game is over you lost');
    }
  }

  checkWinner() {
    for (let i = 0; i < this.winingCombosKeys.length; i++) {
      const key = this.winingCombosKeys[i];
      const checkArray = this.winingCombos[key];
      let didWin = 0;
      for (let ii = 0; ii < this.currentPlayer.boxes.length; ii++) {
        if (checkArray.indexOf(this.currentPlayer.boxes[ii]) > -1) {}
        didWin += 1;
      }
      if (didWin === 3) {
        this.gameOver = true;
        alert(this.currentPlayer.name + '  WINS!');
        break;
      }
    }
  }

  resetGame() {
    this.boardSquaresStatus = {
      'row1': {
        'r1c1': {'blank': true, 'cross': false, 'circle': false, 'player': null},
        'r1c2': {'blank': true, 'cross': false, 'circle': false, 'player': null},
        'r1c3': {'blank': true, 'cross': false, 'circle': false, 'player': null}},
      'row2': {
        'r2c1': {'blank': true, 'cross': false, 'circle': false, 'player': null},
        'r2c2': {'blank': true, 'cross': false, 'circle': false, 'player': null},
        'r2c3': {'blank': true, 'cross': false, 'circle': false, 'player': null}},
      'row3': {
        'r3c1': {'blank': true, 'cross': false, 'circle': false, 'player': null},
        'r3c2': {'blank': true, 'cross': false, 'circle': false, 'player': null},
        'r3c3': {'blank': true, 'cross': false, 'circle': false, 'player': null}}
    };
    this.player1 = {'name': this.player1Name, 'active': true, 'symbol': 'circle', 'boxes': []};
    this.player2 = {'name': this.player2Name, 'active': false, 'symbol': 'cross', 'boxes': []}
    this.currentPlayer = null;
    this.gameOver = false;
  }

  ngOnInit() {
  }

}
