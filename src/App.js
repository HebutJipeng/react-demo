import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { MonthPicker, RangePicker } = DatePicker;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isKing : true
    }
    this.handleClick = this.handleClick.bind(this)
    console.log('constructor App 的构造函数， 初始化执行')
  }
  handleClick() {
    this.setState({
      isKing: !this.state.isKing
    })
  }
  handleClick1() {
    this.handleClick()
  }
  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  handleClick2 = () => {
    this.handleClick()
  }

  handleClick3() {
    this.handleClick()
  }
  // 生命周期
  componentWillMount() {
    console.log('componentWillMount, 组件App 准备渲染')
  }
  componentDidMount() {
    console.log('组件App渲染完毕')
  }
  shouldComponentUpdate() {
    console.log('shouldcomponentupdate 判断App组件是否应该渲染， 默认返回true')
    return true
    // return false 如果返回false 则组件不会被渲染
  }
  componentWillUpdate() {
    console.log('组件App准备更新了')
  }
  componentDidUpdate() {
    console.log('组件App更新完毕了')
  }
  render() {
    console.log('组件正在渲染')
    const level = '最强王者'
    // const isKing = true

    const title = this.state.isKing
                  ? <p>早睡早起</p>
                  : <h2>我们的目标是{level}</h2>
    const wordlist = ['俺老孙来也', '有妖气', '取经之路']
    return (
      <div>
        <p>{ this.state.isKing }</p>
        <DatePicker onChange={ this.onChange } />
        <br/>
        <MonthPicker onChange={this.onChange}/>
        <button onClick={ this.handleClick }>click me!</button>
        { title }
        <ul>
          {wordlist.map(v=><li key={v}>{v}</li>)}
        </ul>
        { this.state.isKing ? <p>早睡早起</p> : null }
        <Tank name='程咬金'></Tank>
        <button onClick={ ()=>{this.handleClick1()} }>btn1</button>
        <button onClick={ this.handleClick2 }>btn2</button>
        <button onClick={ this.handleClick3.bind(this) }>btn3</button>
      </div>
    )
  }
}

class Tank extends Component {
  render() {
    return (
      <div>
        { this.props.name }
      </div>
    )
  }
}

export default App;
